'use strict'
/**
 * (!) Работает только при наличии CI/CD
 *
 * Настройки для CI/CD смотреть в сниппетах https://git.dclouds.ru/vue/dc-vue-preset/-/snippets/3
 *
 * Вспомогательные статьи по настройке плагина
 * https://semantic-release.gitbook.io/semantic-release/
 * https://levelup.gitconnected.com/semantic-versioning-and-release-automation-on-gitlab-9ba16af0c21
 */

const writerOpts = require('./.gitlab/changelog/config/writerOpts')
const parserOpts = require('./.gitlab/changelog/config/parserOpts')
const recommendedBumpOpts = require('./.gitlab/changelog/config/recommendedBumpOpts')
const releaseRules = require('./.gitlab/changelog/config/extendReleaseRules')

module.exports = {
  branches: [
    { name: "main" },
    { name: "release" }
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        /**
         * Полная документация ниже по ссылке
         * https://github.com/semantic-release/release-notes-generator#options
         */
        conventionalChangelog: {
          parserOpts,
          writerOpts
        },
        parserOpts,
        writerOpts,
        recommendedBumpOpts
      }
    ],
    [
      "@semantic-release/changelog",
      {
        changelogTitle: "# Changelog\n\nAll notable changes to this project will be documented in this file. See\n[Conventional Commits](https://conventionalcommits.org) for commit guidelines.\n\n[Digital Clouds Conventional Commits](CONTRIBUTING.md#git)"
      }
    ],
    [
      "@semantic-release/git",
      {
        message: "chore: Release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
