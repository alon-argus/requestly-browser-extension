this["RQ"] = this["RQ"] || {};
this["RQ"]["Templates"] = this["RQ"]["Templates"] || {};

Handlebars.registerPartial("AddPairCTA", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<button type=\"button\" class=\"right btn btn-link add-pair\">\r\n  <i class=\"left fa fa-plus-circle\"></i>\r\n  <span>New</span>\r\n</button>";
},"useData":true}));

Handlebars.registerPartial("DropdownButton", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\r\n  <span class=\"dropdown-value\" data-value=\"\">Select</span>\r\n  <span class=\"caret\"></span>\r\n</button>";
},"useData":true}));

Handlebars.registerPartial("PairsContainerHeading", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"title\">\r\n  <span>"
    + this.escapeExpression(((helper = (helper = helpers.heading || (depth0 != null ? depth0.heading : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"heading","hash":{},"data":data}) : helper)))
    + "</span>\r\n"
    + ((stack1 = this.invokePartial(partials.AddPairCTA,depth0,{"name":"AddPairCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</div>\r\n";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("RuleEditorHeader", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<nav class=\"content-header\">\r\n  <span>"
    + this.escapeExpression(((helper = (helper = helpers.heading || (depth0 != null ? depth0.heading : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"heading","hash":{},"data":data}) : helper)))
    + "</span>\r\n  <div class=\"right-corner-icongroup\">\r\n    <a class=\"fa fa-times close-editor\"></a>\r\n  </div>\r\n</nav>\r\n";
},"useData":true}));

Handlebars.registerPartial("RuleItemRow", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "<tr class=\"rule-item-row "
    + alias2((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),{"name":"toLowerCase","hash":{},"data":data}))
    + "\" data-id=\""
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n  <td class=\"rule-selection-cell\">\r\n    <input type=\"checkbox\" class=\"filled-in select-rule-checkbox\" id=\"filled-in-box-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" title=\"Select Rule\"/>\r\n    <label for=\"filled-in-box-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></label>\r\n  </td>\r\n\r\n  <td class=\"rule-badge-cell\">\r\n    <span class=\"rule-type badge\">"
    + alias2((helpers.charAt || (depth0 && depth0.charAt) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),0,{"name":"charAt","hash":{},"data":data}))
    + "</span>\r\n  </td>\r\n\r\n  <td class=\"rule-name-cell\">\r\n    <a class=\"ruleName\">"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\r\n    <div class=\"ruleDescription\">"
    + alias2(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\r\n  </td>\r\n\r\n  <td class=\"status-cell\"> "
    + ((stack1 = this.invokePartial(partials.StatusToggle,depth0,{"name":"StatusToggle","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + " </td>\r\n\r\n  <td>"
    + alias2((helpers.formatDate || (depth0 && depth0.formatDate) || alias1).call(depth0,(depth0 != null ? depth0.creationDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\r\n</tr>";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("RuleProperties", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"row\">\r\n  <div class=\"input-field name-container\">\r\n    <input type=\"text\" class=\"rule-name-input\" value=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\r\n    <label class=\"active\">Rule Name</label>\r\n  </div>\r\n  <div class=\"rule-status-container\">\r\n    <span class=\"title margin-r-0-5\">Status</span>\r\n"
    + ((stack1 = this.invokePartial(partials.StatusToggle,depth0,{"name":"StatusToggle","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"input-field description-container\">\r\n    <input type=\"text\" class=\"rule-description\" value=\""
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "\">\r\n    <label class=\"active\">Rule Description (Optional)</label>\r\n  </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("SaveRuleCTA", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "    <a class=\"btn btn-link close-editor\">Close</a>\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "    <a href=\"#\" class=\"btn btn-link\">Close</a>\r\n    <a class=\"btn save-rule\">Save</a>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"buttons-container\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isViewMode : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true}));

Handlebars.registerPartial("SharedListIndexToolbar", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"content-header\">\r\n  <span>Shared List</span>\r\n</nav>\r\n";
},"useData":true}));

Handlebars.registerPartial("SharedListItemRow", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr class=\"list-item-row\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n  <td class=\"list-name-cell\">"
    + alias3(((helper = (helper = helpers.listName || (depth0 != null ? depth0.listName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"listName","hash":{},"data":data}) : helper)))
    + "</td>\r\n\r\n  <td class=\"url-cell\"><a href=\""
    + alias3(((helper = (helper = helpers.sharedUrl || (depth0 != null ? depth0.sharedUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sharedUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + alias3(((helper = (helper = helpers.sharedUrl || (depth0 != null ? depth0.sharedUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sharedUrl","hash":{},"data":data}) : helper)))
    + "</a>  </td>\r\n\r\n  <td>"
    + alias3((helpers.formatDate || (depth0 && depth0.formatDate) || alias1).call(depth0,(depth0 != null ? depth0.creationDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\r\n</tr>";
},"useData":true}));

Handlebars.registerPartial("SharedRuleItemRow", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "<tr class=\"rule-item-row "
    + alias2((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),{"name":"toLowerCase","hash":{},"data":data}))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n  <td class=\"rule-badge-cell\">\r\n    <span class=\"rule-type badge\">"
    + alias2((helpers.charAt || (depth0 && depth0.charAt) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),0,{"name":"charAt","hash":{},"data":data}))
    + "</span>\r\n  </td>\r\n\r\n  <td class=\"rule-name-cell\">\r\n    <a class=\"ruleName\">"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\r\n    <div class=\"ruleDescription\">"
    + alias2(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\r\n  </td>\r\n\r\n  <td class=\"status-cell\"> "
    + alias2(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"status","hash":{},"data":data}) : helper)))
    + " </td>\r\n\r\n  <td>"
    + alias2((helpers.formatDate || (depth0 && depth0.formatDate) || alias1).call(depth0,(depth0 != null ? depth0.creationDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\r\n</tr>\r\n";
},"useData":true}));

Handlebars.registerPartial("SharedRulesIndexToolbar", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"content-header\">\r\n  <span>Shared Rules</span>\r\n  <div class=\"right right-corner-icongroup\">\r\n    <button class=\"import-rules-button action-button btn btn-primary\">Import List</button>\r\n  </div>\r\n</nav>\r\n";
},"useData":true}));

Handlebars.registerPartial("SourceField", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "selected";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div class=\"source-container\">\r\n  <label class=\"active\">Source</label>\r\n\r\n  <!-- Write the dropdown here -->\r\n  <div class=\"source-key-container\">\r\n    <div class=\"dropdown-container\">\r\n      <div class=\"dropdown\" data-key=\"source.key\">\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.DropdownButton,depth0,{"name":"DropdownButton","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n        <ul class=\"dropdown-menu\">\r\n          <li>\r\n            <a class=\"dropdown-option\"\r\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.URL",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.URL",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.key : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Url</a>\r\n          </li>\r\n          <li>\r\n            <a class=\"dropdown-option\"\r\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.HOST",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.HOST",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.key : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Host</a>\r\n          </li>\r\n          <li>\r\n            <a class=\"dropdown-option\"\r\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.PATH",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_KEYS.PATH",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.key : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Path</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"source-operator-container\">\r\n    <div class=\"dropdown-container\">\r\n      <div class=\"dropdown\" data-key=\"source.operator\">\r\n\r\n        <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\r\n          <span class=\"dropdown-value\" data-value=\"\">Select</span>\r\n          <span class=\"caret\"></span>\r\n        </button>\r\n\r\n        <ul class=\"dropdown-menu\">\r\n          <li>\r\n            <a class=\"dropdown-option\"\r\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.EQUALS",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.EQUALS",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Equals</a>\r\n          </li>\r\n          <li>\r\n            <a class=\"dropdown-option\"\r\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.CONTAINS",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.CONTAINS",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Contains</a>\r\n          </li>\r\n          <li>\r\n            <a class=\"dropdown-option\"\r\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.MATCHES",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.MATCHES",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Matches</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <input type=\"text\" class=\"form-control source-value-input\" data-key=\"source.value\" value=\""
    + alias2(this.lambda(((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.value : stack1), depth0))
    + "\" placeholder=\""
    + alias2(((helper = (helper = helpers.sourcePlaceholder || (depth0 != null ? depth0.sourcePlaceholder : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"sourcePlaceholder","hash":{},"data":data}) : helper)))
    + "\" />\r\n\r\n  <span class=\"fa fa-trash-o delete-pair action-icon\"></span>\r\n</div>";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("StatusToggle", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "checked";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span title=\"Click to toggle Rule Status\">\r\n  <input type=\"checkbox\" data-toggle=\"toggle\" class=\"status-toggle\" data-on=\"Active\" data-off=\"Inactive\"\r\n         "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.status : depth0),"Active",{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " />\r\n</span>";
},"useData":true}));

Handlebars.registerPartial("Toolbar", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "      <a class=\"btn-floating btn-small waves-effect waves-light blue export-rules-button action-button\"\r\n         data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Download Rules\">\r\n        <i class=\"fa fa-download\"></i>\r\n      </a>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<nav class=\"content-header\">\r\n  <span>Rules</span>\r\n  <div class=\"right right-corner-icongroup\">\r\n\r\n    <a href=\"#selectRule\" class=\"btn-floating btn-small btn-success waves-effect waves-light select-rule-button action-button\">\r\n      <i class=\"fa fa-plus\"></i>\r\n    </a>\r\n\r\n"
    + ((stack1 = (helpers.gt || (depth0 && depth0.gt) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.rules : depth0)) != null ? stack1.length : stack1),0,{"name":"gt","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    <a class=\"btn-floating btn-small waves-effect waves-light blue import-rules-button action-button\"\r\n       data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Upload Rules\">\r\n      <i class=\"fa fa-upload\"></i>\r\n    </a>\r\n\r\n    <a class=\"btn-floating btn-small waves-effect waves-light share-rules-button action-button\"\r\n       data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Share\">\r\n      <i class=\"fa fa-share-alt\"></i>\r\n    </a>\r\n\r\n    <a class=\"btn-floating btn-small waves-effect waves-light delete-rules-button action-button\"\r\n       data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Delete\">\r\n      <i class=\"fa fa-trash\"></i>\r\n    </a>\r\n\r\n  </div>\r\n</nav>\r\n";
},"useData":true}));

this["RQ"]["Templates"]["CancelRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + this.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "      </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Block/Cancel Network Requests"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n<section class=\"rule-body content-body\">\r\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Enter Keywords or Urls or Domains to be blocked"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "  <div class=\"pairs-container\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["HeadersRuleTemplate"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n          <div>\r\n\r\n            <div class=\"header-modification-type-container\">\r\n              <div class=\"dropdown-container\">\r\n                <div class=\"dropdown\" data-key=\"type\">\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.DropdownButton,depth0,{"name":"DropdownButton","data":data,"indent":"                  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n                  <ul class=\"dropdown-menu\">\r\n                    <li>\r\n                      <a class=\"dropdown-option\"\r\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.ADD",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.ADD",(depth0 != null ? depth0.type : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Add</a>\r\n                    </li>\r\n                    <li>\r\n                      <a class=\"dropdown-option\"\r\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.REMOVE",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.REMOVE",(depth0 != null ? depth0.type : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Remove</a>\r\n                    </li>\r\n                    <li>\r\n                      <a class=\"dropdown-option\"\r\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.MODIFY",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.MODIFY",(depth0 != null ? depth0.type : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Modify</a>\r\n                    </li>\r\n                  </ul>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"header-target-container\">\r\n              <div class=\"dropdown-container\">\r\n                <div class=\"dropdown\" data-key=\"target\">\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.DropdownButton,depth0,{"name":"DropdownButton","data":data,"indent":"                  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n                  <ul class=\"dropdown-menu\">\r\n                    <li>\r\n                      <a class=\"dropdown-option\"\r\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.REQUEST",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.REQUEST",(depth0 != null ? depth0.target : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Request</a>\r\n                    </li>\r\n                    <li>\r\n                      <a class=\"dropdown-option\"\r\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.RESPONSE",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\r\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.RESPONSE",(depth0 != null ? depth0.target : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Response</a>\r\n                    </li>\r\n                  </ul>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"input-group header-name-input-group\">\r\n              <span class=\"input-group-addon\">Header</span>\r\n              <input type=\"text\" class=\"form-control header-input\" data-key=\"header\" placeholder=\"Header Name\" value=\""
    + alias3(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"header","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n\r\n"
    + ((stack1 = (helpers.unequalsGlobalVar || (depth0 && depth0.unequalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.REMOVE",(depth0 != null ? depth0.type : depth0),{"name":"unequalsGlobalVar","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","hash":{"sourcePlaceholder":"Leave this field Empty to apply above modification to all urls"},"data":data,"indent":"          ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "        </div>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "selected";
},"4":function(depth0,helpers,partials,data) {
    var helper;

  return "              <div class=\"input-group header-value-input-group\">\r\n                <span class=\"input-group-addon\">Value</span>\r\n                <input type=\"text\" class=\"form-control value-input\" data-key=\"value\" placeholder=\"Header Value\" value=\""
    + this.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\"/>\r\n              </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Modify Headers in HTTP Request and Response"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n<section class=\"rule-body content-body\">\r\n\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Headers Modification Rules"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n  <div class=\"pairs-container\">\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>\r\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["Modal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "        <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\r\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <button type=\"button\" class=\"btn btn-link btn-primary\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.primaryButton : depth0)) != null ? stack1.name : stack1), depth0))
    + "</button>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"modal-dialog\">\r\n\r\n  <!-- Modal content-->\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <h4>"
    + alias3(((helper = (helper = helpers.heading || (depth0 != null ? depth0.heading : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"heading","hash":{},"data":data}) : helper)))
    + "</h4>\r\n    </div>\r\n\r\n    <div class=\"modal-body\">\r\n      <p>"
    + alias3(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\r\n    </div>\r\n\r\n    <div class=\"modal-footer text-right\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cancelButton : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.primaryButton : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n\r\n  </div> <!-- /modal-content -->\r\n</div>\r\n";
},"useData":true});

this["RQ"]["Templates"]["RedirectRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n        <div class=\"row\">\r\n          <div class=\"destination-container\">\r\n            <label class=\"active\">Destination</label>\r\n            <input type=\"url\" class=\"destination-url-input form-control\" data-key=\"destination\" value=\""
    + alias3(((helper = (helper = helpers.destination || (depth0 != null ? depth0.destination : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destination","hash":{},"data":data}) : helper)))
    + "\"\r\n                   placeholder=\""
    + alias3(((helper = (helper = helpers.destinationPlaceholder || (depth0 != null ? depth0.destinationPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destinationPlaceholder","hash":{},"data":data}) : helper)))
    + "\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Redirect Request Rule"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n<section class=\"rule-body content-body\">\r\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Source Destination Pairs"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n  <div class=\"pairs-container\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["ReplaceRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"from-to-container\">\r\n          <div class=\"input-group from-input-group\">\r\n            <span class=\"input-group-addon\">Replace</span>\r\n            <input type=\"text\" class=\"form-control from-input\" data-key=\"from\" placeholder=\"This part in URL\" value=\""
    + alias3(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"from","hash":{},"data":data}) : helper)))
    + "\">\r\n          </div>\r\n\r\n          <div class=\"input-group to-input-group\">\r\n            <span class=\"input-group-addon\">With</span>\r\n            <input type=\"text\" class=\"form-control to-input\" data-key=\"to\" placeholder=\"Will be replaced by this string\" value=\""
    + alias3(((helper = (helper = helpers.to || (depth0 != null ? depth0.to : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"to","hash":{},"data":data}) : helper)))
    + "\">\r\n          </div>\r\n        </div>\r\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","hash":{"sourcePlaceholder":"Leave this field Empty to apply above modification to all urls"},"data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "      </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Replace Host or some part of URL"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n<section class=\"rule-body content-body\">\r\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Pairs"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n  <div class=\"pairs-container\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["RuleCardsView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"content-header rq-dimgrey\">\r\n  <a href=\"#\" role=\"button\" class=\"back-button fa fa-chevron-left\" title=\"Go Back\"></a>\r\n  <span>Select Rule</span>\r\n</nav>\r\n\r\n<section class=\"rule-body content-body\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4 card-redirect-rule rule-card\" data-target=\"#new/Redirect\">\r\n      <div class=\"testimonial-card z-depth-1\">\r\n        <div class=\"card-up\">\r\n        </div>\r\n        <div class=\"avatar\">\r\n          <span class=\"img-circle img-responsive card-avatar-content\">R</span>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <h5>Redirect Request</h5>\r\n          <p><i class=\"fa fa-quote-left\"></i>Redirect a request URL</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-md-4 card-cancel-rule rule-card\" data-target=\"#new/Cancel\">\r\n      <div class=\"testimonial-card z-depth-1\">\r\n        <div class=\"card-up\">\r\n        </div>\r\n        <div class=\"avatar\">\r\n          <span class=\"img-circle img-responsive card-avatar-content\">C</span>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <h5>Cancel Request</h5>\r\n          <p><i class=\"fa fa-quote-left\"></i>Block Urls by specifying keywords or entire Urls</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-md-4 card-replace-rule rule-card\" data-target=\"#new/Replace\">\r\n      <div class=\"testimonial-card z-depth-1\">\r\n        <div class=\"card-up\">\r\n        </div>\r\n        <div class=\"avatar\">\r\n          <span class=\"img-circle img-responsive card-avatar-content\">R</span>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <h5>Replace Host</h5>\r\n          <p><i class=\"fa fa-quote-left\"></i>Replace parts of URL like hostname, query value</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4 card-headers-rule rule-card\" data-target=\"#new/headers\">\r\n      <div class=\"testimonial-card z-depth-1\">\r\n        <div class=\"card-up\">\r\n        </div>\r\n        <div class=\"avatar\">\r\n          <span class=\"img-circle img-responsive card-avatar-content\">H</span>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <h5>Modify Headers</h5>\r\n          <p><i class=\"fa fa-quote-left\"></i>Modify HTTP headers in request and response</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-md-4 card-useragent-rule rule-card\" data-target=\"#new/UserAgent\">\r\n      <div class=\"testimonial-card z-depth-1\">\r\n        <div class=\"card-up\">\r\n        </div>\r\n        <div class=\"avatar\">\r\n          <span class=\"img-circle img-responsive card-avatar-content\">U</span>\r\n        </div>\r\n        <div class=\"card-content\">\r\n          <h5>Override User-Agent</h5>\r\n          <p><i class=\"fa fa-quote-left\"></i>Emulate for different devices by varying user-agent header</p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n";
},"useData":true});

this["RQ"]["Templates"]["RuleIndex"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleItemRow,depth0,{"name":"RuleItemRow","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.Toolbar,depth0,{"name":"Toolbar","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n<section class=\"content-body\">\r\n  <table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n      <th class=\"rule-selection-cell\">\r\n        <input type=\"checkbox\" class=\"filled-in select-all-rules-checkbox\" id=\"select-all-rules-checkbox\" title=\"Select All\"/>\r\n        <label for=\"select-all-rules-checkbox\"></label>\r\n      </th>\r\n      <th> <span class=\"rules-number badge\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.rules : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span> </th>\r\n      <th>Name & Description</th>\r\n      <th class=\"status-cell\">Status</th>\r\n      <th>Created on</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.rules : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\r\n  </table>\r\n</section>\r\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["ShareRulesModal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        <div class=\"row\">\r\n          <div class=\"input-name-field col-md-2\"><strong>Public Url:</strong></div>\r\n          <div class=\"input-field col-md-10\">"
    + this.escapeExpression(((helper = (helper = helpers.sharedUrl || (depth0 != null ? depth0.sharedUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"sharedUrl","hash":{},"data":data}) : helper)))
    + "</div>\r\n        </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"modal-dialog\">\r\n\r\n  <!-- Modal content-->\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <h4><i class=\"fa fa-share-alt\"></i>Share Rules (Public Url)</h4>\r\n    </div>\r\n\r\n    <div class=\"modal-body\">\r\n      <div class=\"row\">\r\n        <div class=\"input-name-field col-md-2\"><strong>List Name:</strong></div>\r\n        <div class=\"input-field col-md-10\">\r\n          <input id=\"shared-list-name-field\" type=\"text\" placeholder=\"My Shared list\" data-key=\"listName\">\r\n        </div>\r\n      </div>\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.sharedUrl : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n\r\n    <div class=\"modal-footer\">\r\n      <div class=\"footer-note left\">\r\n        <h6 class=\"note\">Note: Anyone with this Url can view and import these rules.</h6>\r\n      </div>\r\n      <div class=\"cta-container right\">\r\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" data-event=\"modal:closed\">Close</button>\r\n      </div>\r\n    </div>\r\n\r\n  </div> <!-- modal-content -->\r\n</div>\r\n";
},"useData":true});

this["RQ"]["Templates"]["SharedListIndex"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedListItemRow,depth0,{"name":"SharedListItemRow","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedListIndexToolbar,depth0,{"name":"SharedListIndexToolbar","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n<section class=\"list-index content-body\">\r\n  <table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n      <th>Name</th>\r\n      <th>Link</th>\r\n      <th>Created on</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\r\n  </table>\r\n</section>\r\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["SharedRulesIndex"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedRuleItemRow,depth0,{"name":"SharedRuleItemRow","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedRulesIndexToolbar,depth0,{"name":"SharedRulesIndexToolbar","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n<section class=\"rule-index content-body\">\r\n  <table class=\"table\">\r\n    <thead>\r\n    <tr>\r\n      <th> <span class=\"rules-number badge\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.rules : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span> </th>\r\n      <th>Name & Description</th>\r\n      <th class=\"status-cell\">Status</th>\r\n      <th>Created on</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.rules : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\r\n  </table>\r\n</section>\r\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["SusiModal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "          "
    + this.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "          Please login with Google to share your rules with other users.\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"modal-dialog\">\r\n\r\n  <!-- Modal content-->\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <h4><i class=\"fa fa-user\"></i>Sign In</h4>\r\n    </div>\r\n\r\n    <div class=\"modal-body\">\r\n      <p>\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "      </p>\r\n    </div>\r\n\r\n    <div class=\"modal-footer text-right\">\r\n      <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\r\n      <a class=\"btn-sm-full gplus-bg rectangle waves-effect waves-light auth-provider\" data-provider=\"google\">\r\n        <i class=\"fa fa-google-plus\"></i>\r\n        <span>Sign In</span>\r\n      </a>\r\n    </div>\r\n\r\n  </div> <!-- /modal-content -->\r\n</div>\r\n";
},"useData":true});

this["RQ"]["Templates"]["UserAgentRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"row\">\r\n          <div class=\"destination-container\">\r\n            <label class=\"active\">"
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.HEADER_NAMES.USER_AGENT",{"name":"readGlobalVar","hash":{},"data":data}))
    + "</label>\r\n            <input type=\"text\" class=\"useragent-input form-control\" data-key=\"userAgent\" value=\""
    + alias3(((helper = (helper = helpers.userAgent || (depth0 != null ? depth0.userAgent : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"userAgent","hash":{},"data":data}) : helper)))
    + "\"\r\n                   placeholder=\"Enter user agent string\">\r\n          </div>\r\n        </div>\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","hash":{"sourcePlaceholder":"Leave this field Empty to apply above modification to all urls"},"data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "      </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Override User-Agent in HTTP Request"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n<section class=\"rule-body content-body\">\r\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Source User-Agent Pairs"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\r\n  <div class=\"pairs-container\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n\r\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});