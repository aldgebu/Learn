const cliProgress = require('cli-progress');
class load{
    constructor(all, now) {
        this.progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        this.progress.start(all, now);
    };

    update(curval){
        this.progress.update(curval);
    }

    end(){
        this.progress.end();
    }
};

module.exports = load;