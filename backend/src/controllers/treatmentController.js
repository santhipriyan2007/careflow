const supabase = require("../config/supabase");

exports.getAllTreatments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("treatments")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      treatments: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getTreatmentById = async (req, res) => {
  try {
    const treatmentId = req.params.id;

    const { data, error } = await supabase
      .from("treatments")
      .select("*")
      .eq("id", treatmentId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Treatment not found",
      });
    }

    res.status(200).json({
      success: true,
      treatment: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createTreatment = async (req, res) => {
  try {
    const {
      patient_id,
      treatment_name,
      total_cost,
      start_date,
      expected_end_date,
      status,
    } = req.body;

    if (
      !patient_id ||
      !treatment_name ||
      !total_cost ||
      !start_date
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const { data, error } = await supabase
      .from("treatments")
      .insert([
        {
          patient_id,
          treatment_name,
          total_cost,
          start_date,
          expected_end_date,
          status,
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
      message: "Treatment created successfully",
      treatment: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateTreatment = async (req, res) => {
  try {
    const treatmentId = req.params.id;

    const {
      patient_id,
      treatment_name,
      total_cost,
      start_date,
      expected_end_date,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("treatments")
      .update({
        patient_id,
        treatment_name,
        total_cost,
        start_date,
        expected_end_date,
        status,
      })
      .eq("id", treatmentId)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Treatment updated successfully",
      treatment: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteTreatment = async (req, res) => {
  try {
    const treatmentId = req.params.id;

    const { error } = await supabase
      .from("treatments")
      .delete()
      .eq("id", treatmentId);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Treatment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};