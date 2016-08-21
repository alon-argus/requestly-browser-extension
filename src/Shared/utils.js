var RQ = RQ || {};
RQ.Utils = RQ.Utils || {};

RQ.Utils.regexFormat = '^\/(.+)\/(|i|g|ig|gi)$';

RQ.Utils.isValidRegex = function(regexStr) {
  return regexStr.search(new RegExp(RQ.Utils.regexFormat)) !== -1;
};

RQ.Utils.toRegex = function(regexStr) {
  var isRegexStringValid = this.isValidRegex(regexStr),
    matchRegExp;

  if (!isRegexStringValid) {
    return null;
  }
  matchRegExp = regexStr.match(new RegExp(RQ.Utils.regexFormat));

  return new RegExp(matchRegExp[1], matchRegExp[2]);
};

RQ.Utils.isValidUrl = function(url) {
  return url.search(/^http:|https:|ftp:|javascript:/) === 0;
};

RQ.Utils.getId = function() {
  return Date.now();
};

RQ.Utils.getCurrentTime = function() {
  return Date.now();
};

RQ.Utils.reloadPage = function(wait) {
  wait = wait || 0;

  setTimeout(function () {
    window.location.reload();
  }, wait);
};

RQ.Utils.submitEvent = function(category, action, label) {
  var eventObserverPlaceholder = document.getElementById('events-observer-placeholder'),
    $eventEl = $('<span></span>').attr({
      'data-category': category,
      'data-action': action,
      'data-label': label
    });

  eventObserverPlaceholder && eventObserverPlaceholder.appendChild($eventEl.get(0));
};

RQ.Utils.removeLastPart = function(str, separater) {
  str = str || '';

  // Return original string when separator is not present
  if (str.indexOf(separater) === -1) {
    return str;
  }

  str = str.split(separater);

  // Remove last part
  str.length--;

  return str.join(separater);
};

/**
 *
 * @param mayBeDirtyHTML
 * @returns sanitized and clean HTML which can be safely inserted into DOM
 * @doc: https://github.com/requestly/sanitize-html
 */
RQ.Utils.sanitizeHTML = function(mayBeDirtyHTML) {
  return sanitizeHtml(mayBeDirtyHTML, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'a', 'button', 'div', 'i', 'input', 'h1', 'h2', 'label', 'nav', 'span', 'section', 'select', 'tbody'
    ]),
    allowedAttributes: {
      '*': [ 'active', 'class', 'checked', 'data-*', 'for', 'href', 'id', 'option', 'placeholder', 'selected', 'style', 'target', 'title', 'type', 'value' ]
    }
  });
};
