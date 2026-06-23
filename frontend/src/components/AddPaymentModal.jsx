import { useEffect, useState } from "react";

function AddPaymentModal({
  isOpen,
  onClose,
  onSubmit,
  payment = null,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    treatment_id: "",
    amount: "",
    payment_date: "",
    payment_method: "Cash",
  });

  useEffect(() => {
    if (payment) {
      setFormData({
        treatment_id:
          payment.treatment_id || "",
        amount: payment.amount || "",
        payment_date:
          payment.payment_date || "",
        payment_method:
          payment.payment_method || "Cash",
      });
    } else {
      setFormData({
        treatment_id: "",
        amount: "",
        payment_date: "",
        payment_method: "Cash",
      });
    }
  }, [payment]);

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
      treatment_id: Number(
        formData.treatment_id
      ),
      amount: Number(formData.amount),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {isEditing
              ? "Edit Payment"
              : "Add Payment"}
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
            name="treatment_id"
            placeholder="Treatment ID"
            value={formData.treatment_id}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {isEditing
              ? "Update Payment"
              : "Create Payment"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddPaymentModal;