var UserModel = BaseModel.extend({
  defaults: {
    profile: {
      provider: '',
      uid: '',
      displayName: '',
      email: '',
      profileImageURL: ''
    },
    isLoggedIn: false
  },

  initialize: function() {

  },

  getProfile: function() {
    return this.get('profile');
  },

  authenticateUser: function(provider, successCallback, errorCallback) {
    var firebaseRef = this.getFirebaseRef(),
      profile = this.getProfile();

    firebaseRef.authWithOAuthPopup(provider, function(error, authData) {
      if (!error) {
        firebaseRef.child('users')
          .child(authData.uid)
          .child('profile')
          .set({
            provider: authData.provider,
            uid: authData.uid,
            displayName: authData[provider].displayName,
            email: authData[provider].email,
            profileImageURL: authData[provider].profileImageURL
          });

        profile.email = authData.password.email;
        profile.uid = authData.uid;

        successCallback();
      } else {
        errorCallback(error);
      }
    });
  },

  getFirebaseRef: function() {
    return RQ.getFirebaseRef();
  }
});