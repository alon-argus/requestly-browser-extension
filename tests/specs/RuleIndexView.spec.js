describe('Rule Index View', function() {
  var ruleIndexView,
    URL_SOURCES = {
      GOOGLE: 'http://www.google.com',
      YAHOO: 'http://www.yahoo.com'
    },
    getTestRule = function() {
      return {
        creationDate: 1450903275627,
        description: '',
        id: 'Redirect_1450903275627',
        name: 'Requestly Rule 1',
        pairs: [{
          source: {
            key: RQ.RULE_KEYS.URL,
            operator: RQ.RULE_OPERATORS.EQUALS,
            value: URL_SOURCES.GOOGLE
          },
          destination: URL_SOURCES.YAHOO
        }],
        ruleType: 'Redirect',
        status: 'Inactive'
      };
    };

  describe('#toggleRuleStatus', function() {
    beforeEach(function() {
      ruleIndexView = new RuleIndexView();
      ruleIndexView.rulesCollection.add(getTestRule());
      ruleIndexView.rulesCollection.trigger('loaded');
    });

    it('should update rule status', function () {
      var ruleModel = ruleIndexView.rulesCollection.get('Redirect_1450903275627');
      ruleIndexView.toggleRuleStatus(ruleModel);
      expect(ruleModel.getStatus()).toBe('Active');
    });

    it('should not reload page', function () {
      var spyOnWindowReload = spyOn(window.location, 'reload'),
        ruleModel = ruleIndexView.rulesCollection.get('Redirect_1450903275627');

      ruleIndexView.toggleRuleStatus(ruleModel);
      expect(spyOnWindowReload).not.toHaveBeenCalled();
    });
  });

  describe('#deleteRules', function() {
    beforeEach(function() {
      ruleIndexView = new RuleIndexView();
      ruleIndexView.rulesCollection.add(getTestRule());
      ruleIndexView.rulesCollection.trigger('loaded');

      spyOn(window, 'confirm').andCallFake(function() {
        return true;
      });

      spyOn(ruleIndexView, 'getSelectedRules').andCallFake(function() {
        return [ ruleIndexView.rulesCollection.get('Redirect_1450903275627') ];
      });
    });

    it('should deletes the rule', function() {
      var spyOnCollectionRemove = spyOn(ruleIndexView.rulesCollection, 'remove');

      ruleIndexView.deleteRules();
      expect(spyOnCollectionRemove).toHaveBeenCalled();
    });
  });

  describe('#importRules', function() {
    var exportJson;

    beforeEach(function() {
      ruleIndexView = new RuleIndexView();
      ruleIndexView.rulesCollection.add(getTestRule());
      ruleIndexView.rulesCollection.trigger('loaded');

      exportJson = [{
        creationDate: 1450903275657,
        description: '',
        id: 'Redirect_1450903275657',
        name: 'Requestly Rule 2',
        pairs: [{
          destination: URL_SOURCES.GOOGLE,
          source: {
            key: RQ.RULE_KEYS.URL,
            operator: RQ.RULE_OPERATORS.EQUALS,
            value: URL_SOURCES.YAHOO
          }
        }],
        ruleType: 'Redirect',
        status: 'Inactive'
      }];

      Backbone.on('file:load', function(callback) {
        callback(JSON.stringify(exportJson));
      });
    });

    it('should import new rules', function() {
      ruleIndexView.importRules();
      expect(ruleIndexView.rulesCollection.length).toBe(2);
    });

    it('should re-render view to show new rules', function() {
      var spyOnRender = spyOn(ruleIndexView, 'render');

      ruleIndexView.importRules();
      expect(spyOnRender).toHaveBeenCalled();
    });

    it('should not reload page', function() {
      var spyOnWindowReload = spyOn(window.location, 'reload');
      ruleIndexView.importRules();
      expect(spyOnWindowReload).not.toHaveBeenCalled();
    });
  });
});
