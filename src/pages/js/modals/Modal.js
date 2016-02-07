var Modal = BaseView.extend({
  id: 'rq-modal',

  className: 'modal fade',

  attributes: {
    role: 'dialog'
  },

  events: {
    'click .cta-container .btn-primary': 'handlePrimaryButtonClicked'
  },

  handlePrimaryButtonClicked: function() { /* No Op */ },

  show: function(options) {
    RQ.showModalView(this, options);
  }
});