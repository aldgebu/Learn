class TimeProvider{

    async compare(oldTime){
        const currentTime = await this.getCurrentTime();
        const delta =  currentTime - oldTime;
        return (delta >= 3600000);
    }

    async getCurrentTime(){
        const time = new Date();
        const oldTime = new Date(0);
        const delta = time - oldTime;
        return (delta);
    }
}

module.exports = TimeProvider;