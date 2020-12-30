const baseURL = 'http://localhost:3000/api/v1/games'

document.addEventListener('DOMContentLoaded', () => {// fetch and load
    getGames()

    const createGameForm = document.querySelector("#create-games-form")
    const deleteGameForm = document.querySelector("#game-container")

    createGameForm.addEventListener("submit", (e) => createFormHandler(e))
    deleteGameForm.addEventListener("delete", (e) => deleteGame(e))
})

function getGames() {
    document.querySelector('#game-container').innerHTML = "";
    return fetch(baseURL)
    .then(response => response.json())
    .then(games => {
        games.data.forEach(game => {
            const newGame = new Game(game.id, game.attributes)
            document.querySelector('#game-container').innerHTML += newGame.renderGame();
        })
    })
    .then(() => {
        deletedGameListener()
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

    fetch(baseURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(game => {
        console.log(game);
        const newGame = new Game(game.data.id, game.data.attributes)
       
        document.querySelector('#game-container').innerHTML += newGame.renderGame();
        deletedGameListener()
    })
}

function deleteGame(e) {
    e.preventDefault()
    fetch(baseURL+'/'+e.currentTarget.dataset.id, {
        method: "DELETE",
    })
    .then(() => {
        alert('game has been deleted');
        getGames();
    })
    .catch((error) => alert(error))
    
}

function deletedGameListener() {
    const deleteButtons = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteGame, false);
    }
}