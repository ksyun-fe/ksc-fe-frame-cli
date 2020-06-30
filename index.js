const rm = require('rimraf').sync;
const childProcess = require('child_process');
const process = require('process');
const install = require('./lib/install');
const {
    mainUrl,
    subUrl
} = require('./lib/git');
const gitclone = require('./lib/gitClone');

var getTmpl = (project, type) => {
    let url = '';
    if(type == 'main'){
        url = mainUrl
    }
    else{
        url = subUrl
    }
    let dest = process.cwd() + '/' + project;

    console.log('download template');
    gitclone(url, dest, {checkout: 'master', shallow: true}, function (err) {
        if (err === undefined) {
            rm(dest + '/.git');
            console.log('npm install...');
            install(dest);
            //return exec('cd ' + project + ' && npm install');
            //fn()
        } else {
            //fn(err)
        }
    });

}

module.exports = getTmpl;


