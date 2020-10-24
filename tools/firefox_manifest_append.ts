import fs from 'fs'

/**
 * Updates the manifest for firefox,
 * with options that cause errors in chrome
 */
const updateManifestFireFox = () => {
  const distManifestPath = 'distribution/manifest.json'

  const originalManifest = JSON.parse(fs.readFileSync(distManifestPath, 'utf8'))

  const fireFoxSpecifficSettings = {
    browser_specific_settings: {
      gecko: {
        id: '<your_addon_id_here>',
        strict_min_version: '67.0',
      },
    },
  }
  const updatedManifest = { ...originalManifest, ...fireFoxSpecifficSettings }
  fs.writeFileSync(distManifestPath, JSON.stringify(updatedManifest))
}

updateManifestFireFox()
