import { useEffect, useState } from "react";

function AddAppointmentModal({
  isOpen,
  onClose,
  onSubmit,
  appointment = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    status: "Scheduled",
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        patient_id: appointment.patient_id || "",
        doctor_id: appointment.doctor_id || "",
        appointment_date:
          appointment.appointment_date || "",
        appointment_time:
          appointment.appointment_time || "",
        status:
          appointment.status || "Scheduled",
      });
    } else {
      setFormData({
        patient_id: "",
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        status: "Scheduled",
      });
    }
  }, [appointment]);

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
      doctor_id: Number(formData.doctor_id),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {isEditing
              ? "Edit Appointment"
              : "Add Appointment"}
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
            name="doctor_id"
            placeholder="Doctor ID"
            value={formData.doctor_id}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="time"
            name="appointment_time"
            value={formData.appointment_time}
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
            <option>Scheduled</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {isEditing
              ? "Update Appointment"
              : "Create Appointment"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddAppointmentModal;