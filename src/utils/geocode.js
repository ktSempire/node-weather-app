const request = require('request');

const geocode = (address,callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=be2711f6cafa8c7cb9ae37b206068244&query='+encodeURIComponent(address)+'&limit=1';
    request({url,json:true}, (error,{ body } = {}) => {
        if(error){
            callback('Unable to connect to location services!',undefined)   
        }else if(!body.data || body.data.length === 0){
            callback('Unable to find location. try another search.',undefined)   
        }else{
            var longitude = body.data[0].longitude;
            callback(undefined,{
                latitude:body.data[0].latitude,
                longitude:body.data[0].longitude,
                location:body.data[0].label
            })
        }
    });
}

module.exports = geocode