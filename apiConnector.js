
var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://j9as09z9sd.execute-api.us-west-2.amazonaws.com/prod/seattle', true);

const gridContainer = document.querySelector('.grid-container');

xhr.onload = function() {
  if (xhr.status === 200) {
    var responseData = JSON.parse(xhr.responseText);
    console.log(responseData);
    if (responseData.hasOwnProperty('body')) {
      JSON.parse(responseData.body).forEach(function(item) {
        if (item.hasOwnProperty('jsonData')) {
          item.jsonData = JSON.parse(item.jsonData);

          const gridItem = document.createElement('div');
          gridItem.className = 'grid-item';

          const gridItemTitle = document.createElement('h3');
          gridItemTitle.textContent = item.jsonData.name;

          const gridItemImage = document.createElement('img');
          gridItemImage.src = item.jsonData.photo.images.medium.url;
          gridItemImage.alt = item.jsonData.photo.caption;

          gridItem.appendChild(gridItemTitle);
          gridItem.appendChild(gridItemImage);
          gridContainer.appendChild(gridItem);
        }
      });
    } else {
      console.error('Invalid response data structure');
    }

    // console.log(responseData);
  } else {
    console.error('Request failed. Status:', xhr.status);
  }
};

xhr.onerror = function() {
  console.error('Request failed');
};

xhr.send();