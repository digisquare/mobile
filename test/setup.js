import 'core-js/fn/object/values';
import 'react-native-mock/mock';

import mockery from 'mockery';
import fs from 'fs';
import path from 'path';
import register from 'babel-core/register';

mockery.enable();
mockery.warnOnUnregistered(false);
mockery.registerMock('react-native-fabric', {
  Crashlytics: {
    crash: () => {},
  },
});

const modulesToCompile = [
  'react-native',
].map((moduleName) => new RegExp(`/node_modules/${moduleName}`));

const rcPath = path.join(__dirname, '..', '.babelrc');
const source = fs.readFileSync(rcPath).toString();
const config = JSON.parse(source);

config.ignore = function(filename) {
  if (!(/\/node_modules\//).test(filename)) {
    return false;
  } else {
    const matches = modulesToCompile.filter((regex) => regex.test(filename));
    const shouldIgnore = matches.length === 0;
    return shouldIgnore;
  }
}

register(config);

require.extensions['.png'] = () => null;
