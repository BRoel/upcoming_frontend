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
        renderGameForm(game)
        })
    })
}

function renderGameForm(game) {
    const gameMarkup = `
    <div data-id=${game.id}>
      <img src=${game.attributes.image_url} height="200" width="250">
      <h3>${game.attributes.title}</h3>
      <p>${game.attributes.description}</p>
      <p>${game.attributes.genre.name}</p>
      <button data-id=${game.id}>edit</button>
    </div>
    <br><br>`;

    document.querySelector('#game-container').innerHTML += gameMarkup
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector('#input-title').value
    const descriptionInput = document.querySelector('#input-description').value
    const imageInput = document.querySelector('#input-url').value
    const genreId = parseInt(document.querySelector('#genres').value)
    postFetch(titleInput, descriptionInput, imageInput, genreId)
}

function postFetch(title, description, image_url, genre_id) {
    const bodyData = {title, description, image_url, genre_id}

    fetch(endPoint, {
    //post request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(game => {
        const gameData = game.data.attributes
        // render JSON response
        renderGameForm(gameData)
    })
}