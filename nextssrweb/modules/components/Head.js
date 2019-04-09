/* eslint-disable no-underscore-dangle */
import React from 'react';
import NextHead from 'next/head';
import { Router, withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'modules/utils/compose';

function Head(props) {
  const {
    t,
    description = t('headDescription'),
    router,
    title = t('pmsg_indexheadTitle'),
    userLanguage,
  } = props;
  // eslint-disable-next-line no-console
  console.log(`index + Header ${userLanguage}......`);

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        property="og:url"
        content={`https://gookaiju.com${Router._rewriteUrlForNextExport(router.asPath)}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:ttl" content="604800" />
    </NextHead>
  );
}

Head.propTypes = {
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
)(Head);
