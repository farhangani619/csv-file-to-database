const { json } = require('express')
const express = require('express')
const multer = require('multer')
const path = require('path')
const router = new express.Router()
const insertCsvToDB = require('../middleware/insertCsvToDB')
const filelocation = path.join(__dirname, '../files')
const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
      cb(null, true);
    } else {
      cb("Please upload only csv file.", false);
    }
  };
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, filelocation)
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}-fg-${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage ,fileFilter : csvFilter })
router.post('/fileupload',upload.single('file'),insertCsvToDB,(error, req, res, next) => {
   
    res.status(400).send({ error: error.message })
})


module.exports= router