import fs from 'fs'

/**
 * Updates the manifest for firefox,
 * with options that cause errors in chrome
 */
const updateManifestFireFox = () => {
  const distManifestPath = 'distribution/manifest.json'

  const originalManifest = JSON.parse(fs.readFileSync(distManifestPath, 'utf8'))

  const fireFoxSpecificSettings = {
    browser_specific_settings: {
      gecko: {
        id: 'binge-stream@s-weigand',
        strict_min_version: '67.0',
      },
    },
  }
  const updatedManifest = { ...originalManifest, ...fireFoxSpecificSettings }
  fs.writeFileSync(distManifestPath, JSON.stringify(updatedManifest))
}

updateManifestFireFox()
