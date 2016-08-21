var RQ = RQ || {};
RQ.config = RQ.config || {};

function getBrowserConfigs(browser) {
  var configs = {
    chrome: {
      storageType: chrome.storage.sync,
      contextMenuContexts: ['browser_action']
    },
    firefox: {
      storageType: chrome.storage.local,
      contextMenuContexts: ['all']
    }
  }

  return configs[browser];
}

RQ.manifestJson = chrome.runtime.getManifest();

// We define applications as key in firefox manifest and not in chrome manifest
RQ.currentBrowser = RQ.manifestJson['applications'] ? 'firefox' : 'chrome';
RQ.browserConfigs = getBrowserConfigs(RQ.currentBrowser);

/**
 * Wrapper over Chrome Storage Service APIs.
 * TODO: Convert Storage Service into a Class and accept type of storage as param.
 * TODO: Move this into another repo so that people should re-use it.
 * TODO: Usage: var localStorageService = new StorageService({ DB: 'local' });
 */

var StorageService = {
  records: [],
  isRecordsFetched: false,
  DB: RQ.browserConfigs.storageType
};

StorageService.printRecords = function() {
  this.DB.get(null, function(o) {
    console.log(o);
  });
};

StorageService.clearDB = function() {
  this.DB.clear();
};

StorageService.getRecords = function(options) {
  var self = this;

  options = options || {};

  /* If records have been read from storage, return the cached values */
  if (this.isRecordsFetched && !options.forceFetch) {
    typeof options.callback === 'function' && options.callback(this.records);
    return;
  }

  // Clear the existing records
  this.records.length = 0;

  this.DB.get(null, function(superObject) {
    for (var key in superObject) {
      if (typeof superObject[key].ruleType !== 'undefined') {
        self.records.push(superObject[key]);
      }
    }

    self.isRecordsFetched = true;

    typeof options.callback === 'function' && options.callback(self.records);
  });
};

StorageService.saveRecord = function(object, callback) {
  callback = callback || function() { console.log('Default Handler: Saving Object ', object) };
  this.DB.set(object, callback);
};

StorageService.getRecord = function(key, callback) {
  callback = callback || function() { console.log('Default handler called when record is fetched:', key) };
  StorageService.DB.get(key, callback);
};

StorageService.removeRecord = function(key, callback) {
  callback = callback || function() { console.log('Default handler called when record is removed:', key) };
  StorageService.DB.remove(key, callback);
};

StorageService.getCachedRecordIndex = function(keyToFind) {
  var recordKey,
    recordIndex;

  for (recordIndex = 0; recordIndex < StorageService.records.length; recordIndex++) {
    recordKey = StorageService.records[recordIndex].id;

    if (recordKey === keyToFind) {
      return recordIndex;
    }
  }

  return -1;
};

/**
 * StorageService.records are updated on every add/edit/delete operation
 * So that background rules can be updated which are executed when each request URL is intercepted
 * @param changes SuperObject with key as Object key which is changed with old and new values
 * @param namespace Storage type: 'sync' or 'local'
 */
StorageService.updateRecords = function(changes, namespace) {
  var changedObject,
    changedObjectIndex,
    objectExists,
    changedObjectKey;

  if (StorageService.DB === chrome.storage[namespace]) {
    for (changedObjectKey in changes) {
      if (!changes.hasOwnProperty(changedObjectKey)) {
        continue;
      }

      changedObject = changes[changedObjectKey];
      changedObjectIndex = StorageService.getCachedRecordIndex(changedObjectKey);
      objectExists = (changedObjectIndex !== -1);

      // Add/Edit Rule operation
      if (typeof changedObject.newValue !== 'undefined') {
        // Don't cache records which explicitly ask not to cache them
        if (changedObject.newValue['avoidCache'] === true) {
          continue;
        }

        objectExists
          ? StorageService.records[changedObjectIndex] = changedObject.newValue    /* Update existing object (Edit) */
          : StorageService.records.push(changedObject.newValue);                   /* Create New Object */
      }

      // Delete Rule Operation
      if (typeof changedObject.oldValue !== 'undefined' && typeof changedObject.newValue === 'undefined' && objectExists) {
        StorageService.records.splice(changedObjectIndex, 1);
      }
    }
  }
};

chrome.storage.onChanged.addListener(StorageService.updateRecords);
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
  HEADERS: 'Headers'
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

var RQ = RQ || {};
RQ.FirebaseUtils = RQ.FirebaseUtils || {};

RQ.FirebaseUtils.getName = function(authData) {
  switch(authData.provider) {
    case 'password':
      return authData.password.email.replace(/@.*/, '');
    case 'twitter':
      return authData.twitter.displayName;
    case 'facebook':
      return authData.facebook.displayName;
  }
};

RQ.FirebaseUtils.getDeferredNodeValue = function(nodeRef, options) {
  return new Promise(function(resolve, reject) {
    var method = typeof options.once !== 'undefined' ? 'once' : 'on';

    nodeRef[method].call(nodeRef, 'value', function(snapshot) {
      resolve(snapshot.val());
    });
  });
};

var Notification = {
  Types: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  },

  NotificationTypeHandler: {
    success: toastr.success,
    error: toastr.error,
    info: toastr.info,
    warning: toastr.warning
  },

  defaultOptions: {
    closeButton: true,
    debug: false,
    positionClass: 'toast-top-right',
    onclick: null,
    showDuration: '2000',
    hideDuration: '1000',
    timeOut: '3000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
  },

  show: function(type, message, heading, opts) {
    var options = _.extend({}, this.defaultOptions, opts);

    this.NotificationTypeHandler[type].call(null, message, heading, options);
  }
};

(function($) {
  function getOrCreateDownloadLink() {
    var $link = $('#downloadLink');

    if ($link.length === 0) {
      $link = $('<a id="downloadLink">download</a>').appendTo('body');
    }

    $link.hide();
    return $link;
  }

  function saveAsTextFile(text, fileName) {
    var textFileAsBlob = new Blob([text], { type:'text/plain' }),
      $downloadLink = getOrCreateDownloadLink();

    $downloadLink.attr('download', fileName || 'file');

    if (window.webkitURL != null) {
      $downloadLink.attr('href', window.webkitURL.createObjectURL(textFileAsBlob));
    }

    $downloadLink.get(0).click();
  }

  function getOrCreateUploadLink() {
    var $link = $('#uploadLink');

    if ($link.length === 0) {
      $link = $('<input type="file" id="uploadLink" />').appendTo('body');
    }

    $link.hide();
    return $link;
  }

  function loadTextFile(callback) {
    var $link = getOrCreateUploadLink(),
      reader = new FileReader();

    reader.onload = function(evt) {
      callback(evt.target.result);
    };

    $link.change(function() {
      reader.readAsText($link.get(0).files[0], 'UTF-8');
      $link.val('');
    });

    $link.click();
  }

  Backbone.on('file:save', saveAsTextFile);
  Backbone.on('file:load', loadTextFile);
}(jQuery));
var RQ = RQ || {};
  
RQ.StorageService = StorageService;

RQ.Mixins = RQ.Mixins || {};

RQ.TemplateHelpers = RQ.TemplateHelpers || {};
RQ.HandlebarHelpers = RQ.HandlebarHelpers || {};

RQ.init = function() {
  this.showView = function(view, options) {
    if (this.currentView) {
      this.currentView.close();
    }

    this.currentView = view;
    this.currentView.render(options);

    $('#content').html(this.currentView.el);
  };

  this.showModalView = function(modalView, options) {
    // Do not destruct modal if previously opened modal is same
    if (this.currentModalView && this.currentModalView !== modalView) {
      this.currentModalView.close();
    }

    this.currentModalView = modalView;
    this.currentModalView.render(options);

    $('#modal-container').html(this.currentModalView.el);

    $(this.currentModalView.el).modal('show');
  };

  // There should be only one instance of User profile/settings
  this.currentUser = new UserModel();
  this.addListenerForAuthenticationChanged();

  this.router = new RQ.Router();

  this.fetchSettings();

  this.addListenerForBackgroundMessages();

  this.addVersionClass();

  Backbone.history.start();
};

RQ.fetchSettings = function() {
  RQ.StorageService.getRecord(RQ.STORAGE_KEYS.REQUESTLY_SETTINGS, function(response) {
    response = response || {};

    var settings = response[ RQ.STORAGE_KEYS.REQUESTLY_SETTINGS ] || { isExtensionEnabled: true };

    if (!settings['isExtensionEnabled']) {
      RQ.showBackdrop();
    }
  });
};

RQ.showBackdrop = function() {
  $('#extension-disable-backdrop').show();
  $('#extension-disable-backdrop-message').show();
};

RQ.hideBackdrop = function() {
  $('#extension-disable-backdrop').hide();
  $('#extension-disable-backdrop-message').hide();
};

RQ.addListenerForBackgroundMessages = function() {
  chrome.runtime.onMessage.addListener(function(request) {
    if (request.isExtensionEnabled === true) {
      RQ.hideBackdrop();
    }

    if (request.isExtensionEnabled === false) {
      RQ.showBackdrop();
    }
  });
};

RQ.addListenerForAuthenticationChanged = function() {
  RQ.currentUser.on('change:isLoggedIn', function() {
    var isAuthorized = RQ.currentUser.getUserLoggedIn();

    $('body')
      .removeClass(RQ.USER.AUTHORIZED)
      .removeClass(RQ.USER.UNAUTHORIZED)
      .addClass(isAuthorized ? RQ.USER.AUTHORIZED : RQ.USER.UNAUTHORIZED);
  });
};

RQ.addVersionClass = function() {
  // We introduced Share Rules (Issue-93) in version 1
  if (RQ.VERSION >= 1) {
    $('body').addClass('shared-rules-enabled');
  }
};

Backbone.View.prototype.close = function() {
  this.remove();
  this.unbind();
};
RQ.HandlebarHelpers.DebugHelper = function(optionalValue) {
  console.group('DebugHelper');
  console.log(this);

  if (optionalValue) {
    console.log(optionalValue);
  }

  console.groupEnd('DebugHelper');
};

RQ.HandlebarHelpers.EqualsHelper = function(a, b, options) {
  if (arguments.length < 3) {
    console.error('Handlebars#equals helper expect 2 arguments');
  }

  if (a === b) {
    return options.fn(this);
  }

  return options.inverse(this);
};

RQ.HandlebarHelpers.GreaterThanHelper = function(a, b, options) {
  if (arguments.length < 3) {
    console.error('Handlebars#gt helper expect 2 arguments');
  }

  if (a > b) {
    return options.fn(this);
  }

  return options.inverse(this);
};

RQ.HandlebarHelpers.toLowerCaseHelper = function(value) {
  if (value && typeof value === 'string') {
    return value.toLowerCase();
  }

  return '';
};

RQ.HandlebarHelpers.charAtHelper = function(value, index) {
  if (value && typeof value === 'string') {
    return value.charAt(index);
  }

  return '';
};

RQ.HandlebarHelpers.formatDate = function(dateInMiliseconds) {
  var date = new Date(Number(dateInMiliseconds));

  date = date.toUTCString().split(' ');
  date = date[1] + ' ' + date[2] + ', ' + date[3];

  return date;
};

RQ.HandlebarHelpers.readGlobalVar = function(value) {
  var result = RQ;

  value = value.split('.');

  for (var i = 1; i < value.length; i++) {
    result = result[ value[i] ]
  }

  return result;
};

RQ.HandlebarHelpers.equalsGlobalVar = function(globalVarString, operand, options) {
  var globalVar = RQ.HandlebarHelpers.readGlobalVar(globalVarString);

  if (globalVar === operand) {
    return options.fn(this);
  }

  return options.inverse(this);
};

RQ.HandlebarHelpers.unequalsGlobalVar = function(globalVarString, operand, options) {
  var globalVar = RQ.HandlebarHelpers.readGlobalVar(globalVarString);

  if (globalVar !== operand) {
    return options.fn(this);
  }

  return options.inverse(this);
};

Handlebars.registerHelper('debug', RQ.HandlebarHelpers.DebugHelper);
Handlebars.registerHelper('equals', RQ.HandlebarHelpers.EqualsHelper);
Handlebars.registerHelper('gt', RQ.HandlebarHelpers.GreaterThanHelper);
Handlebars.registerHelper('toLowerCase', RQ.HandlebarHelpers.toLowerCaseHelper);
Handlebars.registerHelper('formatDate', RQ.HandlebarHelpers.formatDate);
Handlebars.registerHelper('charAt', RQ.HandlebarHelpers.charAtHelper);
Handlebars.registerHelper('readGlobalVar', RQ.HandlebarHelpers.readGlobalVar);
Handlebars.registerHelper('equalsGlobalVar', RQ.HandlebarHelpers.equalsGlobalVar);
Handlebars.registerHelper('unequalsGlobalVar', RQ.HandlebarHelpers.unequalsGlobalVar);

RQ.TemplateHelpers.commonHelper = function(ruleJson) {
  ruleJson.RULE_STATUS = RQ.RULE_STATUS;
  ruleJson.RULE_OPERATORS = RQ.RULE_OPERATORS;

  return ruleJson;
};

RQ.TemplateHelpers.placeholders = {
  SOURCE_EQUALS: 'e.g. http://www.example.com',
  SOURCE_CONTAINS: 'e.g. google',
  SOURCE_MATCHES: 'e.g. /example-([0-9]+)/ig',
  DESTINATION_MATCHES: 'e.g. http://www.new-example.com?queryParam=$1&searchParam=$2'
};

RQ.TemplateHelpers.getPlaceholder = function(options) {
  var field = (options.field || '').toUpperCase(),
    operator = (options.operator || '').toUpperCase(),
    DEFAULT_PLACEHOLDER = 'e.g. http://www.new-example.com';

  return this.placeholders[field + '_' + operator] || DEFAULT_PLACEHOLDER;
};

RQ.TemplateHelpers.redirectRuleHelper = function(ruleJson) {
  ruleJson = this.commonHelper(ruleJson);

  _.each(ruleJson.pairs, function(pair) {
    pair['sourcePlaceholder'] = this.getPlaceholder({ field: 'source', operator: pair.source.operator });
    pair['destinationPlaceholder'] = this.getPlaceholder({ field: 'destination', operator: pair.source.operator });
  }, this);

  return ruleJson;
};
this["RQ"] = this["RQ"] || {};
this["RQ"]["Templates"] = this["RQ"]["Templates"] || {};

Handlebars.registerPartial("AddPairCTA", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<button type=\"button\" class=\"right btn btn-link add-pair\">\n  <i class=\"left fa fa-plus-circle\"></i>\n  <span>New</span>\n</button>";
},"useData":true}));

Handlebars.registerPartial("DropdownButton", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\n  <span class=\"dropdown-value\" data-value=\"\">Select</span>\n  <span class=\"caret\"></span>\n</button>";
},"useData":true}));

Handlebars.registerPartial("PairsContainerHeading", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"title\">\n  <span>"
    + this.escapeExpression(((helper = (helper = helpers.heading || (depth0 != null ? depth0.heading : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"heading","hash":{},"data":data}) : helper)))
    + "</span>\n"
    + ((stack1 = this.invokePartial(partials.AddPairCTA,depth0,{"name":"AddPairCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("RuleEditorHeader", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<nav class=\"content-header\">\n  <span>"
    + this.escapeExpression(((helper = (helper = helpers.heading || (depth0 != null ? depth0.heading : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"heading","hash":{},"data":data}) : helper)))
    + "</span>\n  <div class=\"right-corner-icongroup\">\n    <a class=\"fa fa-times close-editor\"></a>\n  </div>\n</nav>\n";
},"useData":true}));

Handlebars.registerPartial("RuleItemRow", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "<tr class=\"rule-item-row "
    + alias2((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),{"name":"toLowerCase","hash":{},"data":data}))
    + "\" data-id=\""
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <td class=\"rule-selection-cell\">\n    <input type=\"checkbox\" class=\"filled-in select-rule-checkbox\" id=\"filled-in-box-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" title=\"Select Rule\"/>\n    <label for=\"filled-in-box-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></label>\n  </td>\n\n  <td class=\"rule-badge-cell\">\n    <span class=\"rule-type badge\">"
    + alias2((helpers.charAt || (depth0 && depth0.charAt) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),0,{"name":"charAt","hash":{},"data":data}))
    + "</span>\n  </td>\n\n  <td class=\"rule-name-cell\">\n    <a class=\"ruleName\">"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n    <div class=\"ruleDescription\">"
    + alias2(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\n  </td>\n\n  <td class=\"status-cell\"> "
    + ((stack1 = this.invokePartial(partials.StatusToggle,depth0,{"name":"StatusToggle","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + " </td>\n\n  <td>"
    + alias2((helpers.formatDate || (depth0 && depth0.formatDate) || alias1).call(depth0,(depth0 != null ? depth0.creationDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n</tr>";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("RuleProperties", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"row\">\n  <div class=\"input-field name-container\">\n    <input type=\"text\" class=\"rule-name-input\" value=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n    <label class=\"active\">Rule Name</label>\n  </div>\n  <div class=\"rule-status-container\">\n    <span class=\"title margin-r-0-5\">Status</span>\n"
    + ((stack1 = this.invokePartial(partials.StatusToggle,depth0,{"name":"StatusToggle","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"input-field description-container\">\n    <input type=\"text\" class=\"rule-description\" value=\""
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "\">\n    <label class=\"active\">Rule Description (Optional)</label>\n  </div>\n</div>\n";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("SaveRuleCTA", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "    <a class=\"btn btn-link close-editor\">Close</a>\n";
},"3":function(depth0,helpers,partials,data) {
    return "    <a href=\"#\" class=\"btn btn-link\">Close</a>\n    <a class=\"btn save-rule\">Save</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"buttons-container\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isViewMode : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}));

Handlebars.registerPartial("SharedListIndexToolbar", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"content-header\">\n  <span>Shared List</span>\n</nav>\n";
},"useData":true}));

Handlebars.registerPartial("SharedListItemRow", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr class=\"list-item-row\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n  <td class=\"list-name-cell\">"
    + alias3(((helper = (helper = helpers.listName || (depth0 != null ? depth0.listName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"listName","hash":{},"data":data}) : helper)))
    + "</td>\n\n  <td class=\"url-cell\"><a href=\""
    + alias3(((helper = (helper = helpers.sharedUrl || (depth0 != null ? depth0.sharedUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sharedUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + alias3(((helper = (helper = helpers.sharedUrl || (depth0 != null ? depth0.sharedUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sharedUrl","hash":{},"data":data}) : helper)))
    + "</a>  </td>\n\n  <td>"
    + alias3((helpers.formatDate || (depth0 && depth0.formatDate) || alias1).call(depth0,(depth0 != null ? depth0.creationDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n</tr>";
},"useData":true}));

Handlebars.registerPartial("SharedRuleItemRow", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "<tr class=\"rule-item-row "
    + alias2((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),{"name":"toLowerCase","hash":{},"data":data}))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n  <td class=\"rule-badge-cell\">\n    <span class=\"rule-type badge\">"
    + alias2((helpers.charAt || (depth0 && depth0.charAt) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),0,{"name":"charAt","hash":{},"data":data}))
    + "</span>\n  </td>\n\n  <td class=\"rule-name-cell\">\n    <a class=\"ruleName\">"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n    <div class=\"ruleDescription\">"
    + alias2(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\n  </td>\n\n  <td class=\"status-cell\"> "
    + alias2(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"status","hash":{},"data":data}) : helper)))
    + " </td>\n\n  <td>"
    + alias2((helpers.formatDate || (depth0 && depth0.formatDate) || alias1).call(depth0,(depth0 != null ? depth0.creationDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n</tr>\n";
},"useData":true}));

Handlebars.registerPartial("SharedRulesIndexToolbar", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"content-header\">\n  <span>Shared Rules</span>\n  <div class=\"right right-corner-icongroup\">\n    <button class=\"import-rules-button action-button btn btn-primary\">Import List</button>\n  </div>\n</nav>\n";
},"useData":true}));

Handlebars.registerPartial("SourceField", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "selected";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div class=\"source-container\">\n  <label class=\"active\">Source</label>\n\n  <!-- Write the dropdown here -->\n  <div class=\"source-key-container\">\n    <div class=\"dropdown-container\">\n      <div class=\"dropdown\" data-key=\"source.key\">\n\n"
    + ((stack1 = this.invokePartial(partials.DropdownButton,depth0,{"name":"DropdownButton","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n        <ul class=\"dropdown-menu\">\n          <li>\n            <a class=\"dropdown-option\"\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.URL",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.URL",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.key : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Url</a>\n          </li>\n          <li>\n            <a class=\"dropdown-option\"\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.HOST",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.HOST",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.key : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Host</a>\n          </li>\n          <li>\n            <a class=\"dropdown-option\"\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.PATH",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.PATH",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.key : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Path</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"source-operator-container\">\n    <div class=\"dropdown-container\">\n      <div class=\"dropdown\" data-key=\"source.operator\">\n\n        <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\n          <span class=\"dropdown-value\" data-value=\"\">Select</span>\n          <span class=\"caret\"></span>\n        </button>\n\n        <ul class=\"dropdown-menu\">\n          <li>\n            <a class=\"dropdown-option\"\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.EQUALS",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.EQUALS",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Equals</a>\n          </li>\n          <li>\n            <a class=\"dropdown-option\"\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.CONTAINS",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.CONTAINS",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Contains</a>\n          </li>\n          <li>\n            <a class=\"dropdown-option\"\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.MATCHES",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.MATCHES",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Matches</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <input type=\"text\" class=\"form-control source-value-input\" data-key=\"source.value\" value=\""
    + alias2(this.lambda(((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.value : stack1), depth0))
    + "\" placeholder=\""
    + alias2(((helper = (helper = helpers.sourcePlaceholder || (depth0 != null ? depth0.sourcePlaceholder : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"sourcePlaceholder","hash":{},"data":data}) : helper)))
    + "\" />\n\n  <span class=\"fa fa-trash-o delete-pair action-icon\"></span>\n</div>";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("StatusToggle", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "checked";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span title=\"Click to toggle Rule Status\">\n  <input type=\"checkbox\" data-toggle=\"toggle\" class=\"status-toggle\" data-on=\"Active\" data-off=\"Inactive\"\n         "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.status : depth0),"Active",{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " />\n</span>";
},"useData":true}));

Handlebars.registerPartial("Toolbar", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "      <a class=\"btn-floating btn-small waves-effect waves-light blue export-rules-button action-button\"\n         data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Download Rules\">\n        <i class=\"fa fa-download\"></i>\n      </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<nav class=\"content-header\">\n  <span>Rules</span>\n  <div class=\"right right-corner-icongroup\">\n\n    <a href=\"#selectRule\" class=\"btn-floating btn-small btn-success waves-effect waves-light select-rule-button action-button\">\n      <i class=\"fa fa-plus\"></i>\n    </a>\n\n"
    + ((stack1 = (helpers.gt || (depth0 && depth0.gt) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.rules : depth0)) != null ? stack1.length : stack1),0,{"name":"gt","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    <a class=\"btn-floating btn-small waves-effect waves-light blue import-rules-button action-button\"\n       data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Upload Rules\">\n      <i class=\"fa fa-upload\"></i>\n    </a>\n\n    <a class=\"btn-floating btn-small waves-effect waves-light share-rules-button action-button\"\n       data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Share\">\n      <i class=\"fa fa-share-alt\"></i>\n    </a>\n\n    <a class=\"btn-floating btn-small waves-effect waves-light delete-rules-button action-button\"\n       data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Delete\">\n      <i class=\"fa fa-trash\"></i>\n    </a>\n\n  </div>\n</nav>\n";
},"useData":true}));

this["RQ"]["Templates"]["CancelRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + this.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "      </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Block/Cancel Network Requests"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-body content-body\">\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Enter Keywords or Urls or Domains to be blocked"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "  <div class=\"pairs-container\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["HeadersRuleTemplate"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n          <div>\n\n            <div class=\"header-modification-type-container\">\n              <div class=\"dropdown-container\">\n                <div class=\"dropdown\" data-key=\"type\">\n\n"
    + ((stack1 = this.invokePartial(partials.DropdownButton,depth0,{"name":"DropdownButton","data":data,"indent":"                  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n                  <ul class=\"dropdown-menu\">\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.ADD",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.ADD",(depth0 != null ? depth0.type : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Add</a>\n                    </li>\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.REMOVE",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.REMOVE",(depth0 != null ? depth0.type : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Remove</a>\n                    </li>\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.MODIFY",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.MODIFY",(depth0 != null ? depth0.type : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Modify</a>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"header-target-container\">\n              <div class=\"dropdown-container\">\n                <div class=\"dropdown\" data-key=\"target\">\n\n"
    + ((stack1 = this.invokePartial(partials.DropdownButton,depth0,{"name":"DropdownButton","data":data,"indent":"                  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n                  <ul class=\"dropdown-menu\">\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.REQUEST",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.REQUEST",(depth0 != null ? depth0.target : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Request</a>\n                    </li>\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.RESPONSE",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.RESPONSE",(depth0 != null ? depth0.target : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Response</a>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"input-group header-name-input-group\">\n              <span class=\"input-group-addon\">Header</span>\n              <input type=\"text\" class=\"form-control header-input\" data-key=\"header\" placeholder=\"Header Name\" value=\""
    + alias3(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"header","hash":{},"data":data}) : helper)))
    + "\">\n            </div>\n\n"
    + ((stack1 = (helpers.unequalsGlobalVar || (depth0 && depth0.unequalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.REMOVE",(depth0 != null ? depth0.type : depth0),{"name":"unequalsGlobalVar","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","hash":{"sourcePlaceholder":"Leave this field Empty to apply above modification to all urls"},"data":data,"indent":"          ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "        </div>\n";
},"2":function(depth0,helpers,partials,data) {
    return "selected";
},"4":function(depth0,helpers,partials,data) {
    var helper;

  return "              <div class=\"input-group header-value-input-group\">\n                <span class=\"input-group-addon\">Value</span>\n                <input type=\"text\" class=\"form-control value-input\" data-key=\"value\" placeholder=\"Header Value\" value=\""
    + this.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\"/>\n              </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Modify Headers in HTTP Request and Response"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-body content-body\">\n\n\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Headers Modification Rules"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n  <div class=\"pairs-container\">\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["Modal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "        <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <button type=\"button\" class=\"btn btn-link btn-primary\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.primaryButton : depth0)) != null ? stack1.name : stack1), depth0))
    + "</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"modal-dialog\">\n\n  <!-- Modal content-->\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <h4>"
    + alias3(((helper = (helper = helpers.heading || (depth0 != null ? depth0.heading : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"heading","hash":{},"data":data}) : helper)))
    + "</h4>\n    </div>\n\n    <div class=\"modal-body\">\n      <p>"
    + alias3(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n\n    <div class=\"modal-footer text-right\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cancelButton : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.primaryButton : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n  </div> <!-- /modal-content -->\n</div>\n";
},"useData":true});

this["RQ"]["Templates"]["RedirectRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n        <div class=\"row\">\n          <div class=\"destination-container\">\n            <label class=\"active\">Destination</label>\n            <input type=\"url\" class=\"destination-url-input form-control\" data-key=\"destination\" value=\""
    + alias3(((helper = (helper = helpers.destination || (depth0 != null ? depth0.destination : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destination","hash":{},"data":data}) : helper)))
    + "\"\n                   placeholder=\""
    + alias3(((helper = (helper = helpers.destinationPlaceholder || (depth0 != null ? depth0.destinationPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destinationPlaceholder","hash":{},"data":data}) : helper)))
    + "\">\n          </div>\n        </div>\n      </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Redirect Request Rule"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-body content-body\">\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Source Destination Pairs"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n  <div class=\"pairs-container\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["ReplaceRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"from-to-container\">\n          <div class=\"input-group from-input-group\">\n            <span class=\"input-group-addon\">Replace</span>\n            <input type=\"text\" class=\"form-control from-input\" data-key=\"from\" placeholder=\"This part in URL\" value=\""
    + alias3(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"from","hash":{},"data":data}) : helper)))
    + "\">\n          </div>\n\n          <div class=\"input-group to-input-group\">\n            <span class=\"input-group-addon\">With</span>\n            <input type=\"text\" class=\"form-control to-input\" data-key=\"to\" placeholder=\"Will be replaced by this string\" value=\""
    + alias3(((helper = (helper = helpers.to || (depth0 != null ? depth0.to : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"to","hash":{},"data":data}) : helper)))
    + "\">\n          </div>\n        </div>\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","hash":{"sourcePlaceholder":"Leave this field Empty to apply above modification to all urls"},"data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "      </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Replace Host or some part of URL"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-body content-body\">\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Pairs"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n  <div class=\"pairs-container\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["RuleCardsView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"content-header rq-dimgrey\">\n  <a href=\"#\" role=\"button\" class=\"back-button fa fa-chevron-left\" title=\"Go Back\"></a>\n  <span>Select Rule</span>\n</nav>\n\n<section class=\"rule-body content-body\">\n  <div class=\"row\">\n    <div class=\"col-md-6 card-redirect-rule rule-card\" data-target=\"#new/Redirect\">\n      <div class=\"testimonial-card z-depth-1\">\n        <div class=\"card-up\">\n        </div>\n        <div class=\"avatar\">\n          <span class=\"img-circle img-responsive card-avatar-content\">R</span>\n        </div>\n        <div class=\"card-content\">\n          <h5>Redirect Request</h5>\n          <p><i class=\"fa fa-quote-left\"></i>Redirect a request URL</p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-md-6 card-cancel-rule rule-card\" data-target=\"#new/Cancel\">\n      <div class=\"testimonial-card z-depth-1\">\n        <div class=\"card-up\">\n        </div>\n        <div class=\"avatar\">\n          <span class=\"img-circle img-responsive card-avatar-content\">C</span>\n        </div>\n        <div class=\"card-content\">\n          <h5>Cancel Request</h5>\n          <p><i class=\"fa fa-quote-left\"></i>Block Urls by specifying keywords or entire Urls</p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-md-6 card-replace-rule rule-card\" data-target=\"#new/Replace\">\n      <div class=\"testimonial-card z-depth-1\">\n        <div class=\"card-up\">\n        </div>\n        <div class=\"avatar\">\n          <span class=\"img-circle img-responsive card-avatar-content\">R</span>\n        </div>\n        <div class=\"card-content\">\n          <h5>Replace Host</h5>\n          <p><i class=\"fa fa-quote-left\"></i>Replace parts of URL like hostname, query value</p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-md-6 card-headers-rule rule-card\" data-target=\"#new/headers\">\n      <div class=\"testimonial-card z-depth-1\">\n        <div class=\"card-up\">\n        </div>\n        <div class=\"avatar\">\n          <span class=\"img-circle img-responsive card-avatar-content\">H</span>\n        </div>\n        <div class=\"card-content\">\n          <h5>Modify Headers</h5>\n          <p><i class=\"fa fa-quote-left\"></i>Modify HTTP headers in request and response</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n";
},"useData":true});

this["RQ"]["Templates"]["RuleIndex"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleItemRow,depth0,{"name":"RuleItemRow","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.Toolbar,depth0,{"name":"Toolbar","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"content-body\">\n  <table class=\"table\">\n    <thead>\n    <tr>\n      <th class=\"rule-selection-cell\">\n        <input type=\"checkbox\" class=\"filled-in select-all-rules-checkbox\" id=\"select-all-rules-checkbox\" title=\"Select All\"/>\n        <label for=\"select-all-rules-checkbox\"></label>\n      </th>\n      <th> <span class=\"rules-number badge\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.rules : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span> </th>\n      <th>Name & Description</th>\n      <th class=\"status-cell\">Status</th>\n      <th>Created on</th>\n    </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.rules : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</section>\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["ShareRulesModal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        <div class=\"row\">\n          <div class=\"input-name-field col-md-2\"><strong>Public Url:</strong></div>\n          <div class=\"input-field col-md-10\">"
    + this.escapeExpression(((helper = (helper = helpers.sharedUrl || (depth0 != null ? depth0.sharedUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"sharedUrl","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"modal-dialog\">\n\n  <!-- Modal content-->\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <h4><i class=\"fa fa-share-alt\"></i>Share Rules (Public Url)</h4>\n    </div>\n\n    <div class=\"modal-body\">\n      <div class=\"row\">\n        <div class=\"input-name-field col-md-2\"><strong>List Name:</strong></div>\n        <div class=\"input-field col-md-10\">\n          <input id=\"shared-list-name-field\" type=\"text\" placeholder=\"My Shared list\" data-key=\"listName\">\n        </div>\n      </div>\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.sharedUrl : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n    <div class=\"modal-footer\">\n      <div class=\"footer-note left\">\n        <h6 class=\"note\">Note: Anyone with this Url can view and import these rules.</h6>\n      </div>\n      <div class=\"cta-container right\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" data-event=\"modal:closed\">Close</button>\n      </div>\n    </div>\n\n  </div> <!-- modal-content -->\n</div>\n";
},"useData":true});

this["RQ"]["Templates"]["SharedListIndex"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedListItemRow,depth0,{"name":"SharedListItemRow","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedListIndexToolbar,depth0,{"name":"SharedListIndexToolbar","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"list-index content-body\">\n  <table class=\"table\">\n    <thead>\n    <tr>\n      <th>Name</th>\n      <th>Link</th>\n      <th>Created on</th>\n    </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</section>\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["SharedRulesIndex"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedRuleItemRow,depth0,{"name":"SharedRuleItemRow","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedRulesIndexToolbar,depth0,{"name":"SharedRulesIndexToolbar","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-index content-body\">\n  <table class=\"table\">\n    <thead>\n    <tr>\n      <th> <span class=\"rules-number badge\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.rules : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span> </th>\n      <th>Name & Description</th>\n      <th class=\"status-cell\">Status</th>\n      <th>Created on</th>\n    </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.rules : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</section>\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["SusiModal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "          "
    + this.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(depth0,helpers,partials,data) {
    return "          Please login with Google to share your rules with other users.\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"modal-dialog\">\n\n  <!-- Modal content-->\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <h4><i class=\"fa fa-user\"></i>Sign In</h4>\n    </div>\n\n    <div class=\"modal-body\">\n      <p>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "      </p>\n    </div>\n\n    <div class=\"modal-footer text-right\">\n      <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\n      <a class=\"btn-sm-full gplus-bg rectangle waves-effect waves-light auth-provider\" data-provider=\"google\">\n        <i class=\"fa fa-google-plus\"></i>\n        <span>Sign In</span>\n      </a>\n    </div>\n\n  </div> <!-- /modal-content -->\n</div>\n";
},"useData":true});
var BaseModel = Backbone.Model.extend({
  getStorageService: function() {
    return RQ.StorageService;
  }
});
var SharedListModel = Backbone.Model.extend({
  defaults: {
    listName: '',
    sharedUrl: '',
    shareId: '',
    creationDate: '',
    isEnabled: true
  }
});
var UserModel = BaseModel.extend({
  defaults: {
    profile: {
      provider: '',
      uid: '',
      displayName: '',
      email: '',
      profileImageURL: ''
    },
    isLoggedIn: false
  },

  initialize: function() {
    this.firebaseRef = RQ.getFirebaseRef();
    this.registerBinders();
  },

  registerBinders: function() {
    this.handleUserAuthenticationChanged = this.handleUserAuthenticationChanged.bind(this);
  },

  checkUserAuthentication: function() {
    var firebaseRef = this.getFirebaseRef(),
      that = this;

    return new Promise(function(resolve, reject) {
      var onAuthHandler = function(authData) {
        that.handleUserAuthenticationChanged(authData);
        resolve(authData);

        // Detach onAuthHandler otherwise authentication is checked next time, same handler will attach again
        firebaseRef.offAuth(onAuthHandler);
      };

      firebaseRef.onAuth(onAuthHandler);
    });
  },

  handleUserAuthenticationChanged: function(authData) {
    var firebaseRef = this.getFirebaseRef(),
      profile = this.getProfile(),
      provider;

    console.log('Authentication Changed: ', authData);

    if (authData) {
      provider = authData.provider;

      profile.provider = provider;
      profile.uid = authData.uid;
      profile.displayName = authData[provider].displayName;
      profile.email = authData[provider].email;
      profile.profileImageURL = authData[provider].profileImageURL;

      firebaseRef.child(RQ.FIREBASE_NODES.USERS)
        .child(authData.uid)
        .child('profile')
        .set(profile);

      this.setUserLoggedIn(true);
    }

    this.setProfile(_.clone(profile));
  },

  createSharedList: function(shareId, rules) {
    var listRef = this.getPublicSharedListRef(shareId);

    // Set uid of owner in access node
    listRef.set({
      access: {
        owner: this.getProfile().uid
      },
      shareId: shareId,
      rules: rules,
      isEnabled: true
    });

    RQ.Utils.submitEvent(RQ.GA_EVENTS.CATEGORIES.SHARED_LIST, RQ.GA_EVENTS.ACTIONS.CREATED, 'Shared List created');

    return RQ.getSharedURL(shareId);
  },

  setSharedListName: function(shareId, listName) {
    var currentUserRef = this.getCurrentUserNodeRef();

    currentUserRef
      .child(RQ.FIREBASE_NODES.SHARED_LISTS)
      .child(shareId)
      .set({
        listName: listName,
        shareId: shareId,
        creationDate: RQ.Utils.getCurrentTime()
      });
  },

  authenticateUser: function(provider, errorCallback) {
    var firebaseRef = this.getFirebaseRef();

    RQ.Utils.submitEvent(RQ.GA_EVENTS.CATEGORIES.USER, RQ.GA_EVENTS.ACTIONS.AUTHENTICATED, 'User Authenticated');

    firebaseRef.authWithOAuthRedirect(provider, errorCallback, {
      scope: 'email'
    });
  },

  signOut: function() {
    this.firebaseRef.unauth();
  },

  getProfile: function() {
    return this.get('profile');
  },

  setProfile: function(profile) {
    this.set('profile', profile);
  },

  setUserLoggedIn: function(isLoggedIn) {
    this.set('isLoggedIn', isLoggedIn);
  },

  getUserLoggedIn: function() {
    return this.get('isLoggedIn');
  },

  getFirebaseRef: function() {
    return RQ.getFirebaseRef();
  },

  getCurrentUserNodeRef: function() {
    var firebaseRef = this.getFirebaseRef();

    return this.getProfile().uid
      ? firebaseRef
        .child('users')
        .child(this.getProfile().uid)
      : null;
  },

  getPublicSharedLists: function() {
    var fireBaseRef = this.getFirebaseRef();

    return fireBaseRef
      .child(RQ.FIREBASE_NODES.PUBLIC)
      .child(RQ.FIREBASE_NODES.SHARED_LISTS);
  },

  getPublicSharedListRef: function(sharedListId) {
    var sharedListsRef = this.getPublicSharedLists();
    return sharedListsRef.child(sharedListId);
  },

  getUserSharedListsRef: function() {
    var currentUserNodeRef = this.getCurrentUserNodeRef();
    return currentUserNodeRef.child(RQ.FIREBASE_NODES.SHARED_LISTS);
  }
});

var BaseRuleModel = BaseModel.extend({
  defaults: function() {
    return {
      name: '',
      description: '',
      ruleType: '',
      status: RQ.RULE_STATUS.ACTIVE,
      creationDate: ''
    }
  },

  getDefaultSource: function() {
    return {
      key: RQ.RULE_KEYS.URL,
      operator: RQ.RULE_OPERATORS.CONTAINS,
      value: ''
    };
  },

  initialize: function() {
    this.transformAttributes();
  },

  /**
   * To-be overridden by child
   */
  transformAttributes: function() { /* No Op */},

  /**
   * Adds default Source to rule pairs whenever not present
   * @returns {boolean} true if Source is added to any of the pairs
   */
  insertDefaultSourceInPairs: function() {
    var pairs = this.getPairs(),
      isSourceAdded = false;

    _.each(pairs, function(pair) {
      if (typeof pair.source === 'undefined') {
        pair.source = this.getDefaultSource();
        isSourceAdded = true;
      }
    }, this);

    return isSourceAdded;
  },

  setId: function(id) {
    this.set('id', id, { silent: true });
  },

  getId: function() {
    return this.get('id');
  },

  getVersion: function() {
    return this.get('version');
  },

  setVersion: function(v) {
    return this.set('version', v, { silent: true });
  },

  generateId: function() {
    var creationDate = this.hasCreationDate() ? this.getCreationDate() : this.getTimestamp(),
      id = this.getRuleType() + '_' + creationDate;

    this.setId(id);
    return id;
  },

  getName: function() {
    return this.get('name');
  },

  setName: function(name) {
    this.set('name', name);
  },

  getDescription: function() {
    return this.get('description');
  },

  setDescription: function(des) {
    this.set('description', des);
  },

  getTimestamp: function() {
    return Date.now();
  },

  getTimestampFromId: function() {
    return this.getId().split('_')[1];
  },

  setCreationDate: function(date) {
    this.set('creationDate', date);
  },

  getCreationDate: function() {
    return this.get('creationDate');
  },

  hasCreationDate: function() {
    return typeof this.get('creationDate') !== 'undefined' && this.get('creationDate');
  },

  getRuleType: function() {
    return this.get('ruleType');
  },

  setRuleType: function(ruleType) {
    this.set('ruleType', ruleType);
  },

  getStatus: function() {
    return this.get('status');
  },

  setStatus: function(status) {
    this.set('status', status, { silent: true });
  },

  getPairs: function() {
    return this.get('pairs');
  },

  setPair: function(index, pair) {
    var pairs = this.getPairs();
    pairs[index] = pair;
  },

  save: function(options) {
    var id = this.getId(),
      storageObject = {},
      storageService = this.getStorageService();

    if (!id) {
      id = this.generateId();
    }

    storageObject[id] = this.toJSON();

    options = options || {};
    options.callback = options.callback || function() {
      console.log('Object saved');
    };

    storageService.saveRecord(storageObject, options.callback);
  },

  isValid: function() {
    var ruleName = this.getName(),
      ruleType = this.getRuleType();

    if (!ruleName || !ruleType) {
      return false;
    }

    if (!RQ.RULE_TYPES.hasOwnProperty(ruleType.toUpperCase())) {
      return false;
    }

    return true;
  },

  remove: function(options) {
    var id = this.getId(),
      storageService = this.getStorageService();

    options = options || {};
    options.callback = options.callback || function() {
      console.log('Object removed');
    };

    storageService.removeRecord(id, options.callback);
  }
});
var RedirectRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.REDIRECT,
      pairs: [
        this.getDefaultPair()
      ]
    });
  },

  getDefaultPair: function() {
    return {
      source: this.getDefaultSource(),
      destination: ''
    }
  },

  isDeprecatedFormat: function() {
    var sourceObject = this.get('source'),
      destination = this.get('destination');

    return (typeof sourceObject !== 'undefined' && typeof destination !== 'undefined');
  },

  introducePairs: function () {
    var pairs = this.getPairs(),
      defaultPair,
      sourceObject = this.get('source'),
      destination = this.get('destination');

    // Add Pair if Redirect Rule contains Source and Destination instead of pair
    if (this.isDeprecatedFormat()) {
      defaultPair = this.getDefaultPair();
      defaultPair['source']['value'] = sourceObject['values'][0];
      defaultPair['source']['operator'] = sourceObject['operator'];
      defaultPair['destination'] = destination;

      this.set('pairs', [ defaultPair ]);
      this.unset('source');
      this.unset('destination');
    }
  },

  /**
   * Transform Attributes to support multiple entries in Single Redirect Rule
   * Wiki: https://github.com/blunderboy/requestly/wiki/Format-of-different-Rule-Types
   */
  transformAttributes: function() {
    this.introducePairs();
  }
});
/**
 * Cancel Rule is a special type of Redirect Rule where destination is falsy (null | undefined | notset | '')
 */
var CancelRuleModel = RedirectRuleModel.extend({
  defaults: function() {
    return _.extend(RedirectRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.CANCEL
    });
  },

  isDeprecatedFormat: function() {
    return typeof this.get('source') !== 'undefined';
  }
});
var ReplaceRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.REPLACE,
      pairs: [
        this.getDefaultPair()
      ]
    });
  },

  getDefaultPair: function() {
    return {
      from: '',
      to: '',
      status: RQ.RULE_STATUS.INACTIVE,
      source: this.getDefaultSource()
    };
  },

  upgradeToV2: function() {
    this.insertDefaultSourceInPairs();
    this.setVersion(2);
  },

  transformAttributes: function() {
    // There was no "version" field before v2
    if (!this.getVersion()) {
      this.upgradeToV2();
    }
  }
});

var HeadersRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.HEADERS,
      pairs: [
        this.getDefaultPair()
      ]
    });
  },

  getDefaultPair: function() {
    return {
      type: RQ.MODIFICATION_TYPES.ADD,
      target: RQ.HEADERS_TARGET.REQUEST,
      header: '',
      value: '',
      source: this.getDefaultSource()
    };
  },

  transformAttributes: function() {
    this.insertDefaultSourceInPairs();
  }
});
var RulesCollection = Backbone.Collection.extend({
  model: BaseRuleModel,

  fetchRules: function(options) {
    var that = this;
    options = options || {};

    RQ.StorageService.getRecords({
      forceFetch: true,
      callback: function(rules) {
        that.models.length = 0;

        _.each(rules, function(ruleObject) {
          var model = new that.model(ruleObject);
          that.add(model);
        });

        if (typeof options.success === 'function') {
          options.success(that);
        }

        that.trigger('loaded');
      }
    });
  },

  comparator: function(model) {
    // By default rules should be sorted by timestamp in decreasing order
    // Latest rule should come on top
    return -1 * model.getTimestampFromId();
  }
});
var SharedRulesCollection = RulesCollection.extend({
  model: BaseRuleModel,

  fetchRules: function(sharedListId) {
    var that = this,
      sharedListRef = RQ.currentUser.getPublicSharedListRef(sharedListId);

    sharedListRef.on('value', function(snapshot) {
      var sharedListNode = snapshot.val(),
        rules = sharedListNode.rules;

      _.each(rules, function(ruleObject) {
        var model = new that.model(ruleObject);
        that.add(model);
      });

      console.log(sharedListNode);
      that.trigger('loaded');
    }, function(error) {
      alert('Error fetching rules from sharedList: ' + error.code);
    });
  }
});
var SharedListCollection = Backbone.Collection.extend({
  model: SharedListModel,

  /**
   * Shared Lists are stored partially under User Node and partially under Public Node
   * Rules, access, isEnabled, shareId are under public Node
   * listName, shareId, creationDate are under user Node
   */
  fetchSharedLists: function() {
    var that = this,
      currentUserSharedListsRef = RQ.currentUser.getUserSharedListsRef();

    currentUserSharedListsRef.once('value', function(snapshot) {
      var list = snapshot.val(),
        deferredPublicSharedListsObjects = [];

      _.each(list, function(userSharedListObject) {
        // Set List Name and shareId from sharedList under User Node
        var listModel = new that.model(userSharedListObject),
          publicSharedListRef = RQ.currentUser.getPublicSharedListRef(userSharedListObject.shareId);

        listModel.set('id', userSharedListObject.shareId);
        listModel.set('sharedUrl', RQ.getSharedURL(userSharedListObject.shareId));
        listModel.set('creationDate', userSharedListObject.creationDate);

        that.add(listModel);

        deferredPublicSharedListsObjects.push(RQ.FirebaseUtils.getDeferredNodeValue(publicSharedListRef, { once: true }));
      });

      Promise
        .all(deferredPublicSharedListsObjects)
        .then(function(sharedListValues) {
          _.each(sharedListValues, function(publicSharedListObject) {
            var listModel = that.get(publicSharedListObject.shareId);

            listModel.set('isEnabled', publicSharedListObject.isEnabled);
          });

          that.trigger('loaded');
        })
        .catch(function(error) {
          alert('Error while fetching Shared List: ' + error);
        });
    }, function(error) {
      alert('Error fetching rules from sharedList: ' + error.code);
    });
  }
});

RQ.Mixins.InputValidation = {
  validateSourceField: function(operator, sourceField) {
    var errorMessage = null;

    if (!sourceField) {
      errorMessage = 'Error: Source Field can not be empty';
    }

    if (operator === RQ.RULE_OPERATORS.MATCHES && !RQ.Utils.isValidRegex(sourceField)) {
      errorMessage = 'Error: "' + sourceField + '" is not a valid regular expression';
    }

    if (operator === RQ.RULE_OPERATORS.EQUALS && !RQ.Utils.isValidUrl(sourceField)) {
      errorMessage = 'Error: Source Url should begin with a valid protocol (http: | https: | ftp:)'
    }

    if (errorMessage != null) {
      Notification.show('error', errorMessage);
      return false;
    }

    return true;
  },

  validateDestinationField: function(operator, destinationField) {
    var errorMessage = null;

    if (!destinationField) {
      errorMessage = 'Error: Destination Field can not be empty';
    }

    if ([RQ.RULE_OPERATORS.CONTAINS, RQ.RULE_OPERATORS.EQUALS].indexOf(operator) >=0
      && !RQ.Utils.isValidUrl(destinationField)) {
        errorMessage = 'Error: Destination Url should begin with a valid protocol (http: | https: | ftp:)'
    }

    if (errorMessage != null) {
      Notification.show('error', errorMessage);
      return false;
    }

    return true;
  }
};
var BaseView = Backbone.View.extend({
  Mixins: [],

  Model: Backbone.Model,

  /**
   * loadModel: loads model and binds to the view
   * @param modelOrData Backbone Model instance or just a backbone model
   */
  loadModel: function(modelOrData) {
    if (modelOrData instanceof Backbone.Model) {
      this.model = modelOrData;
    } else {
      this.model = new this.Model(modelOrData);
    }
  },

  loadMixin: function(mixin) {
    _.extend(this, mixin);
  },

  loadMixins: function(mixins) {
    _.each(mixins, this.loadMixin, this);
  },

  initialize: function(options) {
    options = options || {};
    this.registerBinders();
    this.loadModel(options.model);
    this.loadMixins(this.Mixins);
    this.alsoInitialize();
  },

  render: function(options) {
    options = options || {};

    // Load the passed model and use it to render the view
    if (options.model) {
      this.loadModel(options.model);
    }

    /* If template is not passed as option,
     every editor view has to provide its own template by getTemplate method */
    this.template = options.template || this.getTemplate();

    var markup = this.getMarkup(this.template);

    this.$el.html(RQ.Utils.sanitizeHTML(markup));

    this.initWidgets();
  },

  getMarkup: function(template) {
    return template(this.model.toJSON());
  },

  registerBinders: function() { /* No Op */ },

  // To be overridden by inheriting component
  alsoValidate: function() { return true; },

  removeAdditionalFields: function() { /* No Op */ },

  alsoInitialize: function() { /* No Op */ },

  initWidgets: function() { /* No Op */ }
});
/**
 * Usage: RQ.showModalView(modalView, {
 *   model: {
 *     heading: 'Confirm Delete',
 *     content: 'Are you sure you want to delete the rule ?'
 *     cancelButton: true,
 *     primaryButton: {
 *       text: 'Delete'
 *     }
 *  });
 */
var Modal = BaseView.extend({
  className: 'modal fade',

  attributes: {
    role: 'dialog'
  },

  getTemplate: function() {
    return RQ.Templates.Modal;
  },

  events: {
    'change input[data-key]': 'updateValueFromInput',
    'click .modal-footer .btn-primary': 'handlePrimaryButtonClicked'
  },

  handlePrimaryButtonClicked: function() { /* No Op */ },

  updateValueFromInput: function(event) {
    this.model.set(event.target.getAttribute('data-key'), event.target.value);
  },

  show: function(options) {
    RQ.showModalView(this, options);
  }
});
var SusiModal = Modal.extend({
  id: 'susi-modal',

  events: {
    'click .auth-provider': 'authenticateUser'
  },

  getTemplate: function() {
    return RQ.Templates.SusiModal;
  },

  registerBinders: function() {
    this.handleLoginError = this.handleLoginError.bind(this);
  },

  authenticateUser: function(event) {
    var provider = event.currentTarget.getAttribute('data-provider');
    RQ.currentUser.authenticateUser(provider, this.handleLoginError);
  },

  handleLoginError: function(error) {
    console.log('Error signin in:', error);
  }
});
var ShareRulesModal = Modal.extend({
  id: 'share-rules-modal',

  getTemplate: function() {
    return RQ.Templates.ShareRulesModal;
  },

  handlePrimaryButtonClicked: function(event) {
    var eventName = event.currentTarget.getAttribute('data-event');

    this.trigger(eventName, this.model.toJSON());
  }
});
var BaseRuleEditorView = BaseView.extend({

  events: {
    'keyup .rule-name-input': 'updateRuleName',
    'change .status-toggle': 'updateRuleStatus',
    'keyup .rule-description': 'updateRuleDescription',
    'click .add-pair': 'addPair',
    'click .delete-pair': 'deletePair',
    'click .close-editor': 'closeEditor',
    'click .save-rule': 'saveRule',
    'click .dropdown .dropdown-option': 'handleDropdownValueChanged'
  },

  initWidgets: function() {
    this.$el.find('.status-toggle').bootstrapToggle();
    this.$el.find('[data-toggle="dropdown"]').dropdown();
    this.initDropdowns();
  },

  updateRuleName: function(event) {
    this.model.setName(event.target.value);
  },

  updateRuleStatus: function(event) {
    var status = $(event.currentTarget).is(':checked') ? RQ.RULE_STATUS.ACTIVE : RQ.RULE_STATUS.INACTIVE;
    this.model.setStatus(status);
  },

  updateRuleDescription: function(event) {
    this.model.setDescription(event.target.value);
  },

  addPair: function() {
    var newPair = this.model.getDefaultPair(),
      pairs = this.model.getPairs();

    pairs.push(newPair);
    this.render();
  },

  deletePair: function(event) {
    var $target = $(event.target),
      pairIndex = Number($target.parents('.pair-container').attr('data-index')),
      pairs = this.model.getPairs();

    pairs.splice(pairIndex, 1);
    this.render();
  },

  /**
   * If key is complex, e.g source.operator then drill down to leaf node and add the value to corresponding key
   *
   * @param pair
   * @param key
   * @param value
   * @returns Updated pair
   */
  updateFieldInPair: function(pair, key, value) {
    var nestedKeys = key.split('.'),
      index,
      currentNode = pair;

    // Reach the leaf node
    for (index = 0; index < nestedKeys.length - 1; index++) {
      currentNode = currentNode[ nestedKeys[index] ];
    }

    // Finally Set the value once we reach the leaf node
    currentNode[ nestedKeys[index] ] = value;

    return pair;
  },

  updateRulePair: function(event) {
    var $target = $(event.target),
      index = Number($target.parents('.pair-container').attr('data-index')),
      key = $target.attr('data-key'),
      pairs = this.model.getPairs();

    if (event.target.tagName === 'INPUT') {
      this.updateFieldInPair(pairs[index], key, event.target.value);
    }
  },

  updateDropdownSelectionState: function($dropdown) {
    $dropdown = $($dropdown);

    var $selectedOption = $dropdown.find('.dropdown-option[selected]'),
      $displayButton = $dropdown.find('.dropdown-toggle');

    $displayButton.find('.dropdown-value')
      .html($selectedOption.html())
      .attr('data-value', $selectedOption.attr('data-value'));
  },

  initDropdowns: function() {
    _.each(this.$el.find('.dropdown'), this.updateDropdownSelectionState, this);
  },

  handleDropdownValueChanged: function(event) {
    var $target = $(event.target),
      $dropdown = $target.parents('.dropdown'),
      index = Number($target.parents('.pair-container').attr('data-index')),
      key = $dropdown.attr('data-key'),
      pairs = this.model.getPairs();

    $dropdown.find('.dropdown-option').removeAttr('selected');
    $target.attr('selected', true);

    this.updateDropdownSelectionState($dropdown);
    this.updateFieldInPair(pairs[index], key, $target.attr('data-value'));
    this.render();
  },

  validateRule: function() {
    if (!this.model.isValid()) {
      Notification.show('error', 'Error: Rule Name can not be empty');
      return false;
    }

    return this.alsoValidate();
  },

  saveRule: function() {
    var ts = this.model.getTimestamp(),
      ruleName = this.model.getName(),
      eventAction = RQ.GA_EVENTS.ACTIONS.MODIFIED,
      that = this;

    // Set Creation date if not exists
    if (!this.model.hasCreationDate()) {
      eventAction = RQ.GA_EVENTS.ACTIONS.CREATED;
      this.model.setCreationDate(ts);
    }

    if (!this.validateRule()) {
      return false;
    }

    this.removeAdditionalFields();

    this.model.save({
      callback: function() {
        Notification.show('success', ruleName + ' has been saved successfully!');
        RQ.Utils.submitEvent('rule', eventAction, that.model.getRuleType().toLowerCase() + ' rule ' + eventAction);
      }
    });
  },

  closeEditor: function() {
    // In case of shared Rule Delete last part from current route -> rule Index inside the sharedList
    var route = this.isSharedRule()
      ? RQ.Utils.removeLastPart(Backbone.history.fragment, '/')
      : '';

    RQ.router.navigate(route, { trigger: true });
  },

  isSharedRule: function() {
    return this.model.get('isSharedRule');
  }
});
var RedirectRuleEditorView = BaseRuleEditorView.extend({
  Model: RedirectRuleModel,

  Mixins: [ RQ.Mixins.InputValidation ],

  id: 'redirect-rule-editor',

  className: 'rule-editor',

  getTemplate: function() {
    return RQ.Templates.RedirectRuleEditor;
  },

  getMarkup: function(template) {
    var ruleJson = RQ.TemplateHelpers.redirectRuleHelper(this.model.toJSON());
    return template(ruleJson);
  },

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair',
    'change .pair-container select': 'updateRulePair'
  }),

  isValidPair: function(pair) {
    var source = pair['source'],
      destinationField = pair['destination'];

    return this.validateSourceField(source.operator, source.value)
      && this.validateDestinationField(source.operator, destinationField);
  },

  alsoValidate: function() {
    var pairs = this.model.getPairs(),
      pairIndex,
      inValidPairIndex = -1,
      isValid;

    for (pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      isValid = this.isValidPair(pairs[pairIndex]);

      if (!isValid) {
        inValidPairIndex = pairIndex;
        return false;
      }
    }

    return true;
  },

  removeAdditionalFields: function() {
    var pairs = this.model.getPairs();

    _.each(pairs, function(pair) {
      delete pair['sourcePlaceholder'];
      delete pair['destinationPlaceholder'];
    });
  }
});
var CancelRuleEditorView = RedirectRuleEditorView.extend({

  Model: CancelRuleModel,

  id: 'cancel-rule-editor',

  className: 'rule-editor',

  getTemplate: function() {
    return RQ.Templates.CancelRuleEditor;
  },

  isValidPair: function(pair) {
    var source = pair['source'];

    return this.validateSourceField(source.operator, source.value);
  },

  removeAdditionalFields: function() {
    var pairs = this.model.getPairs();

    _.each(pairs, function(pair) {
      delete pair['sourcePlaceholder'];
      delete pair['destinationPlaceholder'];
      delete pair['destination'];
    });
  }
});
var ReplaceRuleEditorView = BaseRuleEditorView.extend({

  Model: ReplaceRuleModel,

  id: 'replace-rule-editor',

  className: 'replace-rule-editor rule-editor',

  getTemplate: function() {
    return RQ.Templates.ReplaceRuleEditor;
  },

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair'
  })
});
var HeadersEditorView = BaseRuleEditorView.extend({

  Model: HeadersRuleModel,

  getTemplate: function() {
    return RQ.Templates.HeadersRuleTemplate;
  },

  id: 'headers-rule-editor',

  className: 'rule-editor',

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair'
  }),

  hideMessage: function() {
    $(this.el).find('.message').hide();
  }
});
var RuleIndexView = Backbone.View.extend({

  className: 'rule-index',

  Collection: RulesCollection,

  events: {
    'click .ruleName': 'showRuleEditor',
    'change .status-toggle': 'toggleStatus',
    'click .delete-rules-button': 'deleteRules',
    'click .select-all-rules-checkbox': 'selectAllRules',
    'click .select-rule-checkbox': 'selectRule',
    'click .export-rules-button': 'exportRules',
    'click .import-rules-button': 'importRules',
    'click .share-rules-button': 'handleShareRulesButtonClicked'
  },

  initialize: function() {
    this.rulesCollection = new this.Collection();
    this.susiModal = new SusiModal();
    this.shareRulesModal = new ShareRulesModal({});

    this.registerListeners();
  },

  registerListeners: function() {
    // We don't need to listen on add event because rule is always created from editor
    // And on route change we always fetch the latest rules from DB
    this.listenTo(this.rulesCollection, 'loaded', this.render);
    this.listenTo(this.rulesCollection, 'change', this.render);
    this.listenTo(this.rulesCollection, 'remove', this.render);
    this.listenTo(this.rulesCollection, 'reset', this.render);

    this.shareRulesModal.on('modal:closed', this.saveSharedListName);
  },

  initWidgets: function() {
    this.$el = $(this.el);

    this.$el.find('.status-toggle').bootstrapToggle();
    this.$el.find('[data-toggle="tooltip"]').tooltip();
  },

  updateCollection: function() {
    this.rulesCollection.fetchRules();
  },

  getTemplate: function() {
    return RQ.Templates.RuleIndex;
  },

  getMarkup: function(template) {
    return template({
      rules: this.rulesCollection.toJSON(),
      user: RQ.currentUser.toJSON()
    });
  },

  render: function(options) {
    var markup,
      $el = $(this.el);

    options = options || {};

    if (options && options.update) {
      // updateCollection will trigger 'loaded' event which will render the view
      this.updateCollection(options);
    } else {
      this.template = this.getTemplate();

      markup = this.getMarkup(this.template);
      $el.html(markup);
    }

    this.initWidgets();
  },

  showRuleEditor: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      id = $ruleItemRow.data('id');

    RQ.router.navigate('/edit/' + id, { trigger: true });
  },

  toggleStatus: function(event) {
    var $ruleItemRow = $(event.currentTarget).parents('.rule-item-row'),
      ruleModel = this.rulesCollection.get($ruleItemRow.data('id'));

    return this.toggleRuleStatus(ruleModel);
  },

  toggleRuleStatus: function(ruleModel) {
    var ruleName = ruleModel.getName(),
      eventAction,
      ruleStatus;

    if (ruleModel.getStatus() === RQ.RULE_STATUS.ACTIVE) {
      ruleModel.setStatus(RQ.RULE_STATUS.INACTIVE);
      eventAction = RQ.GA_EVENTS.ACTIONS.DEACTIVATED;
    } else {
      ruleModel.setStatus(RQ.RULE_STATUS.ACTIVE);
      eventAction = RQ.GA_EVENTS.ACTIONS.ACTIVATED;
    }

    ruleStatus = ruleModel.getStatus();

    ruleModel.save({
      callback: function() {
        Notification.show('info', ruleName + ' is now ' + ruleStatus);
        RQ.Utils.submitEvent('rule', eventAction, ruleModel.getRuleType().toLowerCase() + ' rule ' + eventAction);
      }
    });
    return false;
  },

  deleteRules: function() {
    var selectedRules = this.getSelectedRules(),
      numSelectedRules = selectedRules.length;

    if (!numSelectedRules) {
      alert('Please select one or more rules to delete');
      return;
    }

    if (window.confirm(RQ.MESSAGES.DELETE_RULES)) {
      // Trigger the model remove routine for each selected rule
      selectedRules.forEach(function(rule) {
        rule.remove();
      });

      // Remove the selected rules from the collection
      this.rulesCollection.remove(selectedRules);

      // Show notification
      Notification.show('success', numSelectedRules + ' rules have been deleted!');

      RQ.Utils.submitEvent(
        'rules',
        RQ.GA_EVENTS.ACTIONS.DELETED,
        ['Multiple', 'rules', RQ.GA_EVENTS.ACTIONS.DELETED].join(' ')
      );
    }
  },

  selectAllRules: function(event) {
    var isChecked = $(event.currentTarget).is(':checked');
    $('.select-rule-checkbox').prop('checked', isChecked);
    $('.rule-item-row').toggleClass('selected', isChecked);
  },

  selectRule: function(event) {
    var $checkbox = $(event.currentTarget),
      isChecked = $checkbox.is(':checked');

    if (!isChecked) {
      $('.select-all-rules-checkbox').prop('checked', false);
    }
    $checkbox.closest('.rule-item-row').toggleClass('selected', isChecked);
  },

  getSelectedRules: function() {
    var $selectedRows = $('.select-rule-checkbox:checked').closest('.rule-item-row'),
      rules = [];

    _.each($selectedRows, function(row) {
      rules.push(this.getRuleFromRow(row));
    }, this);

    return rules;
  },

  getRuleFromRow: function(row) {
    var $row = $(row),
      ruleId = $row.data('id');

    return this.rulesCollection.get(ruleId);
  },

  exportRules: function() {
    var selectedRules = this.getSelectedRules(),
      rules = selectedRules.length ? selectedRules : this.rulesCollection.models;

    var rulesAttributes = _.pluck(rules, 'attributes');
    Backbone.trigger('file:save', JSON.stringify(rulesAttributes, null, 2), 'requestly_rules');

    RQ.Utils.submitEvent('rules', RQ.GA_EVENTS.ACTIONS.EXPORTED, 'Rules ' + RQ.GA_EVENTS.ACTIONS.EXPORTED);
  },

  importRules: function() {
    var that = this;
    Backbone.trigger('file:load', function(data) {
      var validRulesCount = 0,
        rules = JSON.parse(data);
      _.each(rules, function(rule) {
        var ruleModel = new BaseRuleModel(rule);
        if(ruleModel.isValid()) {
          validRulesCount++;
          // Update / add the rule to collection.
          that.rulesCollection.set(ruleModel, {remove: false, silent: true});
          ruleModel.save();
        }
      });

      // Show notification : depends on the number of rules imported
      if (rules.length == validRulesCount){
        Notification.show('success', 'All Rules Imported Successfully');
      } else if (validRulesCount == 0) {
        Notification.show('error', 'Imported Rules are invalid');
      } else {
        Notification.show('success', validRulesCount + ' out of ' + rules.length + ' rules imported successfully');
      }

      that.render();
      RQ.Utils.submitEvent('rules', RQ.GA_EVENTS.ACTIONS.IMPORTED, 'Rules ' + RQ.GA_EVENTS.ACTIONS.IMPORTED);
    });
  },

  showLoginModal: function() {
    this.susiModal.show();
  },

  handleShareRulesButtonClicked: function() {
    var that = this,
      authPromise = RQ.currentUser.checkUserAuthentication(),
      selectedRules,
      shareId = RQ.Utils.getId(),
      sharedUrl;

    authPromise.then(function(authData) {
      var currentUserSharedListsRef,
        userSharedListsDeferredObject;

      if (!authData) {
        that.showLoginModal();
      } else {
        selectedRules = _.pluck(that.getSelectedRules(), 'attributes');

        if (selectedRules.length === 0) {
          alert('Please select one or more rules to share');
          return;
        }

        currentUserSharedListsRef = RQ.currentUser.getUserSharedListsRef();
        userSharedListsDeferredObject = RQ.FirebaseUtils.getDeferredNodeValue(currentUserSharedListsRef, { 'once': true });

        userSharedListsDeferredObject.then(function(sharedLists) {
          if (_.keys(sharedLists).length >= RQ.LIMITS.NUMBER_SHARED_LISTS) {
            RQ.showModalView(new Modal(), {
              model: {
                heading: 'Limit Exceeded',
                content: RQ.MESSAGES.SHARED_LISTS_LIMIT_REACHED,
                cancelButton: true
              }
            });

            RQ.Utils.submitEvent(
              RQ.GA_EVENTS.CATEGORIES.SHARED_LIST,
              RQ.GA_EVENTS.ACTIONS.LIMIT_REACHED,
              'Shared List limit reached'
            );

            return;
          }

          sharedUrl = RQ.currentUser.createSharedList(shareId, selectedRules);
          that.saveSharedListName({ shareId: shareId });

          that.shareRulesModal.show({
            model: { shareId: shareId, sharedUrl: sharedUrl }
          });
        });
      }
    }).catch(function(error) {
      alert(RQ.MESSAGES.ERROR_AUTHENTICATION);
    });
  },

  saveSharedListName: function(shareData) {
    var sharedListName = shareData.listName || 'My Shared List',
      shareId = shareData.shareId;

    RQ.currentUser.setSharedListName(shareId, sharedListName);
  }
});

var SharedRulesIndexView = RuleIndexView.extend({

  Collection: SharedRulesCollection,

  className: 'shared-rules-index',

  getTemplate: function() {
    return RQ.Templates.SharedRulesIndex;
  },

  initialize: function(options) {
    this.rulesCollection = new this.Collection();
    this.options = options || {};

    this.listenTo(this.rulesCollection, 'loaded', this.render);
  },

  updateCollection: function(options) {
    this.rulesCollection.fetchRules(options.sharedListId);
  },

  showRuleEditor: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      id = this.options.sharedListId,
      index = $ruleItemRow.data('index');

    RQ.router.navigate('/sharedList/' + id + '/' + index, { trigger: true });
  },

  importRules: function() {
    var rules = this.rulesCollection.toJSON();

    _.each(rules, function(rule) {
      var ruleModel = new BaseRuleModel(rule);
      ruleModel.save();
    });

    RQ.Utils.submitEvent(RQ.GA_EVENTS.CATEGORIES.SHARED_LIST, RQ.GA_EVENTS.ACTIONS.IMPORTED, 'Shared List ' + RQ.GA_EVENTS.ACTIONS.IMPORTED);
    Notification.show('success', 'Rules Imported Successfully');
  }
});

var SharedListIndexView = RuleIndexView.extend({

  Collection: SharedListCollection,

  className: 'shared-list-index',

  getTemplate: function() {
    return RQ.Templates.SharedListIndex;
  },

  getMarkup: function(template) {
    return template({
      list: this.listCollection.toJSON(),
      user: RQ.currentUser.toJSON()
    });
  },

  initialize: function(options) {
    this.listCollection = new this.Collection();
    this.options = options || {};

    this.listenTo(this.listCollection, 'loaded', this.render);
  },

  updateCollection: function() {
    this.listCollection.fetchSharedLists();
  }
});

var RuleCardsView = Backbone.View.extend({

  events: {
    'click .rule-card': 'selectRule'
  },

  render: function(options) {
    if (options && options.model && options.model instanceof Backbone.Model) {
      this.model = options.model;
    }

    var markup = RQ.Templates.RuleCardsView;
    $(this.el).html(markup);
  },

  selectRule: function(event) {
    var $ruleCard = $(event.currentTarget),
      ruleEditorRoute = $ruleCard.attr('data-target');

    RQ.router.navigate(ruleEditorRoute, true);
  }
});
RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'selectRule': 'showRuleCardsView',
    'new/:type': 'showRuleCreator',
    'edit/:id': 'showRuleEditor',
    'sharedLists': 'showSharedLists',
    'sharedList/:id': 'showSharedRulesList',
    'sharedList/:id/:ruleIndex': 'showSharedRuleEditor'
  },

  ruleModelMap: {
    REDIRECT: RedirectRuleModel,
    CANCEL: CancelRuleModel,
    REPLACE: ReplaceRuleModel,
    HEADERS: HeadersRuleModel
  },

  ruleViewMap: {
    'REDIRECT': RedirectRuleEditorView,
    'CANCEL': CancelRuleEditorView,
    'REPLACE': ReplaceRuleEditorView,
    'HEADERS': HeadersEditorView
  },

  showRulesList: function() {
    var ruleIndexView = new RuleIndexView();
    RQ.showView(ruleIndexView, { update: true });
  },

  showSharedLists: function() {
    var sharedListsIndexView = new SharedListIndexView(),
      authPromise = RQ.currentUser.checkUserAuthentication();

    authPromise.then(function(authData) {
      var susiModal;

      if (!authData) {
        susiModal = new SusiModal({ model: RQ.currentUser });
        susiModal.show({ model: { content: RQ.MESSAGES.SIGN_IN_TO_VIEW_SHARED_LISTS } });
      } else {
        RQ.showView(sharedListsIndexView, { update: true });
      }
    }).catch(function(error) {
      alert(RQ.MESSAGES.ERROR_AUTHENTICATION);
    });
  },

  showSharedRulesList: function(sharedListId) {
    var sharedRulesIndexView = new SharedRulesIndexView({ sharedListId: sharedListId });
    RQ.showView(sharedRulesIndexView, { update: true, sharedListId: sharedListId });
    RQ.Utils.submitEvent(RQ.GA_EVENTS.CATEGORIES.SHARED_LIST, RQ.GA_EVENTS.ACTIONS.VIEWED, 'Shared List Viewed');
  },

  showRuleCardsView: function() {
    var ruleCardsView = new RuleCardsView();
    RQ.showView(ruleCardsView);
  },

  showRuleCreator: function(ruleType) {
    var ruleTypeUpperCase = ruleType.toUpperCase(),
      editorView = new this.ruleViewMap[ruleTypeUpperCase]();

    RQ.showView(editorView);
  },

  showRuleEditor: function(ruleId) {
    var that = this;

    RQ.StorageService.getRecord(ruleId, function(modelJSON) {
      var ruleModelJSON = modelJSON[ruleId],
        ruleTypeUpperCase = ruleModelJSON.ruleType.toUpperCase(),
        editorView = new that.ruleViewMap[ruleTypeUpperCase](),
        model = new that.ruleModelMap[ruleTypeUpperCase](ruleModelJSON);

      RQ.showView(editorView, { model: model });
    });
  },

  showSharedRuleEditor: function(sharedListId, ruleIndexInList) {
    var sharedListRef = RQ.currentUser.getPublicSharedListRef(sharedListId),
      that = this;

    sharedListRef.on('value', function (snapshot) {
      var sharedListNode = snapshot.val(),
        ruleModelJSON = sharedListNode.rules[ruleIndexInList],
        ruleTypeUpperCase,
        editorView,
        model;

      if (!ruleModelJSON || _.isEmpty(ruleModelJSON)) {
        alert('Rule does not exist');
        return;
      }

      ruleModelJSON['isViewMode'] = true;
      ruleModelJSON['isSharedRule'] = true;

      ruleTypeUpperCase = ruleModelJSON.ruleType.toUpperCase();
      editorView = new that.ruleViewMap[ruleTypeUpperCase]();
      model = new that.ruleModelMap[ruleTypeUpperCase](ruleModelJSON);

      RQ.showView(editorView, {model: model});
    });
  }
});
RQ.init({ el: '.content' });
