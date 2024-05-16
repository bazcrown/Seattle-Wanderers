var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://j9as09z9sd.execute-api.us-west-2.amazonaws.com/prod/seattle', true);

const currentUrl = window.location.href;
console.log('Current URL:', currentUrl);

xhr.onload = function() {
    if (xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
    }
};

xhr.onerror = function() {
    console.error('Request failed');
};
  
xhr.send();