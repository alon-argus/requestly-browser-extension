var SusiModal = BaseView.extend({
  id: 'susi-modal',

  className: 'modal fade',

  attributes: {
    role: 'dialog'
  },

  getTemplate: function() {
    return RQ.Templates.SusiModal;
  },

  Model: UserSettingsModel,

  MODES: {
    LOGIN: 'login',
    SIGNUP: 'signup'
  },

  events: {
    'click .switch-to-login-mode': 'switchToLoginMode',
    'click .switch-to-signup-mode': 'switchToSignUpMode'
  },

  switchToLoginMode: function() {
    this.model.set('mode', this.MODES.LOGIN);
    this.render();
  },

  switchToSignUpMode: function() {
    this.model.set('mode', this.MODES.SIGNUP);
    this.render();
  },

  show: function() {
    RQ.showModalView(this);
  }
});