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