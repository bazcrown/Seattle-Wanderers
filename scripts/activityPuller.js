
function getParameterByName(url, name) {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const currentUrl = window.location.href;
const pulledId = getParameterByName(currentUrl, 'id');

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://j9as09z9sd.execute-api.us-west-2.amazonaws.com/prod/seattle?id=' + pulledId, true);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
    if (xhr.status === 200) {
      let responseData = JSON.parse(xhr.responseText);
      console.log(responseData);
    }
};

xhr.onerror = function() {
    console.error('Request failed');
};

let requestBody = JSON.stringify({id: pulledId});
xhr.send(requestBody);