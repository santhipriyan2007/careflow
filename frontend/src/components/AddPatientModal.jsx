import { useEffect, useState } from "react";

function AddPatientModal({
  isOpen,
  onClose,
  onSubmit,
  patient = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    doctor_id: 1,
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    address: "",
    visit_frequency: 30,
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        doctor_id: patient.doctor_id || 1,
        name: patient.name || "",
        email: patient.email || "",
        phone: patient.phone || "",
        gender: patient.gender || "Male",
        address: patient.address || "",
        visit_frequency:
          patient.visit_frequency || 30,
      });
    } else {
      setFormData({
        doctor_id: 1,
        name: "",
        email: "",
        phone: "",
        gender: "Male",
        address: "",
        visit_frequency: 30,
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    if (!isEditing) {
      setFormData({
        doctor_id: 1,
        name: "",
        email: "",
        phone: "",
        gender: "Male",
        address: "",
        visit_frequency: 30,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditing
              ? "Edit Patient"
              : "Add Patient"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="name"
            placeholder="Patient Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            name="visit_frequency"
            placeholder="Visit Frequency"
            value={formData.visit_frequency}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {isEditing
              ? "Update Patient"
              : "Create Patient"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;