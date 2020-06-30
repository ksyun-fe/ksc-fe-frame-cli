const execa = require('execa');
const EventEmitter = require('events');
const process = require('process');

class InstallProgress extends EventEmitter {
    constructor() {
        super()

        this._progress = -1
    }

    get progress() {
        return this._progress
    }

    set progress(value) {
        this._progress = value
        this.emit('progress', value)
    }

    get enabled() {
        return this._progress !== -1
    }

    set enabled(value) {
        this.progress = value ? 0 : -1
    }

    log(value) {
        this.emit('log', value)
    }
}

const progress = exports.progress = new InstallProgress();

function installPackage(targetDir, callback){
    return new Promise((resolve, reject) => {
        const child = execa("npm", ['install', '--loglevel', 'error'], {
            cwd: targetDir,
            stdio: ['inherit', 'pipe', 'inherit']
        });

        child.stdout.on('data', buffer => {
            process.stdout.write(buffer)
        });

        child.on('close', code => {
            console.log(code)
            if (code !== 0) {
                //reject(`npm failed: npm ${args.join(' ')}`)
                return
            }
            callback && callback();
            resolve()
        })

    });
}

module.exports = installPackage;



