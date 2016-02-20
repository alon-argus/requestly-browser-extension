var SharedListModel = Backbone.Model.extend({
  defaults: {
    listName: '',
    sharedUrl: '',
    shareId: '',
    creationDate: '',
    isEnabled: true
  }
});