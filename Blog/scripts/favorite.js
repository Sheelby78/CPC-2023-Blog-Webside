const timer = document.getElementById("time");
let apiEndpoint = "https://dummyjson.com/posts";
let allData = {};
let indexMessage = 0;

function updateTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    timer.innerHTML =  h + ":" + m + ":" + s;
    setTimeout(updateTime, 1000);
  }

  function checkTime(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  function onLoad() {
    updateTime();
    loadData()
        .then(data => setUpMessageDisplay(data));
}

function loadData() {
    return fetch(apiEndpoint)
        .then(response => response.json())
        .catch(error => console.log(error));
}

function setUpMessageDisplay(data){
    allData = data;
    changeMessageDisplay();
}

function changeMessageDisplay(){
    let table = document.getElementById("table").getElementsByTagName('tbody')[0];

    let ids = document.cookie.split(";")[0].split("=")[1].split(" ");
    for(let k = 0; k < ids.length; k++){

        for(let i = 0; i < 30; i++){
            if(allData.posts[i].id == ids[k]){
                let tag = "";
                for (let j = 0; j < allData.posts[i].tags.length; j++){
                    tag += allData.posts[i].tags[j];
                    if(j != 2){
                        tag += " ";
                    }    
                }
                newRow = table.insertRow();
                newCell1 = newRow.insertCell();
                newCell2 = newRow.insertCell();
                newCell3 = newRow.insertCell();
                newCell4 = newRow.insertCell();

                newCell1.innerHTML = allData.posts[i].id;
                newCell2.innerHTML = tag;
                newCell3.textContent = allData.posts[i].title;
                newCell4.textContent = allData.posts[i].body;
                
                newRow.appendChild(newCell1);
                newRow.appendChild(newCell2);
                newRow.appendChild(newCell3);
                newRow.appendChild(newCell4);

                table.appendChild(newRow);
            }
        }
    }
}