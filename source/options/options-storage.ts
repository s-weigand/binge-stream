import OptionsSync from 'webext-options-sync'

export default new OptionsSync({
  defaults: {
    colorRed: 244,
    colorGreen: 67,
    colorBlue: 54,
    username: 'default_user',
    password: '123',
  },
  migrations: [OptionsSync.migrations.removeUnused],
  logging: true,
})
