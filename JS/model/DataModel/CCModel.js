export default function() {
    fetch("http://api.geonames.org/getJSON?geonameId=360630&username=sayed_rhab")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}