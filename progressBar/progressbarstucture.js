const cliProgress = require('cli-progress');
const load = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const start = (all, cur) => {
    load.start(all, cur);
};

const update = (newValue) => {
    load.update(newValue);
}

const stop = () => {
    load.stop();
}

module.exports = {
    start : start,
    update: update,
    stop: stop
}