var SusiModal = BaseView.extend({
  id: 'susi-modal',

  className: 'modal fade',

  attributes: {
    role: 'dialog'
  },

  Model: UserModel,

  getTemplate: function() {
    return RQ.Templates.SusiModal;
  },

  events: {
    'click .auth-provider': 'authenticateUser'
  },

  authenticateUser: function(event) {
    var provider = event.currentTarget.getAttribute('data-provider');

    // TODO #93: Add Binders to success and error callback
    this.model.authenticateUser(provider, this.handleUserAccountCreated, this.handleUserSignupError);
  },

  handleUserAccountCreated: function() {
    // TODO #93: Trigger User is SignedIn
    // App should listen to it, Update currentUser information and ask IndexView to renderToolbar
  },

  handleUserSignupError: function(error) {
    console.log('Error creating user:', error);
  },

  show: function() {
    RQ.showModalView(this);
  }
});