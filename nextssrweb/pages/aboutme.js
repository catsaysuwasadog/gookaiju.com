import 'modules/components/bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppFrame from 'modules/components/otherLayout/AppFrame';
import compose from 'modules/utils/compose';

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }
  dependenciesLoaded = true;
}

const styles = theme => ({
  hero: {
    paddingTop: theme.spacing(0.5),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main,
  },
});

class AboutmePage extends React.Component {
  componentDidMount() {
    /* eslint-disable no-console */
    if (window.location.hash !== '') {
      window.location.replace(`https://gookaiju.com/${window.location.hash}`);
    }
    loadDependencies();
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { classes, t } = this.props;
    return (
      <AppFrame>
        <div className={classes.hero}></div>
      </AppFrame>
    );
  }
}

AboutmePage.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    t: state.options.t,
  })),
  withStyles(styles),
)(AboutmePage);
