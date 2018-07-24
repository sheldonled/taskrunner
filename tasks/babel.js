import {transformFileSync} from 'babel-core';
import fs from 'fs';

export default (configFile, input, output) => {
  const options = JSON.parse(fs.readFileSync(configFile));

  const result = transformFileSync(input, options);
  fs.closeSync(fs.openSync(output, 'w'));
  fs.writeFileSync(output, result.code);
};
