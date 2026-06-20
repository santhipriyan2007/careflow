const supabase = require("../config/supabase");

exports.getAllTreatmentLogs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("treatment_logs")
      .select("*")
      .order("visit_number", { ascending: true });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      logs: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getTreatmentLogById = async (req, res) => {
  try {
    const logId = req.params.id;

    const { data, error } = await supabase
      .from("treatment_logs")
      .select("*")
      .eq("id", logId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Treatment log not found",
      });
    }

    res.status(200).json({
      success: true,
      log: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createTreatmentLog = async (req, res) => {
  try {
    const {
      patient_id,
      visit_number,
      notes,
      progress_percent,
    } = req.body;

    if (
      !patient_id ||
      !visit_number ||
      progress_percent === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const { data, error } = await supabase
      .from("treatment_logs")
      .insert([
        {
          patient_id,
          visit_number,
          notes,
          progress_percent,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Treatment log created successfully",
      log: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateTreatmentLog = async (req, res) => {
  try {
    const logId = req.params.id;

    const {
      patient_id,
      visit_number,
      notes,
      progress_percent,
    } = req.body;

    const { data, error } = await supabase
      .from("treatment_logs")
      .update({
        patient_id,
        visit_number,
        notes,
        progress_percent,
      })
      .eq("id", logId)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Treatment log updated successfully",
      log: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteTreatmentLog = async (req, res) => {
  try {
    const logId = req.params.id;

    const { error } = await supabase
      .from("treatment_logs")
      .delete()
      .eq("id", logId);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Treatment log deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};