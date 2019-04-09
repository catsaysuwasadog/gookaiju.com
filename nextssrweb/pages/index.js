import 'modules/components/bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Footer from 'modules/components/indexLayout/Footer';
import AppFrame from 'modules/components/indexLayout/AppFrame';
import Link from 'modules/components/basecomponents/Link';
import Header from 'modules/components/indexLayout/Header';
import compose from 'modules/utils/compose';

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }
  dependenciesLoaded = true;
}

const styles = theme => ({
  root: {
    flex: '1 0 100%',
  },
  drawer: {
    width: 0,
  },
  hero: {
    paddingTop: theme.spacing(0.5),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      flexDirection: 'row',
      alignItems: 'flex-start',
      textAlign: 'left',
    },
  },
  title: {
    marginLeft: -12,
    whiteSpace: 'nowrap',
    letterSpacing: '.7rem',
    textIndent: '.7rem',
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.only('xs')]: {
      fontSize: 28,
    },
  },
  logo: {
    flexShrink: 0,
    width: 120,
    height: 120,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(8),
      width: 220,
      height: 200,
    },
  },
  button: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(0.5),
  },
  social: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 21,
    boxSizing: 'content-box',
    '& span': {
      display: 'flex',
      marginRight: theme.spacing(1),
    },
    '& a': {
      color: theme.palette.background.paper,
    },
  },
});

const GettingAboutme = React.forwardRef((props, ref) => {
  return <Link href="/aboutme" naked prefetch ref={ref} {...props} />;
});
const GettingNav = React.forwardRef((props, ref) => {
  return <Link href="/navigations" naked prefetch ref={ref} {...props} />;
});

class HomePage extends React.Component {
  componentDidMount() {
    /* eslint-disable no-console */
    if (window.location.hash !== '') {
      window.location.replace(`https://gookaiju.com/${window.location.hash}`);
    }
    loadDependencies();
  }

  render() {
    const { classes, t } = this.props;
    return (
      <AppFrame classes={{ drawer: classes.drawer }}>
        <div className={classes.root}>
          <Header />
          <div className={classes.hero}>
            <Container maxWidth="md" className={classes.content}>
              <img src="/static/logo.png" alt="gookaiju.com logo" className={classes.logo} />
              <div>
                <Typography variant="h3" component="h1" color="inherit" gutterBottom className={classes.title}>
                  {t('pmsg_gookaiju_logotitle')}
                </Typography>
                <Typography variant="h5" component="h2" color="inherit">
                  {t('pmsg_gookaiju_title_intro1')}
                </Typography>
                <Typography variant="h5" component="h2" color="inherit">
                  {t('pmsg_gookaiju_title_intro2')}
                </Typography>
                <Button component={GettingNav} className={classes.button} variant="outlined" color="primary">
                  {t('pmsg_navigation')}
                </Button>
                <Button component={GettingAboutme} className={classes.button} variant="outlined" color="primary">
                  {t('pmsg_aboutme')}
                </Button>
              </div>
            </Container>
          </div>
          <Footer />
        </div>
      </AppFrame>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    t: state.options.t,
  })),
  withStyles(styles),
)(HomePage);
