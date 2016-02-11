var BaseRuleEditorView = BaseView.extend({

  events: {
    'keyup .rule-name-input': 'updateRuleName',
    'change .status-toggle': 'updateRuleStatus',
    'keyup .rule-description': 'updateRuleDescription',
    'click .add-pair': 'addPair',
    'click .delete-pair': 'deletePair',
    'click .close-editor': 'closeEditor',
    'click .save-rule': 'saveRule',
    'click .dropdown .dropdown-option': 'handleDropdownValueChanged'
  },

  initWidgets: function() {
    this.$el.find('.status-toggle').bootstrapToggle();
    this.$el.find('[data-toggle="dropdown"]').dropdown();
    this.initDropdowns();
  },

  updateRuleName: function(event) {
    this.model.setName(event.target.value);
  },

  updateRuleStatus: function(event) {
    var status = $(event.currentTarget).is(':checked') ? RQ.RULE_STATUS.ACTIVE : RQ.RULE_STATUS.INACTIVE;
    this.model.setStatus(status);
  },

  updateRuleDescription: function(event) {
    this.model.setDescription(event.target.value);
  },

  addPair: function() {
    var newPair = this.model.getDefaultPair(),
      pairs = this.model.getPairs();

    pairs.push(newPair);
    this.render();
  },

  deletePair: function(event) {
    var $target = $(event.target),
      pairIndex = Number($target.parents('.pair-container').attr('data-index')),
      pairs = this.model.getPairs();

    pairs.splice(pairIndex, 1);
    this.render();
  },

  /**
   * If key is complex, e.g source.operator then drill down to leaf node and add the value to corresponding key
   *
   * @param pair
   * @param key
   * @param value
   * @returns Updated pair
   */
  updateFieldInPair: function(pair, key, value) {
    var nestedKeys = key.split('.'),
      index,
      currentNode = pair;

    // Reach the leaf node
    for (index = 0; index < nestedKeys.length - 1; index++) {
      currentNode = currentNode[ nestedKeys[index] ];
    }

    // Finally Set the value once we reach the leaf node
    currentNode[ nestedKeys[index] ] = value;

    return pair;
  },

  updateRulePair: function(event) {
    var $target = $(event.target),
      index = Number($target.parents('.pair-container').attr('data-index')),
      key = $target.attr('data-key'),
      pairs = this.model.getPairs();

    if (event.target.tagName === 'INPUT') {
      this.updateFieldInPair(pairs[index], key, event.target.value);
    }
  },

  updateDropdownSelectionState: function($dropdown) {
    $dropdown = $($dropdown);

    var $selectedOption = $dropdown.find('.dropdown-option[selected]'),
      $displayButton = $dropdown.find('.dropdown-toggle');

    $displayButton.find('.dropdown-value')
      .html($selectedOption.html())
      .attr('data-value', $selectedOption.attr('data-value'));
  },

  initDropdowns: function() {
    _.each(this.$el.find('.dropdown'), this.updateDropdownSelectionState, this);
  },

  handleDropdownValueChanged: function(event) {
    var $target = $(event.target),
      $dropdown = $target.parents('.dropdown'),
      index = Number($target.parents('.pair-container').attr('data-index')),
      key = $dropdown.attr('data-key'),
      pairs = this.model.getPairs();

    $dropdown.find('.dropdown-option').removeAttr('selected');
    $target.attr('selected', true);

    this.updateDropdownSelectionState($dropdown);
    this.updateFieldInPair(pairs[index], key, $target.attr('data-value'));
    this.render();
  },

  validateRule: function() {
    var ruleName = this.model.getName();

    if (!ruleName) {
      Backbone.trigger('notification', {
        className: 'rq-error',
        message: 'Error: Rule Name can not be empty'
      });

      return false;
    }

    return this.alsoValidate();
  },

  saveRule: function() {
    var ts = this.model.getTimestamp(),
      ruleName = this.model.getName(),
      eventAction = RQ.GA_EVENTS.ACTIONS.MODIFIED,
      that = this;

    // Set Creation date if not exists
    if (!this.model.hasCreationDate()) {
      eventAction = RQ.GA_EVENTS.ACTIONS.CREATED;
      this.model.setCreationDate(ts);
    }

    if (!this.validateRule()) {
      return false;
    }

    this.removeAdditionalFields();

    this.model.save({
      callback: function() {
        RQ.router.navigate('', { trigger: true });
        Backbone.trigger('notification', {
          className: 'rq-success',
          message: ruleName + ' has been saved successfully!!'
        });

        RQ.Utils.submitEvent('rule', eventAction, that.model.getRuleType().toLowerCase() + ' rule ' + eventAction);
      }
    });
  },

  closeEditor: function() {
    // In case of shared Rule Delete last part from current route -> rule Index inside the sharedList
    var route = this.isSharedRule()
      ? RQ.Utils.removeLastPart(Backbone.history.fragment, '/')
      : '';

    RQ.router.navigate(route, { trigger: true });
  },

  isSharedRule: function() {
    return this.model.get('isSharedRule');
  }
});