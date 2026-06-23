import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AddTreatmentModal from "../../components/AddTreatmentModal";

import {
  getTreatments,
  createTreatment,
  updateTreatment,
  deleteTreatment,
} from "../../services/treatmentService";

function TreatmentsPage() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingTreatment, setEditingTreatment] =
    useState(null);
  const [selectedTreatment, setSelectedTreatment] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      setLoading(true);

      const response = await getTreatments();

      setTreatments(
        response.treatments || []
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load treatments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTreatment = async (
  treatmentData
) => {
  try {
    await createTreatment(
      treatmentData
    );

    await fetchTreatments();

    toast.success(
      "Treatment created successfully"
    );

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to create treatment"
    );
  }
  };

  const handleUpdateTreatment = async (
  treatmentData
) => {
  try {
    await updateTreatment(
      editingTreatment.id,
      treatmentData
    );

    await fetchTreatments();

    toast.success(
      "Treatment updated successfully"
    );

    setEditingTreatment(null);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to update treatment"
    );
  }
  };

  const handleDeleteTreatment = async (
  id
  ) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this treatment?"
  );

  if (!confirmed) return;

  try {
    await deleteTreatment(id);

    await fetchTreatments();

    toast.success(
      "Treatment deleted successfully"
    );
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to delete treatment"
    );
  }
  };

  const filteredTreatments =
    treatments.filter(
      (treatment) =>
        treatment.treatment_name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        treatment.status
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        String(
          treatment.patient_id
        ).includes(searchTerm)
    );


  const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-700";

    case "completed":
      return "bg-blue-100 text-blue-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    case "pending":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
  };




  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-8">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">
              Treatments
            </h1>

            <button
              onClick={() => {
                setEditingTreatment(
                  null
                );
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Treatment
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <input
              type="text"
              placeholder="Search treatments..."
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
              Loading treatments...
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
                      Patient ID
                    </th>

                    <th className="text-left px-6 py-4">
                      Treatment
                    </th>

                    <th className="text-left px-6 py-4">
                      Cost
                    </th>

                    <th className="text-left px-6 py-4">
                      Start Date
                    </th>

                    <th className="text-left px-6 py-4">
                      Status
                    </th>

                    <th className="text-left px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTreatments.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-8 text-gray-500"
                      >
                        No treatments found
                      </td>
                    </tr>
                  ) : (
                    filteredTreatments.map(
                      (treatment) => (
                        <tr
                          key={
                            treatment.id
                          }
                          className="border-t"
                        >
                          <td className="px-6 py-4">
                            {
                              treatment.patient_id
                            }
                          </td>

                          <td className="px-6 py-4">
                            {
                              treatment.treatment_name
                            }
                          </td>

                          <td className="px-6 py-4">
                            ₹
                            {
                              treatment.total_cost
                            }
                          </td>

                          <td className="px-6 py-4">
                            {
                              treatment.start_date
                            }
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                treatment.status
                              )}`}
                            >
                              {treatment.status?.charAt(0).toUpperCase() +
                                treatment.status?.slice(1).toLowerCase()}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex gap-4">

                              <button
                                onClick={() =>
                                  setSelectedTreatment(
                                    treatment
                                  )
                                }
                              >
                                👁
                              </button>

                              <button
                                onClick={() => {
                                  setEditingTreatment(
                                    treatment
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
                                  handleDeleteTreatment(
                                    treatment.id
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

          <AddTreatmentModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditingTreatment(
                null
              );
            }}
            onSubmit={
              editingTreatment
                ? handleUpdateTreatment
                : handleCreateTreatment
            }
            treatment={
              editingTreatment
            }
            isEditing={
              !!editingTreatment
            }
          />

          {selectedTreatment && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    Treatment Details
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedTreatment(
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
                      Patient ID:
                    </strong>{" "}
                    {
                      selectedTreatment.patient_id
                    }
                  </p>

                  <p>
                    <strong>
                      Treatment:
                    </strong>{" "}
                    {
                      selectedTreatment.treatment_name
                    }
                  </p>

                  <p>
                    <strong>
                      Total Cost:
                    </strong>{" "}
                    ₹
                    {
                      selectedTreatment.total_cost
                    }
                  </p>

                  <p>
                    <strong>
                      Start Date:
                    </strong>{" "}
                    {
                      selectedTreatment.start_date
                    }
                  </p>

                  <p>
                    <strong>
                      Expected End:
                    </strong>{" "}
                    {
                      selectedTreatment.expected_end_date
                    }
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>{" "}
                    {
                      selectedTreatment.status
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

export default TreatmentsPage;