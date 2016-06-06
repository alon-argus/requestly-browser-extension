var RQ = RQ || {};

RQ.VERSION = 1;

RQ.VERSIONS = {
  REPLACE_RULE: 2
};

// Url which gets opened when User clicks on browserAction (requestly icon) in toolbar
RQ.WEB_URL = 'http://web.requestly.in';

RQ.WEB_URL_PATTERN = '*://web.requestly.in/*';

RQ.BLACK_LIST_DOMAINS = [
  'requestly.in'
];

RQ.STRING_CONSTANTS = {
  SLASH: '/'
};

RQ.LIMITS = {
  NUMBER_SHARED_LISTS: 10
};

RQ.RULE_TYPES = {
  REDIRECT: 'Redirect',
  CANCEL: 'Cancel',
  REPLACE: 'Replace',
  HEADERS: 'Headers',
  DEVICE: 'Device'
};

RQ.RULE_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
};

RQ.RULE_KEYS = {
  URL: 'Url',
  HOST: 'host',
  PATH: 'path',
  HEADER: 'Header'
};

RQ.RULE_OPERATORS = {
  EQUALS: 'Equals',
  CONTAINS: 'Contains',
  MATCHES: 'Matches'
};

RQ.MODIFICATION_TYPES = {
  ADD: 'Add',
  REMOVE: 'Remove',
  MODIFY: 'Modify'
};

RQ.HEADERS_TARGET = {
  REQUEST: 'Request',
  RESPONSE: 'Response'
};

RQ.HEADER_NAMES = {
  USER_AGENT: 'User-Agent'
};

RQ.RESPONSE_CODES = {
  NOT_FOUND: 404
};

RQ.STORAGE_KEYS = {
  REQUESTLY_SETTINGS: 'rq_settings'
};

RQ.MESSAGES = {
  DELETE_RULES: 'Are you sure you want to delete the selected rules ?',
  SIGN_IN_TO_VIEW_SHARED_LISTS: 'Please login with Google to view your Shared Lists.',
  ERROR_AUTHENTICATION: 'Received some error in authentication. Please try again later!!',
  SHARED_LISTS_LIMIT_REACHED: 'You can not create more than ' + RQ.LIMITS.NUMBER_SHARED_LISTS + ' shared lists'
};

RQ.RESOURCES = {
  EXTENSION_ICON: '/resources/images/38x38.png',
  EXTENSION_ICON_GREYSCALE: '/resources/images/38x38_greyscale.png'
};

RQ.GA_EVENTS = {
  CATEGORIES: {
    RULES: 'rules',
    USER: 'user',
    SHARED_LIST: 'shared list'
  },
  ACTIONS: {
    MODIFIED: 'modified',
    CREATED: 'created',
    DELETED: 'deleted',
    ACTIVATED: 'activated',
    DEACTIVATED: 'deactivated',
    IMPORTED: 'imported',
    EXPORTED: 'exported',
    LIMIT_REACHED: 'limit reached',
    AUTHENTICATED: 'authenticated',
    VIEWED: 'viewed'
  }
};

RQ.USER = {
  AUTHORIZED: 'authorized-user',
  UNAUTHORIZED: 'unauthorized-user'
};

RQ.FIREBASE_NODES = {
  USERS: 'users',
  PUBLIC: 'public',
  SHARED_LISTS: 'sharedLists'
};

RQ.getFirebaseRef = function() {
  if (!RQ.firebaseRef) {
    RQ.firebaseRef = new Firebase('https://requestly.firebaseio.com');
  }

  return RQ.firebaseRef;
};

RQ.htmlEncode = function(value){
  return $('<div/>').text(value).html();
};

RQ.getSharedURL = function(shareId) {
  return RQ.WEB_URL + '#sharedList/' + shareId;
};

RQ.USER_AGENT = {
  android: {
    phone: 'Mozilla/5.0 (Android; Mobile; rv:26.0) Gecko/26.0 Firefox/26.0',
    tablet: 'Mozilla/5.0 (Android; Tablet; rv:26.0) Gecko/26.0 Firefox/26.0'
  },
  ios: {
    phone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
    tablet: 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
  },
  windows: {
    phone: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)',
    tablet: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; Touch; NOKIA; Lumia 920)'
  },
  blackberry: {
    phone: 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.187 Mobile Safari/534.11+',
    tablet: 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.0; en-US) AppleWebKit/535.8+ (KHTML, like Gecko) Version/7.2.0.0 Safari/535.8+'
  },
  symbian: {
    phone: 'Mozilla/5.0 (SymbianOS) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.1.33 Mobile Safari/533.4 3gpp-gba'
  }
};

