const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllTreatments,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} = require("../controllers/treatmentController");

router.use(authMiddleware);

router.get("/", getAllTreatments);
router.get("/:id", getTreatmentById);
router.post("/", createTreatment);
router.put("/:id", updateTreatment);
router.delete("/:id", deleteTreatment);

module.exports = router;