#!/usr/bin/env node

const program = require('commander');
const doInit = require('../index.js');

program.version('v' + require('../package.json').version);

program.command('initMain <dir>')
    .description('main template')
    .action(function (dir) {
        doInit(dir, "main");
    });

program.command('initSub <dir>')
    .description('Sub template')
    .action(function (dir) {
        doInit(dir, "Sub");
    });

program.parse(process.argv);

if (program.args.length === 0) {
    program.help()
}
