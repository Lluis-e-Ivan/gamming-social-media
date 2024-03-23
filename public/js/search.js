// get search bar element
const searchInput = document.getElementById("searchInput");

// store game elements in array-like object
const gamesFromDOM = document.getElementsByClassName("game-results");

// listen for user events
searchInput.addEventListener("keyup", (event) => {
    const { value } = event.target;
    // get user search input converted to lowercase
    const searchQuery = value.toLowerCase();
    
    for (const gameElement of gamesFromDOM) {
        // store game text and convert to lowercase
        let game = gameElement.textContent.toLowerCase();
        
        // compare current game to search input
        if (game.includes(searchQuery)) {
            // found game matching search, display it
            gameElement.style.display = "block";
        } else {
            // no match, don't display game
            gameElement.style.display = "none";
        }
    }
});