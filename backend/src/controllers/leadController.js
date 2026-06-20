const supabase = require("../config/supabase");

exports.getAllLeads = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("leads")
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
      leads: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const leadId = req.params.id;

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      lead: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createLead = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      preferred_date,
      status,
    } = req.body;

    if (!name || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone and Service are required",
      });
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          phone,
          email,
          service,
          preferred_date,
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
      message: "Lead created successfully",
      lead: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const leadId = req.params.id;

    const {
      name,
      phone,
      email,
      service,
      preferred_date,
      status,
    } = req.body;

    const { data, error } = await supabase
      .from("leads")
      .update({
        name,
        phone,
        email,
        service,
        preferred_date,
        status,
      })
      .eq("id", leadId)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const leadId = req.params.id;

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", leadId);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};