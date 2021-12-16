const express = require('express');
const router = express.Router();
const filebaseController = require('../controllers/filebase.controller');


router.get('/listBuckets', filebaseController.listBuckets);
router.post('/listObjects', filebaseController.listObjects);
router.post('/putObject', filebaseController.putObject);
router.post('/getObject', filebaseController.getObject);






module.exports = router;