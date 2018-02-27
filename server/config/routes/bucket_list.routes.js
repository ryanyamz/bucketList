const bucket_listController = require('../../controllers/bucket_lists');
const router = require('express').Router();

module.exports = router
  .get('/', bucket_listController.index)
  .post('/', bucket_listController.create);
