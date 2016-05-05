var BaseRuleModel = BaseModel.extend({
  defaults: function() {
    return {
      name: '',
      description: '',
      ruleType: '',
      status: RQ.RULE_STATUS.ACTIVE,
      creationDate: ''
    }
  },

  getDefaultSource: function() {
    return {
      key: RQ.RULE_KEYS.URL,
      operator: RQ.RULE_OPERATORS.CONTAINS,
      value: ''
    };
  },

  initialize: function() {
    this.transformAttributes();
  },

  /**
   * To-be overridden by child
   */
  transformAttributes: function() { /* No Op */},

  /**
   * Adds default Source to rule pairs whenever not present
   * @returns {boolean} true if Source is added to any of the pairs
   */
  insertDefaultSourceInPairs: function() {
    var pairs = this.getPairs(),
      isSourceAdded = false;

    _.each(pairs, function(pair) {
      if (typeof pair.source === 'undefined') {
        pair.source = this.getDefaultSource();
        isSourceAdded = true;
      }
    }, this);

    return isSourceAdded;
  },

  setId: function(id) {
    this.set('id', id, { silent: true });
  },

  getId: function() {
    return this.get('id');
  },

  getVersion: function() {
    return this.get('version');
  },

  setVersion: function(v) {
    return this.set('version', v, { silent: true });
  },

  generateId: function() {
    var creationDate = this.hasCreationDate() ? this.getCreationDate() : this.getTimestamp(),
      id = this.getRuleType() + '_' + creationDate;

    this.setId(id);
    return id;
  },

  getName: function() {
    return this.get('name');
  },

  setName: function(name) {
    this.set('name', name);
  },

  getDescription: function() {
    return this.get('description');
  },

  setDescription: function(des) {
    this.set('description', des);
  },

  getTimestamp: function() {
    return Date.now();
  },

  getTimestampFromId: function() {
    return this.getId().split('_')[1];
  },

  setCreationDate: function(date) {
    this.set('creationDate', date);
  },

  getCreationDate: function() {
    return this.get('creationDate');
  },

  hasCreationDate: function() {
    return typeof this.get('creationDate') !== 'undefined' && this.get('creationDate');
  },

  getRuleType: function() {
    return this.get('ruleType');
  },

  setRuleType: function(ruleType) {
    this.set('ruleType', ruleType);
  },

  getStatus: function() {
    return this.get('status');
  },

  setStatus: function(status) {
    this.set('status', status, { silent: true });
  },

  getPairs: function() {
    return this.get('pairs');
  },

  setPair: function(index, pair) {
    var pairs = this.getPairs();
    pairs[index] = pair;
  },

  save: function(options) {
    var id = this.getId(),
      storageObject = {},
      storageService = this.getStorageService();

    if (!id) {
      id = this.generateId();
    }

    storageObject[id] = this.toJSON();

    options = options || {};
    options.callback = options.callback || function() {
      console.log('Object saved');
    };

    storageService.saveRecord(storageObject, options.callback);
  },

  isValid: function() {
    var ruleName = this.getName(),
      ruleType = this.getRuleType();

    if (!ruleName || !ruleType) {
      return false;
    }

    if (!RQ.RULE_TYPES.hasOwnProperty(ruleType.toUpperCase())) {
      return false;
    }

    return true;
  },

  remove: function(options) {
    var id = this.getId(),
      storageService = this.getStorageService();

    options = options || {};
    options.callback = options.callback || function() {
      console.log('Object removed');
    };

    storageService.removeRecord(id, options.callback);
  }
});