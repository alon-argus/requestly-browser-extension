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

  console.log('App - Checking User authentication');

  this.currentUser.checkUserAuthentication();

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