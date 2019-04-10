import { createMuiTheme } from '@material-ui/core/styles';

function getTheme(uiTheme) {
  const theme = createMuiTheme({
    nprogress: { color: uiTheme.paletteType === 'light' ? '#000' : '#fff' },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
  });

  if (process.browser) {
    window.theme = theme;
  }

  return theme;
}

export default getTheme;
