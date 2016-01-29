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
    'click .switch-to-signup-mode': 'switchToSignUpMode',
    'change #email-field': 'updateFieldInModel',
    'change #password': 'updateFieldInModel',
    'click .signup-mode .save-button': 'createUser'
  },

  switchToLoginMode: function() {
    this.model.set('mode', this.MODES.LOGIN);
    this.render();
  },

  switchToSignUpMode: function() {
    this.model.set('mode', this.MODES.SIGNUP);
    this.render();
  },

  createUser: function() {
    // TODO #93: Ask model to validate userInfo
    // TODO #93: Add Binders to success and error callback
    this.model.createUser(this.handleUserAccountCreated, this.handleUserSignupError);
  },

  handleUserAccountCreated: function() {
    // TODO #93: Trigger User is SignedIn
    // App should listen to it, Update currentUser information and ask IndexView to renderToolbar
  },

  handleUserSignupError: function(error) {
    console.log('Error creating user:', error);
  },

  updateFieldInModel: function(event) {
    var el = event.target,
      key = el.getAttribute('data-key'),
      profile = this.model.getProfile();

    profile[key] = el.value;
    this.model.setProfile(profile);
  },

  show: function() {
    RQ.showModalView(this);
  }
});