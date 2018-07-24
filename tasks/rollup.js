import {rollup} from 'rollup';
import {readFileSync} from 'fs';

export default async configFile => {
  const options = JSON.parse(readFileSync(configFile));
  const bundle = await rollup(options);
  await bundle.write(options.output);
};