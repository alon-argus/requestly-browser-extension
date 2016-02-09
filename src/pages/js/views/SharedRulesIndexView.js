var SharedRulesIndexView = RuleIndexView.extend({

  Collection: SharedRulesCollection,

  initialize: function() {
    this.rulesCollection = new this.Collection();

    this.listenTo(this.rulesCollection, 'loaded', this.render);
  },

  updateCollection: function(options) {
    this.rulesCollection.fetchRules(options.sharedListId);
  },

  getTemplate: function() {
    return RQ.Templates.SharedRulesIndex;
  },

  showRuleEditor: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      id = $ruleItemRow.data('id');

    RQ.router.navigate('/edit/' + id, { trigger: true });
  },

  importRules: function() {
    var that = this;

    Backbone.trigger('file:load', function(data) {
      var rules = JSON.parse(data);
      _.each(rules, function(rule) {
        var ruleModel = new BaseRuleModel(rule);
        // Update / add the rule to collection.
        that.rulesCollection.set(ruleModel, { remove: false, silent: true });
        ruleModel.save();
      });

      that.render();
      // Commenting due to #95 Event passing strategy Improvement for analytics tracking
      //RQ.Utils.submitEvent('rules', RQ.GA_EVENTS.ACTIONS.IMPORTED, 'Rules ' + RQ.GA_EVENTS.ACTIONS.IMPORTED);
    });
  }
});
