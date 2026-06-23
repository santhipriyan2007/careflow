import { useEffect, useState } from "react";

function AddLeadModal({
  isOpen,
  onClose,
  onSubmit,
  lead = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    preferred_date: "",
    status: "New",
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || "",
        phone: lead.phone || "",
        email: lead.email || "",
        service: lead.service || "",
        preferred_date:
          lead.preferred_date || "",
        status: lead.status || "New",
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        preferred_date: "",
        status: "New",
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {isEditing
              ? "Edit Lead"
              : "Add Lead"}
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
            placeholder="Lead Name"
            value={formData.name}
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

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="service"
            placeholder="Service"
            value={formData.service}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="date"
            name="preferred_date"
            value={formData.preferred_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Converted</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {isEditing
              ? "Update Lead"
              : "Create Lead"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddLeadModal;