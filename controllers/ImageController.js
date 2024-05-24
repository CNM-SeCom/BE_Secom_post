const Image = require('../models/Image');

//upload image to database (file nhị phân)
exports.upload = async (req, res) => {
    try {
        const newImage = new Image(req.body);
        const savedImage = await newImage.save();
        res.status(200).json(savedImage);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//retrieve 1 image by object id
exports.findOne = (req, res) => {
    Image.find(req.params.id)
      .then((image) => {
        if (!image) {
          return res.status(404).send({ message: 'Image not found' });
        }
        res.status(200).json(image);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
  