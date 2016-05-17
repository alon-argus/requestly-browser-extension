var RuleIndexView = Backbone.View.extend({

  className: 'rule-index',

  Collection: RulesCollection,

  events: {
    'click .ruleName': 'showRuleEditor',
    'change .status-toggle': 'toggleStatus',
    'click .delete-rule-icon': 'deleteRule',
    'click .remove-rules-button': 'deleteRules',
    'click .select-all-rules-checkbox': 'selectAllRules',
    'click .select-rule-checkbox': 'selectRule',
    'click .export-rules-button': 'exportRules',
    'click .import-rules-button': 'importRules',
    'click .share-rules-button': 'handleShareRulesButtonClicked'
  },

  initialize: function() {
    this.rulesCollection = new this.Collection();
    this.susiModal = new SusiModal();
    this.shareRulesModal = new ShareRulesModal({});

    this.registerListeners();
  },

  registerListeners: function() {
    // We don't need to listen on add event because rule is always created from editor
    // And on route change we always fetch the latest rules from DB
    this.listenTo(this.rulesCollection, 'loaded', this.render);
    this.listenTo(this.rulesCollection, 'change', this.render);
    this.listenTo(this.rulesCollection, 'remove', this.render);
    this.listenTo(this.rulesCollection, 'reset', this.render);

    this.shareRulesModal.on('modal:closed', this.saveSharedListName);
  },

  initWidgets: function() {
    this.$el = $(this.el);

    this.$el.find('.status-toggle').bootstrapToggle();
    this.$el.find('[data-toggle="tooltip"]').tooltip();
  },

  updateCollection: function() {
    this.rulesCollection.fetchRules();
  },

  getTemplate: function() {
    return RQ.Templates.RuleIndex;
  },

  getMarkup: function(template) {
    return template({
      rules: this.rulesCollection.toJSON(),
      user: RQ.currentUser.toJSON()
    });
  },

  render: function(options) {
    var markup,
      $el = $(this.el);

    options = options || {};

    if (options && options.update) {
      // updateCollection will trigger 'loaded' event which will render the view
      this.updateCollection(options);
    } else {
      this.template = this.getTemplate();

      markup = this.getMarkup(this.template);
      $el.html(markup);
    }

    this.initWidgets();
  },

  showRuleEditor: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      id = $ruleItemRow.data('id');

    RQ.router.navigate('/edit/' + id, { trigger: true });
  },

  toggleStatus: function(event) {
    var $ruleItemRow = $(event.currentTarget).parents('.rule-item-row'),
      ruleModel = this.rulesCollection.get($ruleItemRow.data('id'));

    return this.toggleRuleStatus(ruleModel);
  },

  toggleRuleStatus: function(ruleModel) {
    var ruleName = ruleModel.getName(),
      eventAction,
      ruleStatus;

    if (ruleModel.getStatus() === RQ.RULE_STATUS.ACTIVE) {
      ruleModel.setStatus(RQ.RULE_STATUS.INACTIVE);
      eventAction = RQ.GA_EVENTS.ACTIONS.DEACTIVATED;
    } else {
      ruleModel.setStatus(RQ.RULE_STATUS.ACTIVE);
      eventAction = RQ.GA_EVENTS.ACTIONS.ACTIVATED;
    }

    ruleStatus = ruleModel.getStatus();

    ruleModel.save({
      callback: function() {
        Notification.show('info', ruleName + ' is now ' + ruleStatus);
        RQ.Utils.submitEvent('rule', eventAction, ruleModel.getRuleType().toLowerCase() + ' rule ' + eventAction);
      }
    });
    return false;
  },

  deleteRule: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      ruleModel = this.rulesCollection.get($ruleItemRow.data('id'));

    return this.deleteRuleFromCollection(ruleModel);
  },

  deleteRules: function() {
    var selectedRules = this.getSelectedRules(),
      numSelectedRules = selectedRules.length;

    if (!numSelectedRules) {
      alert('Please select one or more rules to delete');
      return;
    }

    if (window.confirm(RQ.MESSAGES.DELETE_RULES)) {
      // Trigger the model remove routine for each selected rule
      selectedRules.forEach(function(rule) {
        rule.remove();
      });

      // Remove the selected rules from the collection
      this.rulesCollection.remove(selectedRules);

      // Show notification
      Notification.show('success', numSelectedRules + ' rules have been deleted!');

      RQ.Utils.submitEvent(
        'rules',
        RQ.GA_EVENTS.ACTIONS.DELETED,
        ['Multiple', 'rules', RQ.GA_EVENTS.ACTIONS.DELETED].join(' ')
      );
    }
  },

  deleteRuleFromCollection: function(ruleModel) {
    var that = this,
      ruleName = ruleModel.getName();

    if (window.confirm(RQ.MESSAGES.DELETE_RULES)) {
      that.rulesCollection.remove(ruleModel);
      ruleModel.remove({
        callback: function() {
          Notification.show('success', ruleName + ' has been deleted successfully!');

          RQ.Utils.submitEvent(
            'rule',
            RQ.GA_EVENTS.ACTIONS.DELETED,
            ruleModel.getRuleType().toLowerCase() + ' rule ' + RQ.GA_EVENTS.ACTIONS.DELETED
          );
        }
      });
    }

    return false;
  },

  selectAllRules: function(event) {
    var isChecked = $(event.currentTarget).is(':checked');
    $('.select-rule-checkbox').prop('checked', isChecked);
    $('.rule-item-row').toggleClass('selected', isChecked);
  },

  selectRule: function(event) {
    var $checkbox = $(event.currentTarget),
      isChecked = $checkbox.is(':checked');

    if (!isChecked) {
      $('.select-all-rules-checkbox').prop('checked', false);
    }
    $checkbox.closest('.rule-item-row').toggleClass('selected', isChecked);
  },

  getSelectedRules: function() {
    var $selectedRows = $('.select-rule-checkbox:checked').closest('.rule-item-row'),
      rules = [];

    _.each($selectedRows, function(row) {
      rules.push(this.getRuleFromRow(row));
    }, this);

    return rules;
  },

  getRuleFromRow: function(row) {
    var $row = $(row),
      ruleId = $row.data('id');

    return this.rulesCollection.get(ruleId);
  },

  exportRules: function() {
    var selectedRules = this.getSelectedRules(),
      rules = selectedRules.length ? selectedRules : this.rulesCollection.models;

    var rulesAttributes = _.pluck(rules, 'attributes');
    Backbone.trigger('file:save', JSON.stringify(rulesAttributes, null, 2), 'requestly_rules');

    RQ.Utils.submitEvent('rules', RQ.GA_EVENTS.ACTIONS.EXPORTED, 'Rules ' + RQ.GA_EVENTS.ACTIONS.EXPORTED);
  },

  importRules: function() {
    var that = this;
    Backbone.trigger('file:load', function(data) {
      var validRulesCount = 0,
        rules = JSON.parse(data);
      _.each(rules, function(rule) {
        var ruleModel = new BaseRuleModel(rule);
        if(ruleModel.isValid()) {
          validRulesCount++;
          // Update / add the rule to collection.
          that.rulesCollection.set(ruleModel, {remove: false, silent: true});
          ruleModel.save();
        }
      });

      // Show notification : depends on the number of rules imported
      if (rules.length == validRulesCount){
        Notification.show('success', 'All Rules Imported Successfully');
      } else if (validRulesCount == 0) {
        Notification.show('error', 'Imported Rules are invalid');
      } else {
        Notification.show('success', validRulesCount + ' out of ' + rules.length + ' rules imported successfully');
      }

      that.render();
      RQ.Utils.submitEvent('rules', RQ.GA_EVENTS.ACTIONS.IMPORTED, 'Rules ' + RQ.GA_EVENTS.ACTIONS.IMPORTED);
    });
  },

  showLoginModal: function() {
    this.susiModal.show();
  },

  handleShareRulesButtonClicked: function() {
    var that = this,
      authPromise = RQ.currentUser.checkUserAuthentication(),
      selectedRules,
      shareId = RQ.Utils.getId(),
      sharedUrl;

    authPromise.then(function(authData) {
      var currentUserSharedListsRef,
        userSharedListsDeferredObject;

      if (!authData) {
        that.showLoginModal();
      } else {
        selectedRules = _.pluck(that.getSelectedRules(), 'attributes');

        if (selectedRules.length === 0) {
          alert('Please select one or more rules to share');
          return;
        }

        currentUserSharedListsRef = RQ.currentUser.getUserSharedListsRef();
        userSharedListsDeferredObject = RQ.FirebaseUtils.getDeferredNodeValue(currentUserSharedListsRef, { 'once': true });

        userSharedListsDeferredObject.then(function(sharedLists) {
          if (_.keys(sharedLists).length >= RQ.LIMITS.NUMBER_SHARED_LISTS) {
            RQ.showModalView(new Modal(), {
              model: {
                heading: 'Limit Exceeded',
                content: RQ.MESSAGES.SHARED_LISTS_LIMIT_REACHED,
                cancelButton: true
              }
            });

            RQ.Utils.submitEvent(
              RQ.GA_EVENTS.CATEGORIES.SHARED_LIST,
              RQ.GA_EVENTS.ACTIONS.LIMIT_REACHED,
              'Shared List limit reached'
            );

            return;
          }

          sharedUrl = RQ.currentUser.createSharedList(shareId, selectedRules);
          that.saveSharedListName({ shareId: shareId });

          that.shareRulesModal.show({
            model: { shareId: shareId, sharedUrl: sharedUrl }
          });
        });
      }
    }).catch(function(error) {
      alert(RQ.MESSAGES.ERROR_AUTHENTICATION);
    });
  },

  saveSharedListName: function(shareData) {
    var sharedListName = shareData.listName || 'My Shared List',
      shareId = shareData.shareId;

    RQ.currentUser.setSharedListName(shareId, sharedListName);
  }
});
