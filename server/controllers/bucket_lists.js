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
    console.log(request.body)
    Bucket_List.create(request.body)
      .then(bucket_list => {
        console.log('bucket_list', bucket_list);
       return User.findById(bucket_list.user)
          .then(user => {

            user.bucket_lists.push(bucket_list);
           return user.save()
            .then(() => {

              if (bucket_list.tagged_user) {
               return User.findById(bucket_list.tagged_user)
                  .then(tagged_user => {
                    tagged_user.bucket_lists.push(bucket_list);
                    return tagged_user.save()
                      .then(() => response.json(bucket_list))
                  })

              } else {
                response.json(bucket_list);
              }
            })
          })
      })
      .catch(error => {
        console.log('error in bucket_list.js create');
        response.status(422).json(
          Object.keys(error.errors).map(key => error.errors[key].message)
        );
      });
  },

  getUserList(request, response) {
    console.log(request.params);
    // Bucket_List.find({ user: request.params.user_id})
    Bucket_List.find({$or:[{ user: request.params.user_id }, { tagged_user: request.params.user_id}]})
      .populate('user')
      .then(bucket_list => response.json(bucket_list))
      .catch(console.log);
  },

  updateList(request, response) {
    Bucket_List.findOne({_id: request.params.id})
      .then(bucket_list => {
        bucket_list.checked = !bucket_list.checked;
        bucket_list.save()
          .then(bucket_list => response.json(bucket_list))

      })
      .catch(error => {
        console.log('error updating list');
        response.status(422).json(
          Object.keys(error.errors).map(key => error.errors[key].message)
        )
      });
  }

}
