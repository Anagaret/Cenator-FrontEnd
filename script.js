let songButton = document.getElementById('getSongButton');
songButton.addEventListener('click', getSong)

function getSong(){
  var settings = {
    "url": "http:/127.0.0.1:3000/songs",
    "method": "GET"
  };
  $.ajax(settings).done(function (response) {
    showText(response);
  });
}

function showText(response){
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
    let lineText = document.createTextNode(`Lien du son : ${response[i].lien}`)
    line.appendChild(lineText); // <p>Texte...</p>
    textBlock.appendChild(line);
      //vote :
    let vote = document.createElement("p");
    let voteText = document.createTextNode(`vote + : ${response[i].vote_plus},
                                            - : ${response[i].vote_moins}`)
    vote.appendChild(voteText); // <p>Texte...</p>
    textBlock.appendChild(vote);
      //nom de la personne
    let name = document.createElement("p");
    let nameText = document.createTextNode(`Suggéré par ${response[i].name}
                                            le ${response[i].created_at}`)
    name.appendChild(nameText); // <p>Texte...</p>
    textBlock.appendChild(name);
  }
}

// POST REQUEST

// var data = {
//   title: document.getElementById("champsTitre").value,
//   content: "azertyuiop"
// };
//
// var settings = {
//   url: "http://127.0.0.1:3000/posts",
//   method: "POST",
//   ContentType: "application/json",
//   data: data
// };
//
// $.ajax(settings).done(function (response) {
//   console.log(response);
// });
