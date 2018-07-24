import fs from 'fs';
import nodeSass from 'node-sass';
import mkdirpath from '../lib/mkdir';
import log from '../lib/log';

export default configFile => {
  const options = JSON.parse(fs.readFileSync(configFile));
  nodeSass.render(options, function(err, result) {
    if(err) {
      log.red("Task incomplete due to error on sass rendering \n");
      log.yellow(err);
      process.exit();
    }
    if(fs.existsSync(options.output)){
      fs.unlinkSync(options.output);
    }
    mkdirpath(options.output);
    fs.writeFile(options.output, result.css, { flag: 'wx' }, function(err){
      if(err) {
        log.red("Task incomplete due to error on sass writing \n");
        log.yellow(err);
        process.exit();
      }
    });
  });
};
