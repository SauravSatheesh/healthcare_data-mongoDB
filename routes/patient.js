const express = require("express");
const patientController = require("../controllers/patient");
const auth = require("../middleware/auth");
const router = express.Router();


router.get('/',auth,patientController.getPatients);
router.post('/create',auth,patientController.addPatient);
router.delete('/:id',auth,patientController.deletePatient);
router.put('/update/:id',auth,patientController.updatePatient);

module.exports = router;