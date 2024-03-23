// get search bar element
const checkboxes = document.querySelectorAll("input[name=checkbox]")

// store game elements in array-like object
const gameCards = document.getElementsByClassName("game-results");

let genres = []

// listen for user events
for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", (event) => {
        const genre = event.target.nextElementSibling.innerText.toLowerCase()

        if (event.target.checked) {
            genres.push(genre)
        } else {
            genres = genres.filter(x => x !== genre)
        }

        console.log(genres)
        
        for (const gameElement of gamesFromDOM) {
            // store game text and convert to lowercase
            let gameGenre = gameElement.dataset.genre?.toLowerCase()
            
            // compare current game to search input
            if (genres.length === 0 || genres.includes(gameGenre)) {
                // found game matching search, display it
                gameElement.style.display = "block";
            } else {
                // no match, don't display game
                gameElement.style.display = "none";
            }
        }
        
    });
}