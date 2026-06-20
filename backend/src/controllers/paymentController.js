const supabase = require("../config/supabase");

exports.getAllPayments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("payment_date", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      count: data.length,
      payments: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("id", paymentId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      payment: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const {
      treatment_id,
      amount,
      payment_date,
      payment_method,
    } = req.body;

    if (!treatment_id || !amount || !payment_date) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const { data, error } = await supabase
      .from("payments")
      .insert([
        {
          treatment_id,
          amount,
          payment_date,
          payment_method,
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
      message: "Payment created successfully",
      payment: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const {
      treatment_id,
      amount,
      payment_date,
      payment_method,
    } = req.body;

    const { data, error } = await supabase
      .from("payments")
      .update({
        treatment_id,
        amount,
        payment_date,
        payment_method,
      })
      .eq("id", paymentId)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment: data[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const { error } = await supabase
      .from("payments")
      .delete()
      .eq("id", paymentId);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};