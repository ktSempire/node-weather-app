const express = require('express')
const path = require('path');
const hbs = require('hbs');
const { log } = require('console');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory for to serve
app.use(express.static(publicDirectoryPath))

app.get('',(erq,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Kamlesh M. Talaviya'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About Page',
        name:'Kamlesh M. Talaviya'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help Page',
        name:'Kamlesh M. Talaviya'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Address must be provided!'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude, (error,ForecastData) => {
            if(error){
                return res.send({ error })
            }

            return res.send({
                ForecastData:ForecastData,
                location:location,
                address:req.query.address,
            })
        })        
    })

    // res.send({
    //     forecast:'it is snowing',
    //     name:'Surat',
    //     address:req.query.address
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'you must provide search term!'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        errorMassage:'Help article not found',
        name:'Kamlesh m. talaviya',
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        errorMassage:'404 page not found',
        name:'Kamlesh m. talaviya',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});