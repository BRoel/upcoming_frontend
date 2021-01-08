class App {

    baseURL = 'http://localhost:3000/api/v1/games'

    eventListeners = () => {

        document.addEventListener('DOMContentLoaded', () => {// fetch and load
        this.getGames()
    
        const createGameForm = document.querySelector("#create-games-form")
        createGameForm.addEventListener('submit', (e) => this.createFormHandler(e))
        })
    }

    getGames() {
        document.querySelector('#game-container').innerHTML = "";
        fetch(`${this.baseURL}`)
        .then(response => response.json())
        .then(games => {
            games.data.forEach(game => {
                const newGame = new Game(game.id, game.attributes)
                document.querySelector('#game-container').innerHTML += newGame.renderGame();
            })
        })
        .then(() => {
            this.deletedGameListener()
        })
    }

    postFetch(title, description, release_date, image_url, genre_id) {
        const bodyData = {title, description, release_date, image_url, genre_id}

        fetch(`${this.baseURL}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"}, //The header is there so your app can detect what data was returned and how it should handle it. You need to look at the header, and if it's application/json then parse it as JSON.
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(game => {
            console.log(game);
            const newGame = new Game(game.data.id, game.data.attributes)
            document.querySelector('#game-container').innerHTML += newGame.renderGame();
            this.getGames
            this.reset()
        })
    }

    createFormHandler(e) {
        e.preventDefault()
        const titleInput = document.querySelector('#input-title').value
        const descriptionInput = document.querySelector('#input-description').value
        const releaseDateInput = document.querySelector('#input-date').value
        const imageInput = document.querySelector('#input-url').value
        const genreId = parseInt(document.querySelector('#genres').value)
        this.postFetch(titleInput, descriptionInput, releaseDateInput, imageInput, genreId)
    }


    deleteGame(e) {
        e.preventDefault()
        fetch(`${this.baseURL+'/'+e.currentTarget.dataset.id}`, { // fetching the id route for my selected delete button
            method: "DELETE",
        })
        .then(() => {
            alert('game has been deleted');
            this.getGames();
        })
        .catch((error) => alert(error))
    }

    deletedGameListener() {
        const deleteButtons = document.getElementsByClassName("delete");
        for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', this.deleteGame, false); // assigning event listeners to all delete buttons in my class and looping through them
        }
    }

    reset() {
        $('#input-title').val('');
        $('#input-description').val('');
        $('#input-date').val('');
        $('#input-url').val('');
        $('#genres').val('');
    }
}