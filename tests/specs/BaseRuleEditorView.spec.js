describe('Base Rule Editor View', function() {
  var baseRuleEditorView,
    baseRuleModel;

  beforeEach(function() {
    baseRuleModel = new BaseRuleModel();
    baseRuleEditorView = new BaseRuleEditorView({ model: baseRuleModel });
  });

  it('should validate basic properties of model', function() {
    expect(baseRuleEditorView.validateRule()).toBe(false);

    baseRuleModel.setName('Test Rule');
    baseRuleModel.setRuleType('Redirect');
    expect(baseRuleEditorView.validateRule()).toBe(true);
    expect(baseRuleEditorView.alsoValidate()).toBe(true);
  });
});
