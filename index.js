import eslintTask from './tasks/eslint';
import sasslintTask from './tasks/sasslint';
import rollupTask from './tasks/rollup';
import uglifyTask from './tasks/uglify';
import babelTask from './tasks/babel';
import sassTask from './tasks/sass';
import cleanTask from './tasks/clean';
import log from './lib/log';

/**
 * Register tasks here
 */
const tasks = {
  eslint: params => eslintTask(
    params.eslint.configFile,
    params.eslint.files
  ),
  sasslint: params => sasslintTask(
    params.sasslint.configFile,
    params.sasslint.files
  ),
  rollup: params => rollupTask(params.rollup.configFile),
  uglify: params => uglifyTask(
    params.uglify.inputFile,
    params.uglify.outputFile
  ),
  babel: params => babelTask(
    params.babel.configFile,
    params.babel.inputFile,
    params.babel.outputFile
  ),
  sass: params => sassTask(params.sass.configFile),
  clean: params => cleanTask(params.clean.files),
  build: params => new Promise(async (resolve, reject) => {
    try {
      //JS lint
      tasks.eslint(params);

      //SCSS lint
      tasks.sasslint(params);
      
      //Clean dist folder
      tasks.clean(params);
      
      //JS bundler
      await tasks.rollup(params);

      //JS minifier
      tasks.uglify(params);

      //ESnext to ES5 (babel already minifies here)
      tasks.babel(params);
      
      //SCSS to CSS
      tasks.sass(params);

      //If everything goes ok, then resolve the promise
      resolve();
    } catch(error) {
      reject(error);
    }
  }),
};

/**
 * Executes the task
 * @param {array} args arguments passed in the command line
 */
const taskrunner = params => {
  if(!params.taskName) {
    log.red("No task as parameter");
    return;
  }
  if(!tasks[params.taskName]) {
    log.yellow(`Task '${params.taskName}' not registered`);
    return;
  }

  console.time(params.taskName);
  let result = tasks[params.taskName](params);
  if(result instanceof Promise) {
    result
      .then(() => {
        console.timeEnd(params.taskName);
        log.green("Task done successfully");
      })
      .catch(error => {
        console.timeEnd(params.taskName);
        log.red(error);
      });
    return;
  }
  console.timeEnd(params.taskName);
  log.green("Task done successfully");
};

/**
 * Exposes the taskrunner
 */
export default params => taskrunner(params);