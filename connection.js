class RequeteUser {
  constructor() {
    this.url = "http://127.0.0.1:3000";
  }

  getUser(){
    let settings = {
      "url" : this.url + "/user",
      "method": "GET"
    }
    $.ajax(settings).done((response) => {
      var uName = response.name;
    });
  }

  connection(){
    var data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
    let settings = {
      "url" : this.url + "/user/connect",
      "method": "POST",
      ContentType: "application/json",
      data: data
    };
    $.ajax(settings).done((response) => {
      console.log(response);
      if (response.good) {
        window.open("./index.html");
      }
    });
  }
}


var requeteUser = new RequeteUser();

let connectUser = document.getElementById('alphacast');
connectUser.addEventListener('click', function () {requeteUser.connection()});
