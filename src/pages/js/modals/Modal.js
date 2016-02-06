var Modal = BaseView.extend({
  id: 'rq-modal',

  className: 'modal fade',

  attributes: {
    role: 'dialog'
  },

  show: function(options) {
    RQ.showModalView(this, options);
  }
});