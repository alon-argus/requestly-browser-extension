var SharedRulesIndexView = RuleIndexView.extend({

  Collection: SharedRulesCollection,

  className: 'shared-rules-index',

  getTemplate: function() {
    return RQ.Templates.SharedRulesIndex;
  },

  initialize: function() {
    this.rulesCollection = new this.Collection();

    this.listenTo(this.rulesCollection, 'loaded', this.render);
  },

  updateCollection: function(options) {
    this.rulesCollection.fetchRules(options.sharedListId);
  },

  showRuleEditor: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      id = $ruleItemRow.data('id');

    RQ.router.navigate('/edit/' + id, { trigger: true });
  },

  importRules: function() {
    var rules = this.rulesCollection.toJSON();

    _.each(rules, function(rule) {
      var ruleModel = new BaseRuleModel(rule);
      ruleModel.save();
    });

    RQ.Utils.submitEvent('rules', RQ.GA_EVENTS.ACTIONS.IMPORTED, 'Shared Rules ' + RQ.GA_EVENTS.ACTIONS.IMPORTED);
    Backbone.trigger('notification', {
      className: 'rq-success',
      message: 'Rules imported successfully!!'
    });
  }
});
