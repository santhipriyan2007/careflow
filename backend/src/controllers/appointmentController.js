const supabase = require("../config/supabase");

exports.getAllAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      appointments: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", appointmentId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      status,
    } = req.body;

    if (
      !patient_id ||
      !doctor_id ||
      !appointment_date ||
      !appointment_time
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          patient_id,
          doctor_id,
          appointment_date,
          appointment_time,
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
      message: "Appointment created successfully",
      appointment: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const {
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("appointments")
      .update({
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status,
      })
      .eq("id", appointmentId)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", appointmentId);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};