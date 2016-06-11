var UserAgentRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.USERAGENT,
      pairs: [
        this.getDefaultPair()
      ]
    });
  },

  getDefaultPair: function() {
    return {
      source: this.getDefaultSource(),
      userAgent: navigator && navigator.userAgent || ''
    }
  }
});