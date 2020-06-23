
class RequeteTime {
  constructor() {
    this.url = "http://127.0.0.1:3000";
  }

  getProjectTime(id_project){
    var settings = {
      "url": this.url + "/project/" + id_project + "/times",
      "method": "GET"
    };
    $.ajax(settings).done((response) => {
      this.showText(response, "all-times");
    });
  }

  getProjectUserTime(id_user, id_project){
    var settings = {
      "url": this.url + "/project/" + id_project + "/" + id_user + "/times",
      "method": "GET"
    };
    $.ajax(settings).done((response) => {
      this.showText(response, "my-times");
    });
  }

  getOneTimes(id_group){
    var settings = {
      "url": this.url + "/groups/" + id_group,
      "method": "GET"
    };
    $.ajax(settings).done((response) => {
      this.showText(response, "one-time");
    });
  }

  startTimes(id_times){
    var settings = {
      "url": this.url + "/" + id_times + "/start",
      "method": "PUT"
    };
    $.ajax(settings).done((response) => {
      this.showText(response, "all-times");
    });
  }

  deleteOneTimes(id_times, id_project){
    var settings = {
      "url": this.url + "/" + id_times + "/update",
      "method": "DELETE"
    };
    $.ajax(settings).done((response) => {
      this.getProjectTime(id_project);
    });
  }

  showText(response, partie){
    let textBlock = document.getElementById(partie);
    textBlock.innerHTML = "";

    for(let i = 0; i < response.length; i++) {
      //title :
      let block = document.createElement("div");
      block.className = "col-md-4";
      textBlock.appendChild(block);

      let card = document.createElement("div");
      card.className = "card mb-4 shadow-sm";
      block.appendChild(card);

      let cardBody = document.createElement("div");
      cardBody.className = "card-body";
      card.appendChild(cardBody);

      let title = document.createElement("h2");
      title.className = "card-Text";
      let titleText = document.createTextNode(`${response[i].title}`);
      title.appendChild(titleText); // <h2>Texte...</h2>
      cardBody.appendChild(title);
      //content :
        //Lien :
      let line = document.createElement("p");
      line.className = "card-Text";
      line.innerHTML = `Lien du son : <a href='${response[i].lien}'>${response[i].lien}</a>`;
      cardBody.appendChild(line);

      //date et nom :
      var d = new Date(`${response[i].date}`);
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
      let name = document.createElement("p");
      name.className = "card-Text";
      let nameText = document.createTextNode(`Suggéré par ${response[i].name}
                                              le ${datestring}`)
      name.appendChild(nameText); // <p>Texte...</p>
      cardBody.appendChild(name);

      // partie bouton :
      let boutons = document.createElement("div");
      boutons.className = "d-flex justify-content-between align-items-center";
      cardBody.appendChild(boutons);

      let boutonsGroup = document.createElement("div");
      boutonsGroup.className = "btn-group";
      boutons.appendChild(boutonsGroup);
      // vote plus
      let boutonUp = document.createElement("button");
      boutonUp.className = "btn btn-sm btn-outline-success";
      boutonUp.innerHTML = `${response[i].vote_plus} <i class="far fa-thumbs-up fa-2x"></i>`;
      boutonsGroup.appendChild(boutonUp);
      boutonUp.addEventListener("click", () => {
        this.voteSong(response[i]._id, true);
      });
      //vote moins
      let boutonDown = document.createElement("button");
      boutonDown.className = "btn btn-sm btn-outline-warning";
      boutonDown.innerHTML = `${response[i].vote_moins} <i class="far fa-thumbs-down fa-2x"></i>`;
      boutonsGroup.appendChild(boutonDown);
      boutonDown.addEventListener("click", () => {
        this.voteSong(response[i]._id, false);
      });
      // suppression
      let boutonSuppr = document.createElement("button");
      boutonSuppr.className = "btn btn-sm btn-danger";
      boutonSuppr.innerHTML = '<i class="fas fa-trash-alt fa-2x"></i>';
      boutonsGroup.appendChild(boutonSuppr);
      boutonSuppr.addEventListener("click", () => {
        this.deleteSong(response[i]._id);
      });
    }
  }

  addOneTime(project_id){
    var data = {
      name: document.getElementById("champsName").value,
      project_id: project_id,
      user_id: document.getElementById("champsUser").value,
      description: document.getElementById("champsDescription").value
    };
    // Config la route d'envoie des infos :
    var settings = {
      url: this.url + "/project/" + project_id + "/add_time",
      method: "POST",
      ContentType: "application/json",
      data: data
    };
    // Envoie la requete :
    $.ajax(settings).done((response) => {
      console.log(response);
      this.getProjectTime(id_project);
    });
    //Reinitialise les valeurs a 0 :
    document.getElementById("champsName").value = "";
    document.getElementById("champsUser").value = "";
    document.getElementById("champsDescription").value = "";
  }
}

var requete = new RequeteTime();
// let songButton = document.getElementById('getSongButton');
// songButton.addEventListener('click', function () {requete.getSong()});

let addSongButton = document.getElementById('addSongButton');
addSongButton.addEventListener('click', function () {requete.addSong()});

window.onload = requete.getSong();
window.onload = requete.getTopSong();
