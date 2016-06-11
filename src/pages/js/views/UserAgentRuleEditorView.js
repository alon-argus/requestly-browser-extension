var UserAgentRuleEditorView = BaseRuleEditorView.extend({
  Model: UserAgentRuleModel,

  Mixins: [ RQ.Mixins.InputValidation ],

  id: 'useragent-rule-editor',

  className: 'rule-editor',

  getTemplate: function() {
    return RQ.Templates.UserAgentRuleEditor;
  },

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair',
    'change .pair-container select': 'updateRulePair'
  }),

  isValidPair: function(pair) {
    var source = pair['source'],
      userAgent = pair['userAgent'];

    return (!source.value || this.validateSourceField(source.operator, source.value))
      && this.validateFieldNonEmpty(RQ.HEADER_NAMES.USER_AGENT, userAgent);
  },

  alsoValidate: function() {
    var pairs = this.model.getPairs(),
      pairIndex,
      inValidPairIndex = -1,
      isValid;

    for (pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      isValid = this.isValidPair(pairs[pairIndex]);

      if (!isValid) {
        inValidPairIndex = pairIndex;
        return false;
      }
    }

    return true;
  }
});