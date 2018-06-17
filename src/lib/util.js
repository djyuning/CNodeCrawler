/**
 * 去除前后空格
 * @param contents
 * @return {string}
 */
const trim = function (contents) {
  if (!contents) return '';
  return contents.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 去除连续空格
 * @param contents
 * @param len
 * @param replacement
 * @return {string}
 */
const trimSpace = function (contents, len = 3, replacement = '') {
  if (!contents) return '';
  replacement = typeof replacement !== 'string' ? (replacement + '') : replacement;
  return contents.replace(/(\s+){3}/, replacement);
};

/**
 * 去除转义符
 * @param contents
 * @return {*}
 */
const trimEscape = function (contents) {
  if (!contents) return '';
  return contents.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
};

/**
 * 去除收尾空格、连续空格和转义符
 * @param contents
 * @return {*}
 */
const trimBase = function (contents) {
  if (!contents) return '';
  contents = trim(contents);
  contents = trimSpace(contents);
  return trimEscape(contents);
};

module.exports = {
  trim,
  trimSpace,
  trimEscape,
  trimBase,
};
