import fs from 'fs';
import {minify} from 'uglify-es';
import log from '../lib/log';

export default (input, output) => {
  const result = minify(fs.readFileSync(input, "utf8"));
  if(result.error) {
    log.red("Task incomplete due to error on UglifyJS.minify \n");
    log.yellow(result.error);
    process.exit();
  }
  fs.closeSync(fs.openSync(output, 'w'));
  fs.writeFileSync(output, result.code);
};