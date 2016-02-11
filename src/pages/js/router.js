RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'selectRule': 'showRuleCardsView',
    'new/:type': 'showRuleCreator',
    'edit/:id': 'showRuleEditor',
    'sharedList/:id': 'showSharedRulesList',
    'sharedList/:id/:ruleIndex': 'showSharedRuleEditor'
  },

  ruleModelMap: {
    REDIRECT: RedirectRuleModel,
    CANCEL: CancelRuleModel,
    REPLACE: ReplaceRuleModel,
    HEADERS: HeadersRuleModel
  },

  ruleViewMap: {
    'REDIRECT': RedirectRuleEditorView,
    'CANCEL': CancelRuleEditorView,
    'REPLACE': ReplaceRuleEditorView,
    'HEADERS': HeadersEditorView
  },

  showRulesList: function() {
    var ruleIndexView = new RuleIndexView();
    RQ.showView(ruleIndexView, { update: true });
  },

  showSharedRulesList: function(sharedListId) {
    var sharedRulesIndexView = new SharedRulesIndexView({ sharedListId: sharedListId });
    RQ.showView(sharedRulesIndexView, { update: true, sharedListId: sharedListId });
  },

  showRuleCardsView: function() {
    var ruleCardsView = new RuleCardsView();
    RQ.showView(ruleCardsView);
  },

  showRuleCreator: function(ruleType) {
    var ruleTypeUpperCase = ruleType.toUpperCase(),
      editorView = new this.ruleViewMap[ruleTypeUpperCase]();

    RQ.showView(editorView);
  },

  showRuleEditor: function(ruleId) {
    var that = this;

    RQ.StorageService.getRecord(ruleId, function(modelJSON) {
      var ruleModelJSON = modelJSON[ruleId],
        ruleTypeUpperCase = ruleModelJSON.ruleType.toUpperCase(),
        editorView = new that.ruleViewMap[ruleTypeUpperCase](),
        model = new that.ruleModelMap[ruleTypeUpperCase](ruleModelJSON);

      RQ.showView(editorView, { model: model });
    });
  },

  showSharedRuleEditor: function(sharedListId, ruleIndexInList) {
    var sharedListRef = RQ.currentUser.getSharedListRef(sharedListId),
      that = this;

    sharedListRef.on('value', function (snapshot) {
      var sharedListNode = snapshot.val(),
        ruleModelJSON = sharedListNode.rules[ruleIndexInList],
        ruleTypeUpperCase,
        editorView,
        model;

      if (!ruleModelJSON || _.isEmpty(ruleModelJSON)) {
        alert('Rule does not exist');
        return;
      }

      ruleModelJSON['isViewMode'] = true;

      ruleTypeUpperCase = ruleModelJSON.ruleType.toUpperCase();
      editorView = new that.ruleViewMap[ruleTypeUpperCase]();
      model = new that.ruleModelMap[ruleTypeUpperCase](ruleModelJSON);

      RQ.showView(editorView, {model: model});
    });
  }
});