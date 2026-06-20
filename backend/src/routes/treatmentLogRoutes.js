const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllTreatmentLogs,
  getTreatmentLogById,
  createTreatmentLog,
  updateTreatmentLog,
  deleteTreatmentLog,
} = require("../controllers/treatmentLogController");

router.use(authMiddleware);

router.get("/", getAllTreatmentLogs);
router.get("/:id", getTreatmentLogById);
router.post("/", createTreatmentLog);
router.put("/:id", updateTreatmentLog);
router.delete("/:id", deleteTreatmentLog);

module.exports = router;