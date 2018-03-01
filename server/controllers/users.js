const User = require('mongoose').model('User');

module.exports = {
  index(request, response) {
    console.log('grabbing users');
    User.find({})
      .populate('bucket_lists')
      .then(users => {
        console.log('in index of users.js', users)
        response.json(users);
      })
      .catch(error => {
        response.status(422).json(error.message);
      })
  },

  show(request, response) {
    console.log('grabbing 1 user');
    User.findById(request.params.id) //make sure this (id) matches how you put it in the route
      .then(user => response.json(user))
      .catch(() => console.log('error in users.js show'));
  },

  login(request, response) {
    User.findOne({ name: request.body.name })
      .then(user => {
        if (!user) {
          User.create(request.body)
            .then(user => {
              console.log('new user saved');
              completeLogin(request, response, user);
            })
        }
        completeLogin(request, response, user);
        console.log('logged in user server side');
      })
      .catch(error => {
        console.log('server login error', error);
      });
  },

  logout(request, response) {
    console.log('logging out of server side');
    request.session.destroy();
    response.clearCookie('userID');

    response.json(true);
  }
};

function completeLogin(request, response, user) {
  request.session.user = user.toObject();
  response.cookie('userID', user._id.toString());
  response.json(user);
}
