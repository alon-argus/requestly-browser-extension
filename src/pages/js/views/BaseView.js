var BaseView = Backbone.View.extend({
  Mixins: [],

  Model: Backbone.Model,

  /**
   * loadModel: loads model and binds to the view
   * @param modelOrData Backbone Model instance or just a backbone model
   */
  loadModel: function(modelOrData) {
    if (modelOrData instanceof Backbone.Model) {
      this.model = modelOrData;
    } else {
      this.model = new this.Model(modelOrData);
    }
  },

  loadMixin: function(mixin) {
    _.extend(this, mixin);
  },

  loadMixins: function(mixins) {
    _.each(mixins, this.loadMixin, this);
  },

  initialize: function(options) {
    options = options || {};
    this.loadModel(options.model);
    this.loadMixins(this.Mixins);
    this.alsoInitialize();
  },

  render: function(options) {
    options = options || {};

    // Load the passed model and use it to render the view
    if (options.model) {
      this.loadModel(options.model);
    }

    /* If template is not passed as option,
     every editor view has to provide its own template by getTemplate method */
    this.template = options.template || this.getTemplate();

    var markup = this.getMarkup(this.template);

    this.$el.html(markup);

    this.initWidgets();
  },

  getMarkup: function(template) {
    return template(this.model.toJSON());
  },

  // To be overridden by inheriting component
  alsoValidate: function() { return true; },

  removeAdditionalFields: function() { /* No Op */ },

  alsoInitialize: function() { /* No Op */ },

  initWidgets: function() { /* No Op */ }
});