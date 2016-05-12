this["RQ"] = this["RQ"] || {};
this["RQ"]["Templates"] = this["RQ"]["Templates"] || {};

Handlebars.registerPartial("AddPairCTA", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<button type=\"button\" class=\"right btn btn-link add-pair\">\n  <i class=\"left fa fa-plus-circle\"></i>\n  <span>New</span>\n</button>";
},"useData":true}));

Handlebars.registerPartial("DropdownButton", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\n  <span class=\"dropdown-value\" data-value=\"\">Select</span>\n  <span class=\"caret\"></span>\n</button>";
},"useData":true}));

Handlebars.registerPartial("PairsContainerHeading", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"title\">\n  <span>"
    + this.escapeExpression(((helper = (helper = helpers.heading || (depth0 != null ? depth0.heading : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"heading","hash":{},"data":data}) : helper)))
    + "</span>\n"
    + ((stack1 = this.invokePartial(partials.AddPairCTA,depth0,{"name":"AddPairCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("RuleEditorHeader", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<nav class=\"content-header\">\n  <span>"
    + this.escapeExpression(((helper = (helper = helpers.heading || (depth0 != null ? depth0.heading : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"heading","hash":{},"data":data}) : helper)))
    + "</span>\n  <div class=\"right-corner-icongroup\">\n    <a class=\"fa fa-times close-editor\"></a>\n  </div>\n</nav>\n";
},"useData":true}));

Handlebars.registerPartial("RuleItemRow", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "<tr class=\"rule-item-row "
    + alias2((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),{"name":"toLowerCase","hash":{},"data":data}))
    + "\" data-id=\""
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <td class=\"rule-selection-cell\">\n    <input type=\"checkbox\" class=\"filled-in select-rule-checkbox\" id=\"filled-in-box-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" title=\"Select Rule\"/>\n    <label for=\"filled-in-box-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></label>\n  </td>\n\n  <td class=\"rule-badge-cell\">\n    <span class=\"rule-type badge\">"
    + alias2((helpers.charAt || (depth0 && depth0.charAt) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),0,{"name":"charAt","hash":{},"data":data}))
    + "</span>\n  </td>\n\n  <td class=\"rule-name-cell\">\n    <a class=\"ruleName\">"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n    <div class=\"ruleDescription\">"
    + alias2(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\n  </td>\n\n  <td class=\"status-cell\"> "
    + ((stack1 = this.invokePartial(partials.StatusToggle,depth0,{"name":"StatusToggle","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + " </td>\n\n  <td>"
    + alias2((helpers.formatDate || (depth0 && depth0.formatDate) || alias1).call(depth0,(depth0 != null ? depth0.creationDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n\n  <td>\n    <span class=\"fa fa-trash delete-rule-icon action-icon\" title=\"Delete Rule\"></span>\n  </td>\n\n</tr>";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("RuleProperties", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"row\">\n  <div class=\"input-field name-container\">\n    <input type=\"text\" class=\"rule-name-input\" value=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n    <label class=\"active\">Rule Name</label>\n  </div>\n  <div class=\"rule-status-container\">\n    <span class=\"title margin-r-0-5\">Status</span>\n"
    + ((stack1 = this.invokePartial(partials.StatusToggle,depth0,{"name":"StatusToggle","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"input-field description-container\">\n    <input type=\"text\" class=\"rule-description\" value=\""
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "\">\n    <label class=\"active\">Rule Description (Optional)</label>\n  </div>\n</div>\n";
},"usePartial":true,"useData":true}));

Handlebars.registerPartial("SaveRuleCTA", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "    <a class=\"btn btn-link close-editor\">Close</a>\n";
},"3":function(depth0,helpers,partials,data) {
    return "    <a href=\"#\" class=\"btn btn-link\">Close</a>\n    <a class=\"btn save-rule\">Save</a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"buttons-container\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isViewMode : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}));

Handlebars.registerPartial("SharedListIndexToolbar", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"content-header\">\n  <span>Shared List</span>\n</nav>\n";
},"useData":true}));

Handlebars.registerPartial("SharedListItemRow", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr class=\"list-item-row\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n  <td class=\"list-name-cell\">"
    + alias3(((helper = (helper = helpers.listName || (depth0 != null ? depth0.listName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"listName","hash":{},"data":data}) : helper)))
    + "</td>\n\n  <td class=\"url-cell\"><a href=\""
    + alias3(((helper = (helper = helpers.sharedUrl || (depth0 != null ? depth0.sharedUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sharedUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + alias3(((helper = (helper = helpers.sharedUrl || (depth0 != null ? depth0.sharedUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sharedUrl","hash":{},"data":data}) : helper)))
    + "</a>  </td>\n\n  <td>"
    + alias3((helpers.formatDate || (depth0 && depth0.formatDate) || alias1).call(depth0,(depth0 != null ? depth0.creationDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n</tr>";
},"useData":true}));

Handlebars.registerPartial("SharedRuleItemRow", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "<tr class=\"rule-item-row "
    + alias2((helpers.toLowerCase || (depth0 && depth0.toLowerCase) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),{"name":"toLowerCase","hash":{},"data":data}))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n  <td class=\"rule-badge-cell\">\n    <span class=\"rule-type badge\">"
    + alias2((helpers.charAt || (depth0 && depth0.charAt) || alias1).call(depth0,(depth0 != null ? depth0.ruleType : depth0),0,{"name":"charAt","hash":{},"data":data}))
    + "</span>\n  </td>\n\n  <td class=\"rule-name-cell\">\n    <a class=\"ruleName\">"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n    <div class=\"ruleDescription\">"
    + alias2(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\n  </td>\n\n  <td class=\"status-cell\"> "
    + alias2(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"status","hash":{},"data":data}) : helper)))
    + " </td>\n\n  <td>"
    + alias2((helpers.formatDate || (depth0 && depth0.formatDate) || alias1).call(depth0,(depth0 != null ? depth0.creationDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\n</tr>\n";
},"useData":true}));

Handlebars.registerPartial("SharedRulesIndexToolbar", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"content-header\">\n  <span>Shared Rules</span>\n  <div class=\"right right-corner-icongroup\">\n    <button class=\"import-rules-button action-button btn btn-primary\">Import List</button>\n  </div>\n</nav>\n";
},"useData":true}));

Handlebars.registerPartial("SourceField", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "selected";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div class=\"source-container\">\n  <label class=\"active\">Source Url</label>\n\n  <div class=\"dropdown-container\">\n    <div class=\"dropdown\" data-key=\"source.operator\">\n\n      <button class=\"btn dropdown-toggle source-operator-select\" type=\"button\" data-toggle=\"dropdown\">\n        <span class=\"dropdown-value\" data-value=\"\">Select</span>\n        <span class=\"caret\"></span>\n      </button>\n\n      <ul class=\"dropdown-menu\">\n        <li>\n          <a class=\"dropdown-option\"\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.EQUALS",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.EQUALS",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Equals</a>\n        </li>\n        <li>\n          <a class=\"dropdown-option\"\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.CONTAINS",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.CONTAINS",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Contains</a>\n        </li>\n        <li>\n          <a class=\"dropdown-option\"\n               data-value=\""
    + alias2((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.MATCHES",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n               "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.RULE_OPERATORS.MATCHES",((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),{"name":"equalsGlobalVar","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Matches</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n\n  <input type=\"text\" class=\"form-control source-value-input\" data-key=\"source.value\" value=\""
    + alias2(this.lambda(((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.value : stack1), depth0))
    + "\" placeholder=\""
    + alias2(((helper = (helper = helpers.sourcePlaceholder || (depth0 != null ? depth0.sourcePlaceholder : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"sourcePlaceholder","hash":{},"data":data}) : helper)))
    + "\" />\n\n  <span class=\"fa fa-trash-o delete-pair action-icon\"></span>\n</div>";
},"useData":true}));

Handlebars.registerPartial("StatusToggle", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "checked";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span title=\"Click to toggle Rule Status\">\n  <input type=\"checkbox\" data-toggle=\"toggle\" class=\"status-toggle\" data-on=\"Active\" data-off=\"Inactive\"\n         "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.status : depth0),"Active",{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " />\n</span>";
},"useData":true}));

Handlebars.registerPartial("Toolbar", Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "      <a class=\"btn-floating btn-small waves-effect waves-light blue export-rules-button action-button\"\n         data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Download Rules\">\n        <i class=\"fa fa-download\"></i>\n      </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<nav class=\"content-header\">\n  <span>Rules</span>\n  <div class=\"right right-corner-icongroup\">\n\n    <a href=\"#selectRule\" class=\"btn-floating btn-small btn-success waves-effect waves-light select-rule-button action-button\">\n      <i class=\"fa fa-plus\"></i>\n    </a>\n\n"
    + ((stack1 = (helpers.gt || (depth0 && depth0.gt) || helpers.helperMissing).call(depth0,((stack1 = (depth0 != null ? depth0.rules : depth0)) != null ? stack1.length : stack1),0,{"name":"gt","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    <a class=\"btn-floating btn-small waves-effect waves-light blue import-rules-button action-button\"\n       data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Upload Rules\">\n      <i class=\"fa fa-upload\"></i>\n    </a>\n\n    <a class=\"btn-floating btn-small waves-effect waves-light share-rules-button action-button\"\n       data-toggle=\"tooltip\" data-placement=\"bottom\" data-original-title=\"Share\">\n      <i class=\"fa fa-share-alt\"></i>\n    </a>\n\n  </div>\n</nav>\n";
},"useData":true}));

this["RQ"]["Templates"]["CancelRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + this.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "      </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Block/Cancel Network Requests"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-body content-body\">\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Enter Keywords or Urls or Domains to be blocked"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "  <div class=\"pairs-container\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["HeadersRuleTemplate"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n          <div>\n\n            <div class=\"header-modification-type-container\">\n              <div class=\"dropdown-container\">\n                <div class=\"dropdown\" data-key=\"type\">\n\n"
    + ((stack1 = this.invokePartial(partials.DropdownButton,depth0,{"name":"DropdownButton","data":data,"indent":"                  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n                  <ul class=\"dropdown-menu\">\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.ADD",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.ADD",(depth0 != null ? depth0.type : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Add</a>\n                    </li>\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.REMOVE",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.REMOVE",(depth0 != null ? depth0.type : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Remove</a>\n                    </li>\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.MODIFY",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.MODIFY",(depth0 != null ? depth0.type : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Modify</a>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"header-target-container\">\n              <div class=\"dropdown-container\">\n                <div class=\"dropdown\" data-key=\"target\">\n\n"
    + ((stack1 = this.invokePartial(partials.DropdownButton,depth0,{"name":"DropdownButton","data":data,"indent":"                  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n                  <ul class=\"dropdown-menu\">\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.REQUEST",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.REQUEST",(depth0 != null ? depth0.target : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Request</a>\n                    </li>\n                    <li>\n                      <a class=\"dropdown-option\"\n                         data-value=\""
    + alias3((helpers.readGlobalVar || (depth0 && depth0.readGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.RESPONSE",{"name":"readGlobalVar","hash":{},"data":data}))
    + "\"\n                         "
    + ((stack1 = (helpers.equalsGlobalVar || (depth0 && depth0.equalsGlobalVar) || alias1).call(depth0,"RQ.HEADERS_TARGET.RESPONSE",(depth0 != null ? depth0.target : depth0),{"name":"equalsGlobalVar","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Response</a>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"input-group header-name-input-group\">\n              <span class=\"input-group-addon\">Header</span>\n              <input type=\"text\" class=\"form-control header-input\" data-key=\"header\" placeholder=\"Header Name\" value=\""
    + alias3(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"header","hash":{},"data":data}) : helper)))
    + "\">\n            </div>\n\n"
    + ((stack1 = (helpers.unequalsGlobalVar || (depth0 && depth0.unequalsGlobalVar) || alias1).call(depth0,"RQ.MODIFICATION_TYPES.REMOVE",(depth0 != null ? depth0.type : depth0),{"name":"unequalsGlobalVar","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","hash":{"sourcePlaceholder":"Leave this field Empty to apply above modification to all urls"},"data":data,"indent":"          ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "        </div>\n";
},"2":function(depth0,helpers,partials,data) {
    return "selected";
},"4":function(depth0,helpers,partials,data) {
    var helper;

  return "              <div class=\"input-group header-value-input-group\">\n                <span class=\"input-group-addon\">Value</span>\n                <input type=\"text\" class=\"form-control value-input\" data-key=\"value\" placeholder=\"Header Value\" value=\""
    + this.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\"/>\n              </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Modify Headers in HTTP Request and Response"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-body content-body\">\n\n\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Headers Modification Rules"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n  <div class=\"pairs-container\">\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["Modal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "        <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <button type=\"button\" class=\"btn btn-link btn-primary\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.primaryButton : depth0)) != null ? stack1.name : stack1), depth0))
    + "</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"modal-dialog\">\n\n  <!-- Modal content-->\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <h4>"
    + alias3(((helper = (helper = helpers.heading || (depth0 != null ? depth0.heading : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"heading","hash":{},"data":data}) : helper)))
    + "</h4>\n    </div>\n\n    <div class=\"modal-body\">\n      <p>"
    + alias3(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n\n    <div class=\"modal-footer text-right\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cancelButton : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.primaryButton : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n  </div> <!-- /modal-content -->\n</div>\n";
},"useData":true});

this["RQ"]["Templates"]["RedirectRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n        <div class=\"row\">\n          <div class=\"destination-container\">\n            <label class=\"active\">Destination</label>\n            <input type=\"url\" class=\"destination-url-input form-control\" data-key=\"destination\" value=\""
    + alias3(((helper = (helper = helpers.destination || (depth0 != null ? depth0.destination : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destination","hash":{},"data":data}) : helper)))
    + "\"\n                   placeholder=\""
    + alias3(((helper = (helper = helpers.destinationPlaceholder || (depth0 != null ? depth0.destinationPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destinationPlaceholder","hash":{},"data":data}) : helper)))
    + "\">\n          </div>\n        </div>\n      </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Redirect Request Rule"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-body content-body\">\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Source Destination Pairs"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n  <div class=\"pairs-container\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["ReplaceRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"from-to-container\">\n          <div class=\"input-group from-input-group\">\n            <span class=\"input-group-addon\">Replace</span>\n            <input type=\"text\" class=\"form-control from-input\" data-key=\"from\" placeholder=\"This part in URL\" value=\""
    + alias3(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"from","hash":{},"data":data}) : helper)))
    + "\">\n          </div>\n\n          <div class=\"input-group to-input-group\">\n            <span class=\"input-group-addon\">With</span>\n            <input type=\"text\" class=\"form-control to-input\" data-key=\"to\" placeholder=\"Will be replaced by this string\" value=\""
    + alias3(((helper = (helper = helpers.to || (depth0 != null ? depth0.to : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"to","hash":{},"data":data}) : helper)))
    + "\">\n          </div>\n        </div>\n"
    + ((stack1 = this.invokePartial(partials.SourceField,depth0,{"name":"SourceField","hash":{"sourcePlaceholder":"Leave this field Empty to apply above modification to all urls"},"data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "      </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleEditorHeader,depth0,{"name":"RuleEditorHeader","hash":{"heading":"Replace Host or some part of URL"},"data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-body content-body\">\n"
    + ((stack1 = this.invokePartial(partials.RuleProperties,depth0,{"name":"RuleProperties","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = this.invokePartial(partials.PairsContainerHeading,depth0,{"name":"PairsContainerHeading","hash":{"heading":"Pairs"},"data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n  <div class=\"pairs-container\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n"
    + ((stack1 = this.invokePartial(partials.SaveRuleCTA,depth0,{"name":"SaveRuleCTA","data":data,"indent":"  ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["RuleCardsView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"content-header rq-dimgrey\">\n  <a href=\"#\" role=\"button\" class=\"back-button fa fa-chevron-left\" title=\"Go Back\"></a>\n  <span>Select Rule</span>\n</nav>\n\n<section class=\"rule-body content-body\">\n  <div class=\"row\">\n    <div class=\"col-md-6 card-redirect-rule rule-card\" data-target=\"#new/Redirect\">\n      <div class=\"testimonial-card z-depth-1\">\n        <div class=\"card-up\">\n        </div>\n        <div class=\"avatar\">\n          <span class=\"img-circle img-responsive card-avatar-content\">R</span>\n        </div>\n        <div class=\"card-content\">\n          <h5>Redirect Request</h5>\n          <p><i class=\"fa fa-quote-left\"></i>Redirect a request URL</p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-md-6 card-cancel-rule rule-card\" data-target=\"#new/Cancel\">\n      <div class=\"testimonial-card z-depth-1\">\n        <div class=\"card-up\">\n        </div>\n        <div class=\"avatar\">\n          <span class=\"img-circle img-responsive card-avatar-content\">C</span>\n        </div>\n        <div class=\"card-content\">\n          <h5>Cancel Request</h5>\n          <p><i class=\"fa fa-quote-left\"></i>Block Urls by specifying keywords or entire Urls</p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-md-6 card-replace-rule rule-card\" data-target=\"#new/Replace\">\n      <div class=\"testimonial-card z-depth-1\">\n        <div class=\"card-up\">\n        </div>\n        <div class=\"avatar\">\n          <span class=\"img-circle img-responsive card-avatar-content\">R</span>\n        </div>\n        <div class=\"card-content\">\n          <h5>Replace Host</h5>\n          <p><i class=\"fa fa-quote-left\"></i>Replace parts of URL like hostname, query value</p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-md-6 card-headers-rule rule-card\" data-target=\"#new/headers\">\n      <div class=\"testimonial-card z-depth-1\">\n        <div class=\"card-up\">\n        </div>\n        <div class=\"avatar\">\n          <span class=\"img-circle img-responsive card-avatar-content\">H</span>\n        </div>\n        <div class=\"card-content\">\n          <h5>Modify Headers</h5>\n          <p><i class=\"fa fa-quote-left\"></i>Modify HTTP headers in request and response</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n";
},"useData":true});

this["RQ"]["Templates"]["RuleIndex"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.RuleItemRow,depth0,{"name":"RuleItemRow","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.Toolbar,depth0,{"name":"Toolbar","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"content-body\">\n  <table class=\"table\">\n    <thead>\n    <tr>\n      <th class=\"rule-selection-cell\">\n        <input type=\"checkbox\" class=\"filled-in select-all-rules-checkbox\" id=\"select-all-rules-checkbox\" title=\"Select All\"/>\n        <label for=\"select-all-rules-checkbox\"></label>\n      </th>\n      <th> <span class=\"rules-number badge\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.rules : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span> </th>\n      <th>Name & Description</th>\n      <th class=\"status-cell\">Status</th>\n      <th>Created on</th>\n      <th></th>\n    </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.rules : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</section>\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["ShareRulesModal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        <div class=\"row\">\n          <div class=\"input-name-field col-md-2\"><strong>Public Url:</strong></div>\n          <div class=\"input-field col-md-10\">"
    + this.escapeExpression(((helper = (helper = helpers.sharedUrl || (depth0 != null ? depth0.sharedUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"sharedUrl","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"modal-dialog\">\n\n  <!-- Modal content-->\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <h4><i class=\"fa fa-share-alt\"></i>Share Rules (Public Url)</h4>\n    </div>\n\n    <div class=\"modal-body\">\n      <div class=\"row\">\n        <div class=\"input-name-field col-md-2\"><strong>List Name:</strong></div>\n        <div class=\"input-field col-md-10\">\n          <input id=\"shared-list-name-field\" type=\"text\" placeholder=\"My Shared list\" data-key=\"listName\">\n        </div>\n      </div>\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.sharedUrl : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n    <div class=\"modal-footer\">\n      <div class=\"footer-note left\">\n        <h6 class=\"note\">Note: Anyone with this Url can view and import these rules.</h6>\n      </div>\n      <div class=\"cta-container right\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" data-event=\"modal:closed\">Close</button>\n      </div>\n    </div>\n\n  </div> <!-- modal-content -->\n</div>\n";
},"useData":true});

this["RQ"]["Templates"]["SharedListIndex"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedListItemRow,depth0,{"name":"SharedListItemRow","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedListIndexToolbar,depth0,{"name":"SharedListIndexToolbar","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"list-index content-body\">\n  <table class=\"table\">\n    <thead>\n    <tr>\n      <th>Name</th>\n      <th>Link</th>\n      <th>Created on</th>\n    </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</section>\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["SharedRulesIndex"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedRuleItemRow,depth0,{"name":"SharedRuleItemRow","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.SharedRulesIndexToolbar,depth0,{"name":"SharedRulesIndexToolbar","data":data,"helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "\n<section class=\"rule-index content-body\">\n  <table class=\"table\">\n    <thead>\n    <tr>\n      <th> <span class=\"rules-number badge\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.rules : depth0)) != null ? stack1.length : stack1), depth0))
    + "</span> </th>\n      <th>Name & Description</th>\n      <th class=\"status-cell\">Status</th>\n      <th>Created on</th>\n    </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.rules : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</section>\n";
},"usePartial":true,"useData":true});

this["RQ"]["Templates"]["SusiModal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "          "
    + this.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(depth0,helpers,partials,data) {
    return "          Please login with Google to share your rules with other users.\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"modal-dialog\">\n\n  <!-- Modal content-->\n  <div class=\"modal-content\">\n    <div class=\"modal-header\">\n      <h4><i class=\"fa fa-user\"></i>Sign In</h4>\n    </div>\n\n    <div class=\"modal-body\">\n      <p>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.content : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "      </p>\n    </div>\n\n    <div class=\"modal-footer text-right\">\n      <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\n      <a class=\"btn-sm-full gplus-bg rectangle waves-effect waves-light auth-provider\" data-provider=\"google\">\n        <i class=\"fa fa-google-plus\"></i>\n        <span>Sign In</span>\n      </a>\n    </div>\n\n  </div> <!-- /modal-content -->\n</div>\n";
},"useData":true});