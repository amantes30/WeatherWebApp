const express = require("express");
const axios = require("axios");
const ejs = require('ejs');


const app = express();
const port = 3000;
let countrylist = [];

async function j(){
    console.log("wait me")
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
            console.log(e);
        })
        
        
    })
}


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/', async (req, res)=>{
    await j();
    res.render('index', { countrylist });
})
app.get('/:countryname', (req, res)=>{
    const {countryname} = req.params;
    j();
    res.send(countryname)
})
app.listen(port, ()=>{
    console.log(`LISTENING ON PORT ${port}`)
})