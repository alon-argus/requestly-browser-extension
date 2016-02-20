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