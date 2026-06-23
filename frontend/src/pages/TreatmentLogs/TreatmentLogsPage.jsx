import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AddTreatmentLogModal from "../../components/AddTreatmentLogModal";

import {
  getAllLogs,
  createLog,
  updateLog,
  deleteLog,
} from "../../services/treatmentLogService";

import { getPatients } from "../../services/patientService";

function TreatmentLogsPage() {
  const [logs, setLogs] = useState([]);
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const logsResponse = await getAllLogs();
      const patientsResponse = await getPatients();

      setLogs(logsResponse.logs || []);
      setPatients(patientsResponse.patients || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load treatment logs");
    } finally {
      setLoading(false);
    }
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(
      (p) => p.id === patientId
    );

    return patient
      ? patient.name
      : `Patient #${patientId}`;
  };

  const handleCreateLog = async (logData) => {
  try {
    await createLog(logData);

    await fetchData();

    toast.success(
      "Treatment log added successfully"
    );

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to create treatment log"
    );
  }
  };

  const handleUpdateLog = async (logData) => {
  try {
    await updateLog(
      editingLog.id,
      logData
    );

    await fetchData();

    toast.success(
      "Treatment log updated successfully"
    );

    setEditingLog(null);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to update treatment log"
    );
  }
  };

  const handleDeleteLog = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this treatment log?"
  );

  if (!confirmed) return;

  try {
    await deleteLog(id);

    await fetchData();

    toast.success(
      "Treatment log deleted successfully"
    );
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to delete treatment log"
    );
  }
  };

  const filteredLogs = logs.filter(
    (log) =>
      getPatientName(log.patient_id)
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      log.notes
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      String(log.visit_number).includes(
        searchTerm
      )
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
              Treatment Logs
            </h1>

            <button
              onClick={() => {
                setEditingLog(null);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Log
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <input
              type="text"
              placeholder="Search treatment logs..."
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
              Loading treatment logs...
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
                      Patient
                    </th>

                    <th className="text-left px-6 py-4">
                      Visit No
                    </th>

                    <th className="text-left px-6 py-4">
                      Progress
                    </th>

                    <th className="text-left px-6 py-4">
                      Notes
                    </th>

                    <th className="text-left px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-8 text-gray-500"
                      >
                        No treatment logs found
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="border-t"
                      >
                        <td className="px-6 py-4">
                          {getPatientName(
                            log.patient_id
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {log.visit_number}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${log.progress_percent}%`,
                                }}
                              />
                            </div>

                            <span>
                              {
                                log.progress_percent
                              }
                              %
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          {log.notes}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-4">

                            <button
                              onClick={() =>
                                setSelectedLog(log)
                              }
                            >
                              👁
                            </button>

                            <button
                              onClick={() => {
                                setEditingLog(log);
                                setShowModal(true);
                              }}
                            >
                              ✏️
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteLog(
                                  log.id
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

          {/* Add/Edit Modal */}
          <AddTreatmentLogModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditingLog(null);
            }}
            onSubmit={
              editingLog
                ? handleUpdateLog
                : handleCreateLog
            }
            log={editingLog}
            isEditing={!!editingLog}
          />

          {/* View Modal */}
          {selectedLog && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    Treatment Log Details
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedLog(null)
                    }
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <p>
                    <strong>Patient:</strong>{" "}
                    {getPatientName(
                      selectedLog.patient_id
                    )}
                  </p>

                  <p>
                    <strong>
                      Visit Number:
                    </strong>{" "}
                    {
                      selectedLog.visit_number
                    }
                  </p>

                  <p>
                    <strong>
                      Progress:
                    </strong>{" "}
                    {
                      selectedLog.progress_percent
                    }
                    %
                  </p>

                  <p>
                    <strong>Notes:</strong>{" "}
                    {selectedLog.notes}
                  </p>

                  <p>
                    <strong>
                      Created At:
                    </strong>{" "}
                    {new Date(
                      selectedLog.created_at
                    ).toLocaleString()}
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

export default TreatmentLogsPage;