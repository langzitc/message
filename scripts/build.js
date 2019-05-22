const execSync = require('child_process').execSync
execSync('rollup -c --config config/rollup.config.js');