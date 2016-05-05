var HeadersRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.HEADERS,
      pairs: [
        this.getDefaultPair()
      ]
    });
  },

  getDefaultPair: function() {
    return {
      type: RQ.MODIFICATION_TYPES.ADD,
      target: RQ.HEADERS_TARGET.REQUEST,
      header: '',
      value: '',
      source: this.getDefaultSource()
    };
  },

  transformAttributes: function() {
    this.insertDefaultSourceInPairs();
  }
});