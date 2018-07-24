import * as linter from 'sass-lint';

export default (configFile, files) => {
  const options = {};
  linter.outputResults(
    linter.lintFiles(files, options, configFile),
    options,
    configFile
  );
};