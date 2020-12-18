class Game {
    
    constructor(id, gameAttr) {
        this.id = id
        this.title = gameAttr.title
        this.description = gameAttr.description
        this.release_date = gameAttr.release_date
        this.image_url = gameAttr.image_url
        this.genre = gameAttr.genre
        Game.all.push(this)
    }
    renderGame() {
        return `
        <div class="card" style="width: 18rem;">
            <div data-id=${this.id}>
                <img class="card-img-top" src=${this.image_url} alt="Card image cap">
                <h3>${this.title}</h3>
                <div class="card-body">
                    <p><strong>${this.genre.name}</strong></p>
                    <p>Date of release ${this.release_date}</p>
                    <p>${this.description}</p>
                    <button data-id=${this.id}>edit</button>
                </div>
            </div>
        </div>
        <br><br>`;
    }
}

Game.all = [];