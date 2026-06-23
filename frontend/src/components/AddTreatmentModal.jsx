import { useEffect, useState } from "react";

function AddTreatmentModal({
  isOpen,
  onClose,
  onSubmit,
  treatment = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    patient_id: "",
    treatment_name: "",
    total_cost: "",
    start_date: "",
    expected_end_date: "",
    status: "Ongoing",
  });

  useEffect(() => {
    if (treatment) {
      setFormData({
        patient_id: treatment.patient_id || "",
        treatment_name:
          treatment.treatment_name || "",
        total_cost:
          treatment.total_cost || "",
        start_date:
          treatment.start_date || "",
        expected_end_date:
          treatment.expected_end_date || "",
        status:
          treatment.status || "Ongoing",
      });
    } else {
      setFormData({
        patient_id: "",
        treatment_name: "",
        total_cost: "",
        start_date: "",
        expected_end_date: "",
        status: "Ongoing",
      });
    }
  }, [treatment]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      patient_id: Number(formData.patient_id),
      total_cost: Number(formData.total_cost),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {isEditing
              ? "Edit Treatment"
              : "Add Treatment"}
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
            type="number"
            name="patient_id"
            placeholder="Patient ID"
            value={formData.patient_id}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            name="treatment_name"
            placeholder="Treatment Name"
            value={formData.treatment_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="number"
            name="total_cost"
            placeholder="Total Cost"
            value={formData.total_cost}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="date"
            name="expected_end_date"
            value={formData.expected_end_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option>Ongoing</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {isEditing
              ? "Update Treatment"
              : "Create Treatment"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddTreatmentModal;