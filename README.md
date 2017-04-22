# :sos: sos-dep-checker

Command-line tool to detect bugs in your dependencies versions.

Detect bugs in your dependencies based on [Semver](http://semver.org).

The ideal case is you update your dependencies to last version but sometimes
is hard because include breaking changes and maybe you do not want include
new features. Anyway you should update your dependencies at least to last patch version.

Note: PATCH version when you make backwards-compatible bug fixes.

## Install

```
$ npm install sos-dep-checker -g
```

## Usage

Go to the root folder of your project, where your `package.json` is and run:

```
$ sos-dep-checker
```

There are some options available:

Use `--env prod` to only check `dependencies`

```
$ sos-dep-checker --env prod
```

Use `--env dev` to only check `devDependencies`

```
$ sos-dep-checker --env dev
```

As well you can add the option `--only-bugs` to show only bugs.

If you run it with no options, `sos-dep-checker` will check all.

## Suggestions

If you want to check outdate dependencies check this tool: [esdeps](https://github.com/aganglada/esdeps)

## Screenshots

Command `sos-dep-checker`, `sos-dep-checker --env prod`:

![sos-dep-checker](https://image.ibb.co/jehxbQ/screen1.png)

Command `sos-dep-checker --env prod --only-bugs`:

![sos-dep-checker --env prod --only-bugs](https://image.ibb.co/mXESbQ/screen2.png)