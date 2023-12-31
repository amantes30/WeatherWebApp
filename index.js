const express = require("express");
const axios = require("axios");
const ejs = require('ejs');
const fs = require('fs').promises;
const { resolve } = require("path");

const app = express();
const port = 3000;
let countrylist = [];

async function getCountryList(){
    return await axios.get("https://restcountries.com/v3.1/region/asia?fields=name,latlng")
    .then((res) =>{
        res.data.forEach(element => {
            const countryInfo = {
                name: element['name'].common,
                latlng : element['latlng'],
            };
            countrylist.push(countryInfo);
        });
        countrylist.forEach(e => {
           // console.log(e);
        })
        
        
    })
}
async function getCountryList_csv(){
    let infoList = [];
    try {
        const data = await fs.readFile('./city_coordinates.csv', 'utf8');
        const infoList = data.split('\r');

        const countrylist = infoList.map(e => ({
            name: `${e.split(',')[2]}, ${e.split(',')[3]}`,
            latlng: `${e.split(',')[0]}, ${e.split(',')[1]}`,
        })).filter(e => e.latlng !== "latitude, longitude");  // Adjust the filter condition as needed

        return countrylist;
    } catch (err) {
        console.error(err);
        throw err;  // Propagate the error so it can be caught in the calling code
    }
    
   
}


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/', async (req, res)=>{
    try {
        const countrylist = await getCountryList_csv();
        res.render('index', { countrylist });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  
})
app.get('/:countryname', (req, res)=>{
    const {countryname} = req.params;
    getCountryList();
    res.send(countryname)
})
app.listen("https://amantes30.github.io/WeatherWebApp/", ()=>{
    console.log(`LISTENING ON PORT ${port}`)
})
