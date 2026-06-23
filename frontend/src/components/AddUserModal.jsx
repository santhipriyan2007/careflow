import { useEffect, useState } from "react";

function AddUserModal({
  isOpen,
  onClose,
  onSubmit,
  user = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "receptionist",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "receptionist",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "receptionist",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = isEditing
      ? {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }
      : formData;

    onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {isEditing
              ? "Edit User"
              : "Add User"}
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          {!isEditing && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          )}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="admin">
              Admin
            </option>

            <option value="receptionist">
              Receptionist
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {isEditing
              ? "Update User"
              : "Create User"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddUserModal;