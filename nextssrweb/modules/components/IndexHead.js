/* eslint-disable no-underscore-dangle */
import React from 'react';
import NextHead from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'modules/utils/compose';

function IndexHead(props) {
  const {
    t,
    description = t('headDescription'),
    router,
    title = t('pmsg_indexheadTitle'),
    userLanguage,
  } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
    </NextHead>
  );
}

IndexHead.propTypes = {
  description: PropTypes.string,
  router: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  userLanguage: PropTypes.string.isRequired,
};

export default compose(
  withRouter,
  connect(state => ({
    t: state.options.t,
    userLanguage: state.options.userLanguage,
  })),
)(IndexHead);
