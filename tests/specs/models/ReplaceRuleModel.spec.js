describe('Replace Rule Model', function() {
  var replaceRuleModel;

  beforeEach(function() {
    replaceRuleModel = new ReplaceRuleModel();
  });

  it('should have version field', function() {
    expect(replaceRuleModel.getVersion()).toBeDefined();
    expect(replaceRuleModel.getVersion()).toBe(RQ.VERSIONS.REPLACE_RULE);
  });

  it('should have source field inside pairs', function() {
    var pairs = replaceRuleModel.getPairs();
    expect(pairs[0].source).toBeDefined();
  });
});
