const supabase = require("../config/supabase");

exports.getAllPatients = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      patients: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;

    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", patientId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      patient: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const {
      doctor_id,
      name,
      email,
      phone,
      gender,
      address,
      visit_frequency,
    } = req.body;

    // Validation
    if (!doctor_id || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID, Name and Phone are required",
      });
    }

    const { data, error } = await supabase
      .from("patients")
      .insert([
        {
          doctor_id,
          name,
          email,
          phone,
          gender,
          address,
          visit_frequency,
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
      message: "Patient created successfully",
      patient: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    const {
      doctor_id,
      name,
      email,
      phone,
      gender,
      address,
      visit_frequency,
    } = req.body;

    const { data, error } = await supabase
      .from("patients")
      .update({
        doctor_id,
        name,
        email,
        phone,
        gender,
        address,
        visit_frequency,
      })
      .eq("id", patientId)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      patient: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    const { error } = await supabase
      .from("patients")
      .delete()
      .eq("id", patientId);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};