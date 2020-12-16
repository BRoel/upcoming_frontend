class Game {

    constructor(id, gameAttr) {
        this.id = id
        this.title = gameAttr.title
        this.description = gameAttr.description
        this.image_url = gameAttr.image_url
        this.genre = gameAttr.genre
        Game.all.push(this)
    }
    renderGame() {
        return `
        <div data-id=${this.id}>
          <img src=${this.image_url} height="200" width="250">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
          <p>${this.genre.name}</p>
          <button data-id=${this.id}>edit</button>
        </div>
        <br><br>`;
    }
}

Game.all = [];