const express = require("express");
const clientController = require("../controllers/client");
const auth=require("../middleware/auth");

const router = express.Router();


router.get('/',auth,clientController.getClient);
router.post('/register',clientController.addClient);
router.post('/login',clientController.loginClient);

module.exports= router;