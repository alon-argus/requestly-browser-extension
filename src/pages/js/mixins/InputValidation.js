RQ.Mixins.InputValidation = {
  validateSourceField: function(operator, sourceField) {
    var errorMessage = null;

    if (!sourceField) {
      errorMessage = 'Error: Source Field can not be empty';
    }

    if (operator === RQ.RULE_OPERATORS.MATCHES && !RQ.Utils.isValidRegex(sourceField)) {
      errorMessage = 'Error: "' + sourceField + '" is not a valid regular expression';
    }

    if (operator === RQ.RULE_OPERATORS.EQUALS && !RQ.Utils.isValidUrl(sourceField)) {
      errorMessage = 'Error: Source Url should begin with a valid protocol (http: | https: | ftp:)'
    }

    if (errorMessage != null) {
      Notification.show('error', errorMessage);
      return false;
    }

    return true;
  },

  validateDestinationField: function(operator, destinationField) {
    var errorMessage = null;

    if (!destinationField) {
      errorMessage = 'Error: Destination Field can not be empty';
    }

    if ([RQ.RULE_OPERATORS.CONTAINS, RQ.RULE_OPERATORS.EQUALS].indexOf(operator) >=0
      && !RQ.Utils.isValidUrl(destinationField)) {
        errorMessage = 'Error: Destination Url should begin with a valid protocol (http: | https: | ftp:)'
    }

    if (errorMessage != null) {
      Notification.show('error', errorMessage);
      return false;
    }

    return true;
  },

  validateFieldNonEmpty: function(name, value) {
    if (_.isEmpty(value)) {
      Notification.show('error', 'Error: ' + name + ' Field can not be empty');
      return false;
    }
    return true;
  }
};