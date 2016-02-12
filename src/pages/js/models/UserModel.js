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
    this.firebaseRef = RQ.getFirebaseRef();
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

      firebaseRef.child(RQ.FIREBASE_NODES.PUBLIC)
        .child(authData.uid)
        .child('profile')
        .set(profile);

      this.setUserLoggedIn(true);
    }

    this.setProfile(_.clone(profile));
  },

  createSharedList: function(shareId, rules) {
    var listRef = this.getSharedListRef(shareId);

    // Set uid of owner in access node
    listRef.set({
      access: {
        owner: this.getProfile().uid
      },
      rules: rules,
      isEnabled: true
    });

    return RQ.WEB_URL + '#sharedList/' + shareId;
  },

  setSharedListName: function(shareId, listName) {
    var currentUserRef = this.getCurrentUserNodeRef();

    currentUserRef
      .child(RQ.FIREBASE_NODES.SHARED_LISTS)
      .child(shareId)
      .set({ listName: listName });
  },

  authenticateUser: function(provider, errorCallback) {
    var firebaseRef = this.getFirebaseRef();

    firebaseRef.authWithOAuthRedirect(provider, errorCallback, {
      scope: 'email'
    });
  },

  signOut: function() {
    this.firebaseRef.unauth();
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
  },

  getCurrentUserNodeRef: function() {
    var firebaseRef = this.getFirebaseRef();

    return this.getProfile().uid
      ? firebaseRef
        .child('users')
        .child(this.getProfile().uid)
      : null;
  },

  getSharedListRef: function(sharedListId) {
    var fireBaseRef = this.getFirebaseRef();

    return fireBaseRef
      .child(RQ.FIREBASE_NODES.PUBLIC)
      .child(RQ.FIREBASE_NODES.SHARED_LISTS)
      .child(sharedListId);
  }
});