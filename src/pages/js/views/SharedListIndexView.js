var SharedListIndexView = RuleIndexView.extend({

  Collection: SharedListCollection,

  className: 'shared-list-index',

  getTemplate: function() {
    return RQ.Templates.SharedListIndex;
  },

  getMarkup: function(template) {
    return template({
      list: this.listCollection.toJSON(),
      user: RQ.currentUser.toJSON()
    });
  },

  initialize: function(options) {
    this.listCollection = new this.Collection();
    this.options = options || {};

    this.listenTo(this.listCollection, 'loaded', this.render);
  },

  updateCollection: function() {
    this.listCollection.fetchSharedLists();
  }
});
