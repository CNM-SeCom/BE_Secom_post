const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router.post('/create', PostController.create);
router.get('/findAll', PostController.findAll);
//like
router.post('/like', PostController.like);
//delete
router.post('/delete', PostController.delete);

module.exports = router;