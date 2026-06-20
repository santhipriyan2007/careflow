const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

router.use(authMiddleware);

router.get("/", getAllLeads);
router.get("/:id", getLeadById);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;