var SusiModal = BaseView.extend({
  id: 'susi-modal',

  className: 'modal fade',

  attributes: {
    role: 'dialog'
  },

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
    this.model.authenticateUser(provider, this.handleLoginError);
  },

  handleLoginError: function(error) {
    console.log('Error signin in:', error);
  },

  show: function() {
    RQ.showModalView(this);
  }
});