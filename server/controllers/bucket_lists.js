const Bucket_List = require('mongoose').model('Bucket_List');
const User = require('mongoose').model('User');

module.exports = {
  index(request, response) {
    Bucket_List
      .find({})
      .populate('user')
      .then(bucket_lists => response.json(bucket_lists))
      .catch(error => console.log('error in bucket_list.js index', error));
  },
  create(request, response) {
    Bucket_List.create(request.body)
      .then(bucket_list => {
        User.findById(bucket_list.user)
          .then(user => {
            user.bucket_lists.push(bucket_list);

            user.save()
              .then(() => {
                console.log('inside create bucket_lists.js')
                response.json(bucket_list);
              });
          })
      })
      .catch(error => console.log('error in bucket_list.js create',error))
  },

  getUserList(request, response) {
    Bucket_List.find({ user: request.params.user_id })
      .populate('user')
      .then(bucket_list => response.json(bucket_list))
      .catch(console.log);
  }
}
