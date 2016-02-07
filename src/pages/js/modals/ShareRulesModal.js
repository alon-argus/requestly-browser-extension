var ShareRulesModal = Modal.extend({
  id: 'share-rules-modal',

  getTemplate: function() {
    return RQ.Templates.ShareRulesModal;
  },

  handlePrimaryButtonClicked: function(event) {
    var eventName = event.currentTarget.getAttribute('data-event');

    this.trigger(eventName, this.model.toJSON());
  }
});