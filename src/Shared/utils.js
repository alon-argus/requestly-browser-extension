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

RQ.Utils.getName = function(authData) {
  switch(authData.provider) {
    case 'password':
      return authData.password.email.replace(/@.*/, '');
    case 'twitter':
      return authData.twitter.displayName;
    case 'facebook':
      return authData.facebook.displayName;
  }
};

RQ.Utils.getId = function() {
  return Date.now();
};

RQ.Utils.submitEvent = function(category, action, label) {
  var eventObserverPlaceholder = document.getElementById('events-observer-placeholder'),
    $eventEl = $('<span></span>').attr({
      'data-category': category,
      'data-action': action,
      'data-label': label
    });

  eventObserverPlaceholder.appendChild($eventEl.get(0));
};

RQ.Utils.removeLastPart = function(str, separater) {
  str = str || '';

  // Return original string when separater is not present
  if (str.indexOf(separater) === -1) {
    return str;
  }

  str = str.split(separater);

  // Remove last part
  str.length--;

  return str.join(separater);
};
