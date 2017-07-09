$("button").on("click", function(e) {
  e.preventDefault();
  AuthController.login();
});

var LoginController = {
  errors: [],
  getUser() {
    return document.getElementById("username").value;
  },
  getPassword() {
    return document.getElementById("password").value;
  },
  validateEntry(user = this.getUser(), password = this.getPassword()) {
    if (!(user && password)) {
      return this.failure("You must enter a username and a password");
    }
    return true;
  },
  displayMessage(title, msg) {
    console.log(title.toUpperCase() + " - " + msg);
  },
  failure(err) {
    this.errors.push(err);
    this.displayMessage("Error", err);
  }

};

var AuthController = {
  errors: [],
  login() {
    var user = this.getUser();
    var password = this.getPassword();
    if (this.validateEntry(user, password)) {
      this.server("/login", {
        user: user,
        password: password
      })
      .then(this.accepted.bind(this))
      .fail(this.rejected.bind(this));
    }
  },
  server(url, data) {
    return $.post({
      url: url,
      data: data
    });
  },
  accepted(username) {
    this.displayMessage("Success", "Authenticated as " + username);
  },
  rejected(err) {
    this.failure("Auth Failed: " + err.responseText);
  }
}

Object.setPrototypeOf(AuthController, LoginController);