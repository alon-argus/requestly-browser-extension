var ReplaceRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.REPLACE,
      pairs: [
        this.getDefaultPair()
      ]
    });
  },

  getDefaultPair: function() {
    return {
      from: '',
      to: '',
      status: RQ.RULE_STATUS.INACTIVE,
      source: this.getDefaultSource()
    };
  },

  upgradeToV2: function() {
    this.insertDefaultSourceInPairs();
    this.setVersion(2);
  },

  transformAttributes: function() {
    // There was no "version" field before v2
    if (!this.getVersion()) {
      this.upgradeToV2();
    }
  }
});
