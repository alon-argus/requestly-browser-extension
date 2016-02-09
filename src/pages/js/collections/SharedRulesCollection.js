var SharedRulesCollection = RulesCollection.extend({
  model: BaseRuleModel,

  fetchRules: function(sharedListId) {
    var that = this,
      sharedListRef = RQ.currentUser.getSharedListRef(sharedListId);

    sharedListRef.on('value', function(snapshot) {
      var sharedListNode = snapshot.val(),
        rules = sharedListNode.rules;

      _.each(rules, function(ruleObject) {
        var model = new that.model(ruleObject);
        that.add(model);
      });

      console.log(sharedListNode);
      that.trigger('loaded');
    }, function(error) {
      alert('Error fetching rules from sharedList: ' + error.code);
    });

    /*RQ.StorageService.getRecords({
      forceFetch: true,
      callback: function(rules) {
        that.models.length = 0;

        _.each(rules, function(ruleObject) {
          var model = new that.model(ruleObject);
          that.add(model);
        });

        if (typeof options.success === 'function') {
          options.success(that);
        }

        that.trigger('loaded');
      }
    });*/
  }
});