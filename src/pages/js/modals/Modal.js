var Modal = BaseView.extend({
  id: 'rq-modal',

  className: 'modal fade',

  attributes: {
    role: 'dialog'
  },

  events: {
    'change input[data-key]': 'updateValueFromInput',
    'click .cta-container .btn-primary': 'handlePrimaryButtonClicked'
  },

  handlePrimaryButtonClicked: function() { /* No Op */ },

  updateValueFromInput: function(event) {
    this.model.set(event.target.getAttribute('data-key'), event.target.value);
  },

  show: function(options) {
    RQ.showModalView(this, options);
  }
});