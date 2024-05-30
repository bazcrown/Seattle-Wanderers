var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://j9as09z9sd.execute-api.us-west-2.amazonaws.com/prod/seattle', true);

function isNameInData(jsonData, name){
  jsonData.forEach(function(item){
    if(item.hasOwnProperty('name')){
      //item.jsonData = JSON.parse(item.jsonData);
      console.log("Found name");
      return true;
    }else{
      return false;
    }
  });
}

xhr.onload = function() {
  if (xhr.status === 200) {
    var responseData = JSON.parse(xhr.responseText);
    console.log(responseData);
    //console.log(isNameInData(responseData, "Green Lake Park"));
    responseData.forEach(function(item) {
      if (item.hasOwnProperty('jsonData')) {
        
        item.jsonData = JSON.parse(item.jsonData);

        console.log(item.jsonData.name);
        //const searchItem = document.createElement('option');
        //searchItem.text = item.jsonData.name;

        //dataList.appendChild(searchItem);
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