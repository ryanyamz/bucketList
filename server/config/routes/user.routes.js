const userController = require('../../controllers/users');
const router = require('express').Router();

module.exports = router
  .get('/', userController.index)
  .post('/login', userController.login)
  .delete('/logout', userController.logout)
  .get('/:id', userController.show);
