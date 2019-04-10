export const ILL_RESTFUL_API = process.env.USE_HTTP === 'false';
export const DOMAIN = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:13004' : 'https://gookaiju.com';

/**
 * @param {object} obj
 * @returns {string}
 */
export function jsonObjectToQuery(obj) {
  const jsonItems = [];

  Object.keys(obj).forEach(key => {
    jsonItems.push(`${key}=${obj[key]}`);
  });

  return `?${jsonItems.join('&')}`;
}

export function getDomain() {
  return 'https://gookaiju.com';
}

export const getNavTypesUrl = (obj) => {
  return `${getDomain()}/api/navigationtypes${jsonObjectToQuery(obj)}`;
}

export const getNavigationsUrl = (obj) => {
  return `${getDomain()}/api/navigations${jsonObjectToQuery(obj)}`;
}
