import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AddPaymentModal from "../../components/AddPaymentModal";

import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../../services/paymentService";

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] =
    useState(null);
  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response = await getPayments();

      setPayments(response.payments || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async (
  paymentData
  ) => {
  try {
    await createPayment(paymentData);

    await fetchPayments();

    toast.success(
      "Payment recorded successfully"
    );

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to create payment"
    );
  }
  };

  const handleUpdatePayment = async (
  paymentData
  ) => {
  try {
    await updatePayment(
      editingPayment.id,
      paymentData
    );

    await fetchPayments();

    toast.success(
      "Payment updated successfully"
    );

    setEditingPayment(null);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to update payment"
    );
  }
  };

  const handleDeletePayment = async (
  id
  ) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this payment?"
  );

  if (!confirmed) return;

  try {
    await deletePayment(id);

    await fetchPayments();

    toast.success(
      "Payment deleted successfully"
    );
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to delete payment"
    );
  }
  };

  const filteredPayments =
    payments.filter(
      (payment) =>
        String(
          payment.treatment_id
        ).includes(searchTerm) ||
        String(payment.amount).includes(
          searchTerm
        ) ||
        payment.payment_method
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">
              Payments
            </h1>

            <button
              onClick={() => {
                setEditingPayment(null);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Payment
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {loading && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              Loading payments...
            </div>
          )}

          {error && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-[900px] w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4">
                      Treatment ID
                    </th>

                    <th className="text-left px-6 py-4">
                      Amount
                    </th>

                    <th className="text-left px-6 py-4">
                      Date
                    </th>

                    <th className="text-left px-6 py-4">
                      Method
                    </th>

                    <th className="text-left px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPayments.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-8 text-gray-500"
                      >
                        No payments found
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map(
                      (payment) => (
                        <tr
                          key={payment.id}
                          className="border-t"
                        >
                          <td className="px-6 py-4">
                            {
                              payment.treatment_id
                            }
                          </td>

                          <td className="px-6 py-4">
                            ₹
                            {payment.amount}
                          </td>

                          <td className="px-6 py-4">
                            {
                              payment.payment_date
                            }
                          </td>

                          <td className="px-6 py-4">
                            {
                              payment.payment_method
                            }
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex gap-4">

                              <button
                                onClick={() =>
                                  setSelectedPayment(
                                    payment
                                  )
                                }
                              >
                                👁
                              </button>

                              <button
                                onClick={() => {
                                  setEditingPayment(
                                    payment
                                  );
                                  setShowModal(
                                    true
                                  );
                                }}
                              >
                                ✏️
                              </button>

                              <button
                                onClick={() =>
                                  handleDeletePayment(
                                    payment.id
                                  )
                                }
                              >
                                🗑
                              </button>

                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}

          <AddPaymentModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditingPayment(null);
            }}
            onSubmit={
              editingPayment
                ? handleUpdatePayment
                : handleCreatePayment
            }
            payment={editingPayment}
            isEditing={!!editingPayment}
          />

          {selectedPayment && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    Payment Details
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedPayment(
                        null
                      )
                    }
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <p>
                    <strong>
                      Treatment ID:
                    </strong>{" "}
                    {
                      selectedPayment.treatment_id
                    }
                  </p>

                  <p>
                    <strong>
                      Amount:
                    </strong>{" "}
                    ₹
                    {
                      selectedPayment.amount
                    }
                  </p>

                  <p>
                    <strong>
                      Payment Date:
                    </strong>{" "}
                    {
                      selectedPayment.payment_date
                    }
                  </p>

                  <p>
                    <strong>
                      Method:
                    </strong>{" "}
                    {
                      selectedPayment.payment_method
                    }
                  </p>
                </div>

              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default PaymentsPage;