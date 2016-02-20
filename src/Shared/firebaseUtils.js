var RQ = RQ || {};
RQ.FirebaseUtils = RQ.FirebaseUtils || {};

RQ.FirebaseUtils.getName = function(authData) {
  switch(authData.provider) {
    case 'password':
      return authData.password.email.replace(/@.*/, '');
    case 'twitter':
      return authData.twitter.displayName;
    case 'facebook':
      return authData.facebook.displayName;
  }
};

RQ.FirebaseUtils.getDeferredNodeValue = function(nodeRef, options) {
  return new Promise(function(resolve, reject) {
    var method = typeof options.once !== 'undefined' ? 'once' : 'on';

    nodeRef[method].call(nodeRef, 'value', function(snapshot) {
      resolve(snapshot.val());
    });
  });
};
