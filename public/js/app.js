console.log('client side javascript loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })   
// })


    
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const lbl_location = document.querySelector('.location')
const lbl_forecast = document.querySelector('.forecast')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    var location = searchInput.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error);
                lbl_forecast.innerHTML = '<p style="color:red;">'+data.error+'</p>'
                searchInput.value = '';
            }else{
                // console.log(data.location);
                // console.log(data.ForecastData);
                lbl_location.innerHTML = data.location
                lbl_forecast.innerHTML = data.ForecastData
                searchInput.value = '';
            }
        })   
    })
})
