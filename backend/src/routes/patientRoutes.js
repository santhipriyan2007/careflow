const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
} = require("../controllers/patientController");

const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

module.exports = router;