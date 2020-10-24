import OptionsSync from 'webext-options-sync'

export default new OptionsSync({
  defaults: {
    'netflix-skip-recap': true,
    'netflix-skip-intro': true,
    'amazon-skip-recap': true,
    'amazon-skip-intro': true,
    'amazon-skip-ad': true,
  },
  migrations: [OptionsSync.migrations.removeUnused],
  logging: true,
})
