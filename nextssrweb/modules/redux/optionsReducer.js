/* eslint-disable no-console */
import memoize from '@material-ui/system/memoize';
import { ACTION_TYPES, CODE_VARIANTS } from 'modules/constants';
import mapTranslations from 'modules/utils/mapTranslations';

// il8n translations文件内容的引入： translationsContext => {filename<string>:filecontext<object>}
const translationsContext = require.context('translations', false, /translations.*\.json$/);
const translations = mapTranslations(translationsContext, 'json');

function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce((acc, item) => (acc && acc[item] ? acc[item] : null), obj);
}

const warnOnce = {};

/**
 * 返回用户选择的语言的il8n资源文件内容对象操作方法
 * @param {string} userLanguage 当前用户选择的语言
 * @returns {func}
 */
const getT = memoize(userLanguage => (key, options = {}) => {
  const { ignoreWarning = false } = options;
  const wordings = translations[userLanguage];

  if (!wordings) {
    console.error(`Missing language: ${userLanguage}.`);
    return '…';
  }

  const translation = getPath(wordings, key);

  if (!translation) {
    const fullKey = `${userLanguage}:${key}`;
    if (!ignoreWarning && !warnOnce[fullKey]) {
      console.error(`Missing translation for ${fullKey}.`);
      warnOnce[fullKey] = true;
    }
    return getPath(translations.zh, key);
  }

  return translation;
});

const mapping = {
  [ACTION_TYPES.OPTIONS_CHANGE]: (state, action) => {
    const newState = {
      codeVariant: action.payload.codeVariant || state.codeVariant,
      userLanguage: action.payload.userLanguage || state.userLanguage,
    };
    return newState;
  },
};

function optionsReducer(state = {}, action) {
  let newState = { ...state };

  if (!newState.codeVariant) {
    newState.codeVariant = CODE_VARIANTS.JS;
  }
  if (!newState.userLanguage) {
    newState.userLanguage = 'zh';
  }

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  newState.t = getT(newState.userLanguage);

  return newState;
}

export default optionsReducer;
