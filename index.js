#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const fs = require('fs')
const depChecker = require('./depChecker')

const envs = {
  dev: ['devDependencies'],
  prod: ['dependencies'],
  all: ['devDependencies', 'dependencies']
};

program
  .version('1.0.0')
  .description('SOS Dep Check')
  .option('--env <env>', 'envitorments to check', /^(dev|prod|all)$/i)
  .option('-b, --only-bugs', 'show only bugs')
  .parse(process.argv)

if (program.env === true) {
  console.log(chalk.red('Ups! Sorry, --env option can only be dev|prod|all'))
  process.exit(1)
}

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

if (!packageJson) {
  console.log(chalk.red('Execute the command in the folder where your package.json is.'))
  process.exit(1)
}

const environment = program.env ? program.env : 'all'
envs[environment].forEach((type) => {
  if (packageJson[type]) {
    const packages = packageJson[type]
    Object.keys(packages).forEach((dep) => depChecker(dep, packages, program.onlyBugs))
  }
})
