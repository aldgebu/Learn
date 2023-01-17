class timeCheker{
    isTime(data){
        if (data.length === 5){
            if (data[2] === ':'){
                const firstTwo = data[0] + data[1];
                const secondTwo = data[3] + data[4];
                if (firstTwo <= 23 && secondTwo <= 59){
                    return true;
                }
                //do nothing shechemisa
            }
        }
        return false;
    }
}

module.exports = timeCheker;