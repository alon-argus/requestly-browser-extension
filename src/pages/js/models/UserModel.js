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
    this.registerBinders();
  },

  registerBinders: function() {
    this.handleUserAuthenticationChanged = this.handleUserAuthenticationChanged.bind(this);
  },

  checkUserAuthentication: function() {
    var firebaseRef = this.getFirebaseRef();
    firebaseRef.onAuth(this.handleUserAuthenticationChanged);
  },

  handleUserAuthenticationChanged: function(authData) {
    var firebaseRef = this.getFirebaseRef(),
      profile = this.getProfile(),
      provider;

    if (authData) {
      provider = authData.provider;

      profile.provider = provider;
      profile.uid = authData.uid;
      profile.displayName = authData[provider].displayName;
      profile.email = authData[provider].email;
      profile.profileImageURL = authData[provider].profileImageURL;

      firebaseRef.child('users')
        .child(authData.uid)
        .child('profile')
        .set(profile);

      this.setUserLoggedIn(true);
    }

    this.setProfile(_.clone(profile));
  },

  authenticateUser: function(provider, successCallback, errorCallback) {
    var firebaseRef = this.getFirebaseRef();

    firebaseRef.authWithOAuthRedirect(provider, function(error) {
      if (error) {
        errorCallback(error);
      }
    }, {
      scope: 'email'
    });
  },

  getProfile: function() {
    return this.get('profile');
  },

  setProfile: function(profile) {
    this.set('profile', profile);
  },

  setUserLoggedIn: function(isLoggedIn) {
    this.set('isLoggedIn', isLoggedIn);
  },

  getUserLoggedIn: function() {
    return this.get('isLoggedIn');
  },

  getFirebaseRef: function() {
    return RQ.getFirebaseRef();
  }
});