const express = require('express');
const router  = express.Router();
const uploader = require('../configs/cloudinary');
const User = require('../models/User-model')

router.post('/upload', uploader.single("pic"), (req, res, next) => {

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }

    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.path });

    User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          pic: req.file.path,
        },
        { new: true }
      )
        .then(() => {})
        .catch((err) => next(err));

})
 
module.exports = router;