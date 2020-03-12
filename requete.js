
class Requete {
  constructor() {
    this.url = "http://127.0.0.1:3000";
  }

  getSong(){
    var settings = {
      "url": this.url + "/songs",
      "method": "GET"
    };
    $.ajax(settings).done((response) => {
      this.showText(response);
    });
  }

  showText(response){
    let textBlock = document.getElementById("textBlock");
    textBlock.innerHTML = "";

    for(let i = 0; i < response.length; i++) {
      //title :
      let title = document.createElement("h2");
      let titleText = document.createTextNode(`${response[i].title}`);
      title.appendChild(titleText); // <h2>Texte...</h2>
      textBlock.appendChild(title);

      //content :
        //Lien :
      let line = document.createElement("p");
      line.innerHTML = `Lien du son : <a href='${response[i].lien}'>${response[i].lien}</a>`;
      // $( "div.demo-container" )   .html( "<p>All new content. <em>You bet!</em></p>" );
      // let lineText = document.createTextNode(`Lien du son : <a>${response[i].lien}</a>`)
      //
      // line.appendChild(lineText); // <p>Texte...</p>
      textBlock.appendChild(line);
        //vote :
      let vote = document.createElement("p");
      let voteText = document.createTextNode(`vote + : ${response[i].vote_plus},
                                              - : ${response[i].vote_moins}`)
      vote.appendChild(voteText); // <p>Texte...</p>
      textBlock.appendChild(vote);
        //nom de la personne :
      var d = new Date(`${response[i].Date}`);
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
      let name = document.createElement("p");
      let nameText = document.createTextNode(`Suggéré par ${response[i].name}
                                              le ${datestring}`)
      name.appendChild(nameText); // <p>Texte...</p>
      textBlock.appendChild(name);

      let boutonSuppr = document.createElement("button");
      var boutonSupprText = document.createTextNode("supprimer");
      boutonSuppr.appendChild(boutonSupprText);
      textBlock.appendChild(boutonSuppr);
      boutonSuppr.addEventListener("click", () => {
        this.deleteSong(response[i]._id);
      });

      let boutonUp = document.createElement("button");
      var boutonUpText = document.createTextNode("+++++++");
      boutonUp.appendChild(boutonUpText);
      textBlock.appendChild(boutonUp);
      boutonUp.addEventListener("click", () => {
        this.voteSong(response[i]._id, true);
      });

      let boutonDown = document.createElement("button");
      var boutonDownText = document.createTextNode("------");
      boutonDown.appendChild(boutonDownText);
      textBlock.appendChild(boutonDown);
      boutonDown.addEventListener("click", () => {
        this.voteSong(response[i]._id, false);
      });
    }
  }

  addSong(){
    // Verifie si c'est une music de youtube :
    let lien = document.getElementById("champsLien").value;
    if (! lien.includes("http(?:s?)://(?:www.)?youtu(?:be.com/watch?v=|.be/)([\w-_])(&(amp;)?‌​[\w?‌​=])?")) {
      alert("Le lien n'est pas bon sale fdp");
      return;
    }
    // Prends les infos pour créer un son :
    var data = {
      title: document.getElementById("champsTitre").value,
      name: document.getElementById("champsNom").value,
      lien: document.getElementById("champsLien").value
    };
    // Config la route d'envoie des infos :
    var settings = {
      url: this.url + "/songs",
      method: "POST",
      ContentType: "application/json",
      data: data
    };
    // Envoie la requete :
    $.ajax(settings).done((response) => {
      console.log(response);
      this.getSong();
    });
    //Reinitialise les valeurs a 0 :
    document.getElementById("champsTitre").value = "";
    document.getElementById("champsNom").value = "";
    document.getElementById("champsLien").value = "";
  }

  deleteSong(id){
    // Config la route d'envoie des infos :
    var settings = {
      url: this.url + "/songs/" + id,
      method: "DELETE",
      ContentType: "application/json"
    };
    // Envoie la requete :
    $.ajax(settings).done((response) => {
      console.log(response);
      this.getSong();
    });
  }

  voteSong(id, vote){
    // Config la route d'envoie des infos :
    var settings = {
      url: this.url + "/songs/" + id + "/" + (vote?"plus":"moins"),
      method: "PUT",
      ContentType: "application/json"
    };
    // Envoie la requete :
    $.ajax(settings).done((response) => {
      console.log(response);
      this.getSong();
    });
  }
}

var requete = new Requete();
let songButton = document.getElementById('getSongButton');
songButton.addEventListener('click', function () {requete.getSong()});

let addSongButton = document.getElementById('addSongButton');
addSongButton.addEventListener('click', function () {requete.addSong()});
