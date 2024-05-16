
function getFileNameFromUrl(url) {
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];

  return fileName.replace(/\s+/g, '-');
}


var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://j9as09z9sd.execute-api.us-west-2.amazonaws.com/prod/seattle', true);

const gridContainer = document.querySelector('.grid-container');

xhr.onload = function() {
  if (xhr.status === 200) {
    var responseData = JSON.parse(xhr.responseText);
    responseData.forEach(function(item) {
      if (item.hasOwnProperty('jsonData')) {
        item.jsonData = JSON.parse(item.jsonData);

        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        const gridItemTitle = document.createElement('h3');
        gridItemTitle.textContent = item.jsonData.name;

        const gridItemImage = document.createElement('img');
        urlPath = getFileNameFromUrl(item.jsonData.photo.images.medium.url);
        gridItemImage.src = "images/" + urlPath;

        gridItemImage.alt = item.jsonData.photo.caption;

        const gridItemLink = document.createElement('a');
        
        // console.log(item.id)
        gridItemLink.id = item.id;
        gridItemLink.href = "activity.html?id=" + item.id;

        gridItemLink.appendChild(gridItem);
        gridItem.appendChild(gridItemTitle);
        gridItem.appendChild(gridItemImage);
        gridContainer.appendChild(gridItemLink);
      }
    });
  } else {
    console.error('Request failed. Status:', xhr.status);
  }
};

xhr.onerror = function() {
  console.error('Request failed');
};

xhr.send();