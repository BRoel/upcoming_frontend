const endPoint = 'http://localhost:3000/api/v1/games';

document.addEventListener('DOMContentLoaded', () => {// fetch and load
    getGames()

    const createGameForm = document.querySelector("#create-games-form")

    createGameForm.addEventListener("submit", (e) => createFormHandler(e))
})

function getGames() {
    fetch(endPoint)
    .then(response => response.json())
    .then(games => {
        games.data.forEach(game => {
        const newGame = new Game(game.id, game.attributes)
        document.querySelector('#game-container').innerHTML += newGame.renderGame();
        })
    })
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector('#input-title').value
    const descriptionInput = document.querySelector('#input-description').value
    const releaseDateInput = document.querySelector('#input-date').value
    const imageInput = document.querySelector('#input-url').value
    const genreId = parseInt(document.querySelector('#genres').value)
    postFetch(titleInput, descriptionInput, releaseDateInput, imageInput, genreId)
}

function postFetch(title, description, release_date, image_url, genre_id) {
    const bodyData = {title, description, release_date, image_url, genre_id}

    fetch(endPoint, {
    //post request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(game => {
        console.log(game);
        const newGame = new Game(game.data.id, game.data.attributes)
        document.querySelector('#game-container').innerHTML += newGame.renderGame();
    })
}