import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AddAppointmentModal from "../../components/AddAppointmentModal";

import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../services/appointmentService";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const response = await getAppointments();

      setAppointments(
        response.appointments || []
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAppointment = async (
  appointmentData
) => {
  try {
    await createAppointment(
      appointmentData
    );

    await fetchAppointments();

    toast.success(
      "Appointment created successfully"
    );

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to create appointment"
    );
  }
  };

  const handleUpdateAppointment = async (
  appointmentData
) => {
  try {
    await updateAppointment(
      editingAppointment.id,
      appointmentData
    );

    await fetchAppointments();

    toast.success(
      "Appointment updated successfully"
    );

    setEditingAppointment(null);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to update appointment"
    );
  }
  };

  const handleDeleteAppointment = async (
  id
) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this appointment?"
  );

  if (!confirmed) return;

  try {
    await deleteAppointment(id);

    await fetchAppointments();

    toast.success(
      "Appointment deleted successfully"
    );
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to delete appointment"
    );
  }
  };

  const filteredAppointments =
    appointments.filter(
      (appointment) =>
        String(
          appointment.patient_id
        ).includes(searchTerm) ||
        String(
          appointment.doctor_id
        ).includes(searchTerm) ||
        appointment.status
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "scheduled":
      return "bg-yellow-100 text-yellow-700";

    case "completed":
      return "bg-green-100 text-green-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-blue-100 text-blue-700";
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
              Appointments
            </h1>

            <button
              onClick={() => {
                setEditingAppointment(
                  null
                );
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Appointment
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <input
              type="text"
              placeholder="Search appointments..."
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
              Loading appointments...
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
                      Doctor ID
                    </th>

                    <th className="text-left px-6 py-4">
                      Date
                    </th>

                    <th className="text-left px-6 py-4">
                      Time
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
                  {filteredAppointments.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-8 text-gray-500"
                      >
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map(
                      (
                        appointment
                      ) => (
                        <tr
                          key={
                            appointment.id
                          }
                          className="border-t"
                        >
                          <td className="px-6 py-4">
                            {
                              appointment.patient_id
                            }
                          </td>

                          <td className="px-6 py-4">
                            {
                              appointment.doctor_id
                            }
                          </td>

                          <td className="px-6 py-4">
                            {
                              appointment.appointment_date
                            }
                          </td>

                          <td className="px-6 py-4">
                            {
                              appointment.appointment_time
                            }
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                appointment.status
                              )}`}
                            >
                              {appointment.status}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex gap-4">
                              <button
                                onClick={() =>
                                  setSelectedAppointment(
                                    appointment
                                  )
                                }
                              >
                                👁
                              </button>

                              <button
                                onClick={() => {
                                  setEditingAppointment(
                                    appointment
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
                                  handleDeleteAppointment(
                                    appointment.id
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

          <AddAppointmentModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditingAppointment(
                null
              );
            }}
            onSubmit={
              editingAppointment
                ? handleUpdateAppointment
                : handleCreateAppointment
            }
            appointment={
              editingAppointment
            }
            isEditing={
              !!editingAppointment
            }
          />

          {selectedAppointment && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    Appointment Details
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedAppointment(
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
                      selectedAppointment.patient_id
                    }
                  </p>

                  <p>
                    <strong>
                      Doctor ID:
                    </strong>{" "}
                    {
                      selectedAppointment.doctor_id
                    }
                  </p>

                  <p>
                    <strong>
                      Date:
                    </strong>{" "}
                    {
                      selectedAppointment.appointment_date
                    }
                  </p>

                  <p>
                    <strong>
                      Time:
                    </strong>{" "}
                    {
                      selectedAppointment.appointment_time
                    }
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>{" "}
                    {
                      selectedAppointment.status
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

export default AppointmentsPage;