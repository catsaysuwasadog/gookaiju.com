import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Interpolate from '@trendmicro/react-interpolate';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from 'modules/components/basecomponents/Link';
import compose from 'modules/utils/compose';

const styles = theme => ({
  footer: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0),
    },
  },
  list: {
    margin: 0,
    paddingLeft: 0,
    listStyle: 'none',
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  version: {
    marginTop: theme.spacing(1),
  },
});

function Footer(props) {
  const { classes, t } = props;
  return (
    <Container maxWidth="md">
      <footer className={classes.footer}>
        <Typography variant="h6" gutterBottom>
          {t('pmsg_quickLinks')}
        </Typography>
        <Typography variant="subtitle1" component="div">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link color="inherit" href="https://github.com/catsaysuwasadog">GitHub</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link color="inherit" href="/aboutme">
                    {t('pmsg_aboutme')}
                  </Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Typography>
        <Typography className={classes.version}>
          <Interpolate
            replacement={{
              release_version: `v${process.env.LIB_VERSION}`,
              release_license: (
                <Link color="inherit" href="https://github.com/LICENSE">
                  {t('pmsg_mitlicense')}
                </Link>
              ),
            }}
          >
            {t('pmsg_footer_release')}
          </Interpolate>
        </Typography>
      </footer>
    </Container>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({ t: state.options.t })),
  withStyles(styles),
)(Footer);
