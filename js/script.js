const searchBtn = document.querySelector("#searchBtn");
var cityEl = document.querySelector("#location");
var genreEl = document.querySelector("select");
var resultsContainer=document.querySelector(".results");

//objectify data based on user criteria
var getUserInput = function(event){
    event.preventDefault();
var userCity = cityEl.value;
console.log(userCity);
var selectedGenre = genreEl.value;
console.log(selectedGenre);

getSearchData(userCity,selectedGenre);

}

// fetch data based on the user's inputs
var getSearchData = function(city,genre){
    
    var apiURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=" + city + "&genre=" + genre + "&apikey=V2Ll5Uro2WRn7fALPro13FuvKveLuFPq"
    
    //get get data based on what the user selected
    fetch(apiURL) 
    .then (function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data)

                displayUserSearch(data);
        })
            }else{

                return
            }
            
    })

};


var displayUserSearch = function(data){
    var events = data._embedded.events;

    // create a card for each result
    for (var i=0; i<events.length; i++){
        var createdLi = document.createElement("li") 
        var createDiv = document.createElement("div")
        var createdImgEl = document.createElement("img")
        var createdNameEl = document.createElement("h5")  
        var createDateEl = document.createElement("h6")     
        var eventName = events[i].name;
        var getEventImage = events[i].images[6].url;
        var getEventDate = events[i].dates.start.localDate;

        createdImgEl.setAttribute("src",getEventImage);

        createdNameEl.innerHTML=eventName
        createDateEl.innerHTML=getEventDate
        //append display elements to div
        //createDiv.appendChild(createdImgEl)
        createDiv.appendChild(createdNameEl);
        createDiv.appendChild(createDateEl);

        createdLi.appendChild(createDiv);

        resultsContainer.appendChild(createdLi)
        
    
    }
    
    

}

searchBtn.addEventListener("click", getUserInput);