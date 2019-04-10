/**
 * 根据il8n的资源文件，返回translations对象
 * @param {object} translationsContext
 * @param {string} ext
 * @returns {object}
 */
export default function mapTranslations(translationsContext, ext) {
  const translations = {};
  translationsContext.keys().forEach(filename => {
    const match = filename.match(new RegExp(`-([a-z]{2}).${ext}$`));

    if (match) {
      translations[match[1]] = translationsContext(filename);
    } else {
      translations.en = translationsContext(filename);
    }
  });
  return translations;
}
