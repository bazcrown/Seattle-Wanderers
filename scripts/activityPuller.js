
function getParameterByName(url, name) {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getFileNameFromUrl(url) {
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];

  return fileName.replace(/\s+/g, '-');
}

const currentUrl = window.location.href;
const pulledId = getParameterByName(currentUrl, 'id');

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://j9as09z9sd.execute-api.us-west-2.amazonaws.com/prod/seattle?id=' + pulledId, true);
xhr.setRequestHeader('Content-Type', 'application/json');

let activityName = document.getElementById("activityName");
let activityImage = document.getElementById("activityImage");
let activityLocation = document.getElementById("activityLocation");


xhr.onload = function() {
    if (xhr.status === 200) {
      let responseData = JSON.parse(xhr.responseText);
      let jsonData = JSON.parse(responseData.Item.jsonData);
      console.log(responseData);
      jsonData = JSON.parse(responseData.Item.jsonData);

      document.getElementById("activityName").innerText = jsonData.name;
      urlPath = getFileNameFromUrl(jsonData.photo.images.medium.url);
      document.getElementById("activityImage").src = "images/" + urlPath;
      document.getElementById("activityDescription").innerText = jsonData.description
      document.getElementById("addressLine").innerText = jsonData.address
    }
};

xhr.onerror = function() {
    console.error('Request failed');
};

let requestBody = JSON.stringify({id: pulledId});
xhr.send(requestBody);