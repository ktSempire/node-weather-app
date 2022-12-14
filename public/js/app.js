console.log('client side javascript loaded');

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const lbl_location = document.querySelector('.location')
const lbl_forecast = document.querySelector('.forecast')

const img_weather = document.querySelector('.img_weather')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    var location = searchInput.value
    lbl_forecast.innerHTML = 'Please Wait...'
    img_weather.display = 'none'
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error);
                lbl_forecast.innerHTML = '<p style="color:red;">'+data.error+'</p>'
                searchInput.value = '';
            }else{
                console.log(data);
                // console.log(data.location);
                // console.log(data.ForecastData);
                lbl_location.innerHTML = data.location
                lbl_forecast.innerHTML = data.ForecastData
                img_weather.display = 'block'
                img_weather.src = data.image
                searchInput.value = '';
            }
        })   
    })
})
