const request = require("request");

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5dd597c4c7f0b79438c8a333c9f98457&query='+lat+','+long;
    request({url ,json:true}, (error,{ body } = {}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback(body.error.info,undefined)
        }else{
            // console.log(body.current);
            var forecast_is = body.current.weather_descriptions[0]+".it is currently "+body.current.temperature+" degrees out. it's feel like "+body.current.feelslike+"% degrees out.";
            callback(undefined,forecast_is);
        }
    });
}

module.exports = forecast;