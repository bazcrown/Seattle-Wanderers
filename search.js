
function getFileNameFromUrl(url) {
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];

    return fileName.replace(/\s+/g, '-');
}


var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://j9as09z9sd.execute-api.us-west-2.amazonaws.com/prod/seattle', true);

//const gridContainer = document.querySelector('.search');

// Find the datalist element with the id 'search'
var dataList = document.getElementById('search');
/*
// Check if the datalist exists
if (dataList) {
    // Define an array of options
    var options = ['Option 1', 'Option 2', 'Option 3'];

    // Loop through the options array
    options.forEach(function(optionText) {
        // Create a new option element
        var option = document.createElement('option');
        // Set the text of the option
        option.text = optionText;
        // Append the option to the datalist
        dataList.appendChild(option);
    });
} else {
    console.error("Datalist with id 'search' not found.");
}*/

xhr.onload = function() {
if (xhr.status === 200) {
    var responseData = JSON.parse(xhr.responseText);
    console.log(responseData);
    responseData.forEach(function(item) {
      if (item.hasOwnProperty('jsonData')) {
        item.jsonData = JSON.parse(item.jsonData);

        const searchItem = document.createElement('option');
        searchItem.text = item.jsonData.name;

        dataList.appendChild(searchItem);
      }
    });

    // console.log(responseData);
} else {
    console.error('Request failed. Status:', xhr.status);
}
};

xhr.onerror = function() {
console.error('Request failed');
};

xhr.send();
