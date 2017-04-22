const request = require('request')
const chalk = require('chalk')
const emoji = require('node-emoji')
const semverDiff = require('semver-diff')
const semver = require('semver')

module.exports = (dep, deps, showOnlyBugs) => {
  request(`http://registry.npmjs.org/${dep}`, (error, response, body) => {
    if (error) {
      console.log(
        chalk.red.bold(error)
      )
    }

    body = JSON.parse(body)
    const version = deps[dep].replace('^', '').replace('~', '')

    if (!semver.valid(version)) {

        if (showOnlyBugs) {
            return null
        }

        return console.log(
            emoji.get('warning'),
            " ",
            chalk.blue.bold(dep),
            `(${version})`,
            'Unsupported format, only works with full specific version'
        )
    }

    if (version.indexOf('git') > -1) {
      return console.log(
        emoji.get('disappointed'),
        chalk.blue.bold(dep),
        'Only support public packages from http://registry.npmjs.org'
      )
    }

    const patchVersions = {};

    Object.keys(body['versions']).forEach((versionFromRegistry) => {
        if ('patch' == semverDiff(version, versionFromRegistry)) {
            // Overwrite to get last patch in versionFromRegistry
            patchVersions[version] = versionFromRegistry
        }
    })

    if (Object.keys(patchVersions).length > 0) {
        return console.log(
            emoji.get('sos'),
            " ",
            chalk.red.bold(dep),
            `(${version})`,
            `There is a bug, update at least to last patch version (${chalk.red.bold(patchVersions[version])})`
        )
    }

    if (!showOnlyBugs) {
        return console.log(
            emoji.get('white_check_mark'),
            " ",
            chalk.green.bold(dep),
            `(${version})`
        )
    }
  })
}
