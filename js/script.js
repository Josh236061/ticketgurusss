const searchBtn = document.querySelector("#searchBtn");
var cityEl = document.querySelector("#location");
var genreEl = document.querySelector("select");
var resultsContainer=document.querySelector(".results");
var nameResult = document.querySelectorAll("h5");



//objectify data based on user criteria
var getUserInput = function(event){
    event.preventDefault();

var userCity = cityEl.value;
console.log(userCity);
var selectedGenre = genreEl.value;
console.log(selectedGenre);
if (userCity&&selectedGenre) {

    getSearchData(userCity,selectedGenre);

}

};

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

                nameResult.innerHTML="0 suggestions found."
                
            }
            
    })

};


var displayUserSearch = function(data){
    var events = data._embedded.events;
    // clear previous search
    resultsContainer.innerHTML= "";
    // create a card for each result
    for (var i=0; i<events.length; i++){
        //create display elements
        var createdLi = document.createElement("li") 
        var createDiv = document.createElement("div")
        var createdImgEl = document.createElement("img")
        var createdNameEl = document.createElement("h5")  
        var createDateEl = document.createElement("h6")  

        // get elements info from data   
        var eventName = events[i].name;
        var eventID = events[i].id;
        var getEventImage = events[i].images[6].url;
        var getEventDate = events[i].dates.start.localDate;
        createdImgEl.setAttribute("src",getEventImage);
        createdImgEl.setAttribute("width", "100%")

        createdNameEl.innerHTML=eventName
        createdNameEl.classList.add("event-target");
        createdNameEl.setAttribute("id",eventID);
        createDateEl.innerHTML=getEventDate
        //append display elements to div
        createDiv.appendChild(createdImgEl)
        createDiv.appendChild(createdNameEl);
        createDiv.appendChild(createDateEl);

        //add div to li then add class to li = eventName
        createdLi.appendChild(createDiv);
        createdLi.setAttribute("id",eventName);
        createdLi.classList.add("event-target");
    
        //add li to ul
        resultsContainer.appendChild(createdLi)
        
        // get events for later display
        var localStartDate = events[i].dates.start.localDate;
        localStorage.setItem("localDate", localStartDate)
    }
    
};

var displayEventInfo = function(event){
    var targetEventID = event.target.id;

    var eventIdUrl = "https://app.ticketmaster.com/discovery/v2/events/" + targetEventID + ".json?apikey=V2Ll5Uro2WRn7fALPro13FuvKveLuFPq";
    fetch(eventIdUrl)
    .then (function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data)

                // get var from data to display
                var resultsName = data.name;
                var resultsArtist = data._embedded.attractions[0].name;
                var localStartTime = data.dates.start.locaTime;
                var localStartDate = data.dates.start.localDate;
                var venueInfo = data._embedded.venues[0].name;
                var eventStatus = data.dates.status.code;
                var ticketPriceMax = data.priceRanges[0].max;
                var ticketPriceMin = data.priceRanges[0].min;
        
                //display data to DOM
                var eventNameEl = document.querySelector("#eventName");
                var artistEl = document.querySelector("#artistName");
                var localStartDateTimeEl = document.querySelector("#eventTime");
                var venueInfoEl = document.querySelector("#venueInfo");
                var eventStatusEl = document.querySelector("#eventStatus");
                var tickerPriceEl = document.querySelector("#ticketPrice");

                //add the data to the elements
                eventNameEl.innerHTML= resultsName;
                artistEl.innerHTML = "Artist:   " + resultsArtist;
                localStartDateTimeEl.innerHTML = "Start Date/Time:   " + localStartDate + "  /  " + localStartTime;
                venueInfoEl.innerHTML = "Venue Info:   " + venueInfo;
                eventStatusEl.innerHTML = "Event Status:   "  + eventStatus
                tickerPriceEl.innerHTML = "Ticket Price:    " + ticketPriceMin +"  -   " + ticketPriceMax + "    USD";

                // add ticket url to href and set it as an attribute to anchor/purchaseBtn
                var purchaseBtn = document.querySelector("#ticketLink")
                var ticketLink = data.url
                console.log(ticketLink)
                purchaseBtn.setAttribute("href", ticketLink)


               
            })
        }
            
    })

   
};

searchBtn.addEventListener("click", getUserInput);
resultsContainer.addEventListener("click", function(event){
    if(event.target.matches(".event-target")){
        displayEventInfo(event);
        console.log("clicked")
    }else {
        var whatIsIt = event.target.getAttribute("id")
        console.log(whatIsIt)
    }
});