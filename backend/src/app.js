const express = require("express");
const cors = require("cors");
const supabase = require("./config/supabase");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const leadRoutes = require("./routes/leadRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const treatmentLogRoutes = require("./routes/treatmentLogRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/treatmentlogs", treatmentLogRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareFlow API Running Successfully",
  });
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = app;