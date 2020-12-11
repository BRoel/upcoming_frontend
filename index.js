const endPoint = 'http://localhost:3000/api/v1/games';

document.addEventListener('DOMContentLoaded', () => {
    // fetch and load
    console.log("DOM is Loaded");
    getGames()
})

function getGames() {
    fetch(endPoint)
    .then(response => response.json())
    .then(games => {
        console.log(games);
        games.data.forEach(game => {
            // double check how your data is nested in the console so you can successfully access the attributes of each individual object
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
          })
    })
}