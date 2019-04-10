import 'modules/components/bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppFrame from 'modules/components/layout/AppFrame';
import compose from 'modules/utils/compose';
import { getNavTypes } from "modules/stores/actions";

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

class NavigationPage extends React.Component {
  state = {};

  componentDidMount() {
    /* eslint-disable no-console */
    if (window.location.hash !== '') {
      window.location.replace(`https://gookaiju.com/${window.location.hash}`);
    }
    loadDependencies();

    getNavTypes(this.props.dispatch, 'https://api.github.com/repos/mui-org/material-ui-docs/branches')
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { classes, reduxNavigationTypes = [], t } = this.props;
    return (
      <AppFrame>
        <div className={classes.hero}>
          {
            reduxNavigationTypes.map(navigationType => (<div key={`item-${navigationType.name}`}>{navigationType.name}</div>))
          }
        </div>
      </AppFrame>
    );
  }
}

NavigationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  reduxNavigationTypes: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    reduxNavigationTypes: state.responses.navTypesRes,
    t: state.options.t,
  })),
  withStyles(styles),
)(NavigationPage);
