class Country {
  name;
  lon;
  lat;
}

document.addEventListener("DOMContentLoaded", () => {
  const dropDown = document.querySelector("#selectRegionOpt");

  dropDown.addEventListener("change", () => {
    console.log("NEW SELECT");
    document.querySelector(".item-container").innerHTML = "";
    const latitude = dropDown.value.split(",")[0];
    const longitude = dropDown.value.split(",")[1];

    const selectedValue = dropDown.ariaValueMax;

    h(longitude, latitude);
  });
});
function MakeItem(info) {
  imgUrl = `/images/${info["weather"].split("night")[0].split("day")[0]}.png`;
  const itemDiv = document.createElement("li");
  const date = document.createElement("h2");
  const weatherIcon = document.createElement("div");
  const weatherIconimg = document.createElement("img");
  const otherInfoDiv = document.createElement("div");
  const condition_p = document.createElement("p");
  const high_p = document.createElement("p");
  const low_p = document.createElement("p");

  date.textContent = stringToDate(info["date"]);
  high_p.textContent = `High : ${info["temp2m"]["max"]} C`;
  low_p.textContent = `Low : ${info["temp2m"]["min"]} C`;

  otherInfoDiv.append(condition_p);
  otherInfoDiv.append(high_p);
  otherInfoDiv.append(low_p);

  weatherIcon.classList.add("weather-icon");
  condition_p.textContent = getCondition(info);
  weatherIconimg.src = imgUrl;
  weatherIcon.append(weatherIconimg);

  itemDiv.append(date);
  itemDiv.append(weatherIcon);
  itemDiv.append(otherInfoDiv);
  itemDiv.classList.add("item");

  document.querySelector(".item-container").append(itemDiv);
}
async function h(lon, lat) {
  let forecast7days = [];
  return await axios
    .get(
      `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`
    )
    .then((res) => {
      res.data["dataseries"].forEach((element) => {
        if (forecast7days.length < 7) {
          forecast7days.push(element);
          MakeItem(element);
        } else return;
      });
    });
}

function getIconUrl(info) {
  let url = "/images/rain.png";
  switch (info["cloudcover"]) {
    case info <= 2:
      url = "/images/clear.png";

      break;
    case 2:
      break;
  }
  return url;
}
function getCondition(info) {
  if (info["cloudcover"] <= 2) {
    //clear
    return "Clear";
  } else if (info["cloudcover"] > 2 && info["cloudcover"] <= 7) {
    //partly cloudy

    return "Partly Cloudy";
  } else if (info["cloudcover"] > 7) {
    //cloudy

    return "Cloudy";
  }
}
function stringToDate(dateString) {
  var year = parseInt(String(dateString).substring(0, 4), 10);
  var month = parseInt(String(dateString).substring(4, 6), 10) - 1;
  var day = parseInt(String(dateString).substring(6, 8), 10);

  var myDate = new Date(year, month, day);
  var dayOfWeek = myDate.getDay();
  //console.log(getMonthName(myDate.getMonth()))

  return `${getDayName(myDate.getDay())}, ${getMonthName(
    myDate.getMonth()
  )} ${myDate.getDate()}`;
}

function getDayName(day) {
  var daysOfWeek = ["Sun", "Mon", "Tues", "Thurs", " Wed", "Fri", "Sat"];
  return daysOfWeek[day];
}
function getMonthName(mon) {
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    " May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return month[mon];
}
