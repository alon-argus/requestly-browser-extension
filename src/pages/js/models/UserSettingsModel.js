var UserSettingsModel = BaseModel.extend({
  defaults: {
    user: {
      email: '',
      password: ''
    },
    mode: 'signup'
  }
});