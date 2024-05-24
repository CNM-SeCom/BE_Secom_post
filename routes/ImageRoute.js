const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/ImageController');

router.post('/upload', ImageController.upload);
router.get('/findOne', ImageController.findOne);

module.exports = router;