import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AddPatientModal from "../../components/AddPatientModal";

import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../../services/patientService";

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const response = await getPatients();

      setPatients(response.patients || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePatient = async (patientData) => {
  try {
    await createPatient(patientData);

    await fetchPatients();

    toast.success("Patient created successfully");

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to create patient"
    );
  }
  };

  const handleUpdatePatient = async (patientData) => {
  try {
    await updatePatient(
      editingPatient.id,
      patientData
    );

    await fetchPatients();

    toast.success("Patient updated successfully");

    setEditingPatient(null);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to update patient"
    );
  }
  };

  const handleDeletePatient = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this patient?"
  );

  if (!confirmed) return;

  try {
    await deletePatient(id);

    await fetchPatients();

    toast.success("Patient deleted successfully");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to delete patient"
    );
  }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      patient.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">
              Patients
            </h1>

            <button
              onClick={() => {
                setEditingPatient(null);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Patient
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              Loading patients...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-red-500">
              {error}
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-[900px] w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4">
                      Name
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4">
                      Gender
                    </th>

                    <th className="text-left px-6 py-4">
                      Visit Frequency
                    </th>

                    <th className="text-left px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-8 text-gray-500"
                      >
                        No patients found
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="border-t"
                      >
                        <td className="px-6 py-4">
                          {patient.name}
                        </td>

                        <td className="px-6 py-4">
                          {patient.email}
                        </td>

                        <td className="px-6 py-4">
                          {patient.phone}
                        </td>

                        <td className="px-6 py-4">
                          {patient.gender}
                        </td>

                        <td className="px-6 py-4">
                          {patient.visit_frequency}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-4">

                            <button
                              onClick={() =>
                                setSelectedPatient(patient)
                              }
                            >
                              👁
                            </button>

                            <button
                              onClick={() => {
                                setEditingPatient(
                                  patient
                                );
                                setShowModal(true);
                              }}
                            >
                              ✏️
                            </button>

                            <button
                              onClick={() =>
                                handleDeletePatient(
                                  patient.id
                                )
                              }
                            >
                              🗑
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Add / Edit Modal */}
          <AddPatientModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditingPatient(null);
            }}
            onSubmit={
              editingPatient
                ? handleUpdatePatient
                : handleCreatePatient
            }
            patient={editingPatient}
            isEditing={!!editingPatient}
          />

          {/* View Modal */}
          {selectedPatient && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    Patient Details
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedPatient(null)
                    }
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedPatient.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedPatient.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedPatient.phone}
                  </p>

                  <p>
                    <strong>Gender:</strong>{" "}
                    {selectedPatient.gender}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {selectedPatient.address}
                  </p>

                  <p>
                    <strong>Visit Frequency:</strong>{" "}
                    {selectedPatient.visit_frequency}
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

export default PatientsPage;