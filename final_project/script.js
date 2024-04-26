const map = L.map('map').setView([42.2, -83.7], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const RANGE = 10;

const tempComponent = document.querySelector('#temp');
const windComponent = document.querySelector('#wind');
const precipComponent = document.querySelector('#precip');
const snowComponent = document.querySelector('#snow');

const markerButton = document.querySelector("#marker-button");
const heatmapButton = document.querySelector("#heatmap-button");

const tempInput = tempComponent.querySelector('input');
const windInput = windComponent.querySelector('input');
const precipInput = precipComponent.querySelector('input');
const snowInput = snowComponent.querySelector('input');

const tempValue = tempComponent.querySelector('.value');
const windValue = windComponent.querySelector('.value');
const precipValue = precipComponent.querySelector('.value');
const snowValue = snowComponent.querySelector('.value');


let heatMapLayerGroup;
let markerLayerGroup;

function setComponentValues() {
    tempValue.innerText = Math.round(tempInput.value);
    windValue.innerText = Math.round(windInput.value);
    precipValue.innerText = Math.round(precipInput.value);
    snowValue.innerText = Math.round(snowInput.value);
}

function render() {
    const tempValue = parseFloat(tempInput.value);
    const windValue = parseFloat(windInput.value);
    const precipValue = parseFloat(precipInput.value);
    const snowValue = parseFloat(snowInput.value);

    const tempMinRange = tempValue - tempInput.max / RANGE;
    const tempMaxRange = tempValue + tempInput.max / RANGE;

    const windMinRange = windValue - windInput.max / RANGE;
    const windMaxRange = windValue + windInput.max / RANGE;

    const precipMinRange = precipValue - precipInput.max / RANGE;
    const precipMaxRange = precipValue + precipInput.max / RANGE;

    const snowMinRange = snowValue - snowInput.max / RANGE;
    const snowMaxRange = snowValue + snowInput.max / RANGE;

    const stations = [];
    for (const datum of DATA) {
        if (
            datum.temp > tempMinRange && datum.temp < tempMaxRange
            && (datum.wind > windMinRange && datum.wind < windMaxRange)
            && datum.precip > precipMinRange && datum.precip < precipMaxRange
            && datum.snow > snowMinRange && datum.snow < snowMaxRange
        ) {
            stations.push(datum);
        }
    }

    if (heatMapLayerGroup) {
        map.removeLayer(heatMapLayerGroup);
    }

    if (markerLayerGroup) {
        map.removeLayer(markerLayerGroup);
    }

    heatMapLayerGroup = L.layerGroup();
    markerLayerGroup = L.layerGroup();

    const coordinates = [];
    for (const station of stations) {
        const coordinate = [station.lat, station.lon, 1e8];
        coordinates.push(coordinate);
        const marker = L.marker([station.lat, station.lon],{riseOnHover:true});
        marker.bindPopup(`Station: ${station.station}<br>Name: ${station.name}<br>Temperature: ${station.temp} °F<br>
                        Wind: ${Math.round(station.wind)} mi/hr<br>Precipitation: ${station.precip} in<br>Snow: ${station.snow} in`).openPopup();
        markerLayerGroup.addLayer(marker);
    }

    const heatLayer = L.heatLayer(coordinates, { radius: 14 });
    heatMapLayerGroup.addLayer(heatLayer);

    if (markerButton.hasAttribute('selected')) {
        markerLayerGroup.addTo(map);
    }

    if (heatmapButton.hasAttribute('selected')) {
        heatMapLayerGroup.addTo(map);
    }

}

function selectLayer(event) {
    event.target.toggleAttribute('selected');
    render();
}


let layerGroup = null;
function onInputChanged(event) {

    const currentValue = event.currentTarget.querySelector('.value');
    const currentInput = event.target;
    currentValue.innerText = Math.round(currentInput.value);

    render();
}

for (const datum of DATA) {

    if (!tempInput.min || datum.temp < tempInput.min) {
        tempInput.min = datum.temp;
    }
    if (!tempInput.max || datum.temp > tempInput.max) {
        tempInput.max = datum.temp;
    }

    if (!windInput.min || datum.wind < windInput.min) {
        windInput.min = datum.wind;
    }
    if (!windInput.max || datum.wind > windInput.max) {
        windInput.max = datum.wind;
    }

    if (!precipInput.min || datum.precip < precipInput.min) {
        precipInput.min = datum.precip;
    }
    if (!precipInput.max || datum.precip > precipInput.max) {
        precipInput.max = datum.precip;
    }

    if (!snowInput.min || datum.snow < snowInput.min) {
        snowInput.min = datum.snow;
    }
    if (!snowInput.max || datum.snow > snowInput.max) {
        snowInput.max = datum.snow;
    }
}

tempInput.value = 50.900000;
windInput.value = 6.91623;
precipInput.value = 30.020000;
snowInput.value = 28.650000;

setComponentValues();
render();

tempComponent.addEventListener('input', onInputChanged);
windComponent.addEventListener('input', onInputChanged);
precipComponent.addEventListener('input', onInputChanged);
snowComponent.addEventListener('input', onInputChanged);
markerButton.addEventListener("click", selectLayer);
heatmapButton.addEventListener("click", selectLayer);