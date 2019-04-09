import React from 'react';
import PropTypes from 'prop-types';
import { pageToTitleI18n } from 'modules/utils/helpers';
import PageContext from 'modules/components/PageContext';

function PageTitle(props) {
  const { activePage } = React.useContext(PageContext);
  if (!activePage) {
    throw new Error('Missing activePage.');
  }
  const title = pageToTitleI18n(activePage, props.t);
  return props.children(title);
}

PageTitle.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PageTitle;
