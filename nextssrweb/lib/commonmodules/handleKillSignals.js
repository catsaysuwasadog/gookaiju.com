import log from 'commonmodules/log';

const SHUTDOWN_TIMEOUT = 10e3;
let shuttingDown = false;
const teardowns = [];

export function isShuttingDown() {
  return shuttingDown;
}

/**
 * shutdown === the termination handler
 * Terminate server on receipt of the specified signal.
 * @param {string} signal  Signal to terminate on.
 */
export async function shutdown(signal, origin) {
  if (typeof signal === 'string') {
    log.info({
      name: 'kill signal',
      msg: `Handling signal: ${signal} from ${origin}.`,
    });
  }

  if ((signal === 'SIGTERM' || signal === 'SIGINT') && !shuttingDown) {
    shuttingDown = true;
    log.info({
      name: 'kill signal',
      msg: `Shutdown server gracefully. ${SHUTDOWN_TIMEOUT}ms before killing it.`,
    });
    const timer = setTimeout(() => {
      log.fatal({
        name: 'kill signal',
        msg: 'Force shutdown',
      });
      shutdown();
    }, SHUTDOWN_TIMEOUT);

    // ASC
    const teardownsSorted = teardowns.slice().sort((a, b) => a.nice - b.nice);

    for (let i = 0; i < teardownsSorted.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await teardownsSorted[i].callback();
    }

    clearTimeout(timer);
    process.exit(0);
    return;
  }

  process.exit(1);
}

export function addTeardown(teardown) {
  teardowns.push(teardown);
}

export function removeTeardown(teardown) {
  const index = teardowns.indexOf(teardown);
  teardowns.splice(index, 1);
}

function handleKillSignals() {
  // Process on exit and signals. https://nodejs.org/api/process.html#process_event_exit
  process.on('exit', code => {
    const msg = `💀  Node stopped with code ${code}`;

    if (code === 0) {
      log.info({
        name: 'kill signal',
        msg,
      });
    } else {
      log.fatal({
        name: 'kill signal',
        msg,
      });
    }
  });

  // Removed 'SIGPIPE' from the list - bugz 852598.
  [
    'SIGHUP',
    'SIGINT',
    'SIGQUIT',
    'SIGILL',
    'SIGTRAP',
    'SIGABRT',
    'SIGBUS',
    'SIGFPE',
    'SIGUSR1',
    'SIGSEGV',
    'SIGUSR2',
    'SIGTERM',
  ].forEach(signal => {
    process.on(signal, () => {
      shutdown(signal, 'signal');
    });
  });
}

export default handleKillSignals;
