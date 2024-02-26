const express = require('express')

const router = express.Router();

const {getAllProducts ,getAllProductstesting} =require("../Controllers/Products")

router.route('/').get(getAllProducts)
router.route('/testing').get(getAllProductstesting);

module.exports = router;
