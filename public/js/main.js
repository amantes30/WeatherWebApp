
class Country{
    name;
    lon;
    lat;
}

document.addEventListener("DOMContentLoaded", ()=>{
    const dropDown = document.querySelector("#selectRegionOpt");

    dropDown.addEventListener("change", ()=>{
        console.log("NEW SELECT")
        
        const selectedValue = dropDown.ariaValueMax;
        
        h();
        
    })
})

async function h(){
    return await axios.get('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=meteo&output=json')
    .then((res) => {
        console.log( res.data)
    })
}