
import {dirname} from 'path';
import {readdirSync, mkdirSync} from 'fs';

const mkdirpath = (pathname) => {
	const dir = dirname(pathname);
	try {
		readdirSync(dir);
	} catch (err) {
		mkdirpath(dir);
		try {
		  mkdirSync(dir);
		} catch (err2) {
			if (err2.code !== 'EEXIST') {
				throw err2;
			}
		}
	}
};

export default mkdirpath;