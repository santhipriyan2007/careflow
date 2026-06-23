const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id,name,email,role,created_at");

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id,name,email,role,created_at")
      .eq("id", req.params.id);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          role,
        },
      ])
      .select(
        "id,name,email,role,created_at"
      );

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const updateData = {
      name,
      email,
      role,
    };

    if (
      password &&
      password.trim() !== ""
    ) {
      updateData.password =
        await bcrypt.hash(password, 10);
    }

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", req.params.id)
      .select(
        "id,name,email,role,created_at"
      );

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Get user being deleted
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (userError) throw userError;

    // If deleting an admin, check how many admins exist
    if (user.role === "admin") {
      const { data: admins, error: adminError } = await supabase
        .from("users")
        .select("id")
        .eq("role", "admin");

      if (adminError) throw adminError;

      // Prevent deletion if this is the last admin
      if (admins.length === 1) {
        return res.status(403).json({
          success: false,
          message: "Cannot delete the last admin account",
        });
      }
    }

    // Delete user
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};