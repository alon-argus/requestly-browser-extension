var UserSettingsModel = BaseModel.extend({
  defaults: {
    profile: {
      email: '',
      password: '',
      profileImageURL: '',
      uid: ''
    },
    mode: 'signup',
    isLoggedIn: false
  },

  initialize: function() {

  },

  getProfile: function() {
    return this.get('profile');
  },

  setProfile: function(profile) {
    this.set('profile', profile);
  },

  createUser: function(successCallback, errorCallback) {
    var firebaseRef = this.getFirebaseRef(),
      profile = this.getProfile();

    firebaseRef.createUser({
      email: profile.email,
      password : profile.password
    }, function(error, authData) {
      if (!error) {
        firebaseRef.child('users')
          .child(authData.uid)
          .child('profile')
          .set({
            provider: authData.provider,
            email: authData.password.email,
            name: RQ.Utils.getName(authData),
            uid: authData.uid,
            profileImageURL: authData.password.profileImageURL
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