var client = require('../Api/HTTPClient')

var UserService = {
  parseAccount: function(response) {
    if (!response) return null;

    var data = {};
    data.token = response.token;
    data.userProps = {
      id: response.id,
      locations: []
      // TODO: first name, etc?
    };
    return data;
  },

  accountCallback: function(callback) {
    return function(error, response) {
      var data = UserService.parseAccount(response);
      callback(error, data);
    };
  },

  signup: function(username, password, callback) {
    client.post("api/signup", {username: username, password: password}, UserService.accountCallback(callback));
  },

  login: function(username, password, callback) {
    client.post("api/login", {username: username, password: password}, UserService.accountCallback(callback));
  }
};

module.exports = UserService;