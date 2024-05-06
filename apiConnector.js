
function getFileNameFromUrl(url) {
  // Split the URL by '/' to get the file name part
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];

  // Replace spaces with hyphens and return the modified file name
  return fileName.replace(/\s+/g, '-');
}

// Example usage
const originalUrl = 'https://media-cdn.tripadvisor.com/media/photo-t/08/87/c1/a4/safeco-field.jpg';
const modifiedFileName = getFileNameFromUrl(originalUrl);
console.log(modifiedFileName); // Output: safeco-field.jpg

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
          urlPath = getFileNameFromUrl(item.jsonData.photo.images.medium.url)
          gridItemImage.src = "images/" + urlPath;

          console.log(item.jsonData.photo.images.medium.url);
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