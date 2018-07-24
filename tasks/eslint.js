/**
 * ESLint module
 * https://eslint.org/docs/1.0.0/developer-guide/nodejs-api
 */
import {readFileSync} from 'fs';
import {CLIEngine} from 'eslint';
import log from '../lib/log';

export default (configFile, files) => {
  const options = JSON.parse(readFileSync(configFile));
  const cli = new CLIEngine(options);
  const report = cli.executeOnFiles(files); 
  const formatter = cli.getFormatter();
  console.log(formatter(report.results));
  if(report.results.find(r => r.errorCount !== 0)){
    log.red("Task incomplete due to ESLint errors");
    process.exit();
  }
};
