var SharedListCollection = Backbone.Collection.extend({
  model: SharedListModel,

  /**
   * Shared Lists are stored partially under User Node and partially under Public Node
   * Rules, access, isEnabled, shareId are under public Node
   * listName, shareId, creationDate are under user Node
   */
  fetchSharedLists: function() {
    var that = this,
      currentUserSharedListsRef = RQ.currentUser.getUserSharedListsRef();

    currentUserSharedListsRef.once('value', function(snapshot) {
      var list = snapshot.val(),
        deferredPublicSharedListsObjects = [];

      _.each(list, function(userSharedListObject) {
        // Set List Name and shareId from sharedList under User Node
        var listModel = new that.model(userSharedListObject),
          publicSharedListRef = RQ.currentUser.getPublicSharedListRef(userSharedListObject.shareId);

        listModel.set('id', userSharedListObject.shareId);
        listModel.set('sharedUrl', RQ.getSharedURL(userSharedListObject.shareId));
        listModel.set('creationDate', userSharedListObject.creationDate);

        that.add(listModel);

        deferredPublicSharedListsObjects.push(RQ.FirebaseUtils.getDeferredNodeValue(publicSharedListRef, { once: true }));
      });

      Promise
        .all(deferredPublicSharedListsObjects)
        .then(function(sharedListValues) {
          _.each(sharedListValues, function(publicSharedListObject) {
            var listModel = that.get(publicSharedListObject.shareId);

            listModel.set('isEnabled', publicSharedListObject.isEnabled);
          });

          that.trigger('loaded');
        })
        .catch(function(error) {
          alert('Error while fetching Shared List: ' + error);
        });
    }, function(error) {
      alert('Error fetching rules from sharedList: ' + error.code);
    });
  }
});
