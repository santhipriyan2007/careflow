import { useEffect, useState } from "react";

function AddTreatmentLogModal({
  isOpen,
  onClose,
  onSubmit,
  log = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    patient_id: "",
    visit_number: "",
    notes: "",
    progress_percent: "",
  });

  useEffect(() => {
    if (log) {
      setFormData({
        patient_id: log.patient_id || "",
        visit_number: log.visit_number || "",
        notes: log.notes || "",
        progress_percent:
          log.progress_percent || "",
      });
    } else {
      setFormData({
        patient_id: "",
        visit_number: "",
        notes: "",
        progress_percent: "",
      });
    }
  }, [log]);

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
      visit_number: Number(formData.visit_number),
      progress_percent: Number(
        formData.progress_percent
      ),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {isEditing
              ? "Edit Treatment Log"
              : "Add Treatment Log"}
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
            type="number"
            name="visit_number"
            placeholder="Visit Number"
            value={formData.visit_number}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <textarea
            name="notes"
            placeholder="Treatment Notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="number"
            min="0"
            max="100"
            name="progress_percent"
            placeholder="Progress Percentage"
            value={formData.progress_percent}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {isEditing
              ? "Update Treatment Log"
              : "Create Treatment Log"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddTreatmentLogModal;