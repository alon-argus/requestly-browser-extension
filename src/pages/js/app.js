var RQ = RQ || {};
  
RQ.StorageService = StorageService;

RQ.Mixins = RQ.Mixins || {};

RQ.TemplateHelpers = RQ.TemplateHelpers || {};
RQ.HandlebarHelpers = RQ.HandlebarHelpers || {};

RQ.init = function() {
  this.Models = {};

  this.Collections = {};

  this.showView = function(view, options) {
    if (this.currentView) {
      this.currentView.close();
    }

    this.currentView = view;
    this.currentView.render(options);

    $('#content').html(this.currentView.el);
  };

  this.addLoginModal();

  this.router = new RQ.Router();

  this.fetchSettings();

  this.addListenerForBackgroundMessages();

  Backbone.history.start();
};

RQ.addLoginModal = function() {
  var loginDialogMarkup = RQ.Templates.LoginModal();
  $(loginDialogMarkup).appendTo('body');
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

Backbone.View.prototype.close = function() {
  this.remove();
  this.unbind();
};