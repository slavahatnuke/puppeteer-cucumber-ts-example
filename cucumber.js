const common = `--exit --publish-quiet --require cucumber.setup.js --format @cucumber/pretty-formatter --require 'apps/**/*.feature.ts'`;

module.exports = {
  default: `${common} --tags "not @ignore"`,
};
