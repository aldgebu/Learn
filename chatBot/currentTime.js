class currentTime{
    getTime(){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        let currentTime;
        if (hours < 10)
            currentTime = '0' + hours;
        else
            currentTime = hours;
        currentTime += ':';

        if(minutes < 10)
            currentTime += '0' + minutes;
        else
            currentTime += minutes;

        return currentTime;
    }
}

module.exports = currentTime;