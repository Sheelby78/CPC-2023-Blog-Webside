const timer = document.getElementById("time");
let apiEndpoint = "https://dummyjson.com/posts";
let allData = {};
let indexMessage = 0;
let dataToCookie = "id=";
const table = document.querySelector('table');

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
    document.cookie = dataToCookie;
    favoriteSet();
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
    for(let i = 0; i < 30; i++){
        allData.posts[i].favorite = 0;
    }
    changeMessageDisplay();
    setInterval(changeMessageDisplay, 10000);
}

function changeMessageDisplay(){
    for(let i = 4; i >= 0; i--){
        let tag = "";
        for (let j = 0; j < allData.posts[i+indexMessage].tags.length; j++){
            tag += allData.posts[i+indexMessage].tags[j];
            if(j != 2){
                tag += " ";
            }    
        }
        if(allData.posts[i+indexMessage].favorite == 1){
            let star = i+1;
            document.getElementById("star" + star).style.color = "yellow";
        } else{
            let star = i+1;
            document.getElementById("star" + star).style.color = "white";
        }
        document.getElementById("table").rows[i+1].cells[0].innerHTML = allData.posts[i+indexMessage].id;
        document.getElementById("table").rows[i+1].cells[1].innerHTML = tag;
        document.getElementById("table").rows[i+1].cells[2].innerHTML = allData.posts[i+indexMessage].title;
        document.getElementById("table").rows[i+1].cells[3].innerHTML = allData.posts[i+indexMessage].body;
    }
    indexMessage += 1;
    if(indexMessage ==26){
        indexMessage = 0;
    }
}

function favoriteSet(){
    table.addEventListener('click', (event) => {
        const icon = event.target.closest('i');
        if (icon) {
          const cell = icon.parentNode;
          const row = cell.parentNode;
          const rowIndex = row.rowIndex;
          const id = document.getElementById("table").rows[rowIndex].cells[0].textContent;
          for(let i = 0; i < 30; i++){
            if(allData.posts[i].id == id){
                allData.posts[i].favorite = 1;
                dataToCookie += allData.posts[i].id + " ";
                document.cookie = dataToCookie;
            }
          }
          icon.style.color = "yellow";
        }
      });
    }