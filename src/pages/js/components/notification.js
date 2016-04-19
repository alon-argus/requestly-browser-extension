var Notification = {
  Types: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  },

  NotificationTypeHandler: {
    success: toastr.success,
    error: toastr.error,
    info: toastr.info,
    warning: toastr.warning
  },

  defaultOptions: {
    closeButton: true,
    debug: false,
    positionClass: 'toast-top-right',
    onclick: null,
    showDuration: '2000',
    hideDuration: '1000',
    timeOut: '3000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
  },

  show: function(type, message, heading, opts) {
    var options = _.extend({}, this.defaultOptions, opts);

    this.NotificationTypeHandler[type].call(null, message, heading, options);
  }
};
