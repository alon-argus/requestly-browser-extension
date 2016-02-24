RQ.Router = Backbone.Router.extend({
  routes: {
    '': 'showRulesList',
    'selectRule': 'showRuleCardsView',
    'new/:type': 'showRuleCreator',
    'edit/:id': 'showRuleEditor',
    'sharedLists': 'showSharedLists',
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

  showSharedLists: function() {
    var sharedListsIndexView = new SharedListIndexView(),
      authPromise = RQ.currentUser.checkUserAuthentication();

    authPromise.then(function(authData) {
      var susiModal;

      if (!authData) {
        susiModal = new SusiModal({ model: RQ.currentUser });
        susiModal.show({ model: { content: RQ.MESSAGES.SIGN_IN_TO_VIEW_SHARED_LISTS } });
      } else {
        RQ.showView(sharedListsIndexView, { update: true });
      }
    }).catch(function(error) {
      alert(RQ.MESSAGES.ERROR_AUTHENTICATION);
    });
  },

  showSharedRulesList: function(sharedListId) {
    var sharedRulesIndexView = new SharedRulesIndexView({ sharedListId: sharedListId });
    RQ.showView(sharedRulesIndexView, { update: true, sharedListId: sharedListId });
    RQ.Utils.submitEvent(RQ.GA_EVENTS.CATEGORIES.SHARED_LIST, RQ.GA_EVENTS.ACTIONS.VIEWED, 'Shared List Viewed');
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
    var sharedListRef = RQ.currentUser.getPublicSharedListRef(sharedListId),
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
      ruleModelJSON['isSharedRule'] = true;

      ruleTypeUpperCase = ruleModelJSON.ruleType.toUpperCase();
      editorView = new that.ruleViewMap[ruleTypeUpperCase]();
      model = new that.ruleModelMap[ruleTypeUpperCase](ruleModelJSON);

      RQ.showView(editorView, {model: model});
    });
  }
});