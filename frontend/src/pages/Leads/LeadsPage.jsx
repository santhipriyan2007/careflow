import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AddLeadModal from "../../components/AddLeadModal";

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../../services/leadService";

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await getLeads();

      setLeads(response.leads || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLead = async (leadData) => {
  try {
    await createLead(leadData);

    await fetchLeads();

    toast.success("Lead created successfully");

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to create lead"
    );
  }
  };

  const handleUpdateLead = async (leadData) => {
  try {
    await updateLead(
      editingLead.id,
      leadData
    );

    await fetchLeads();

    toast.success("Lead updated successfully");

    setEditingLead(null);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to update lead"
    );
  }
  };

  const handleDeleteLead = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this lead?"
  );

  if (!confirmed) return;

  try {
    await deleteLead(id);

    await fetchLeads();

    toast.success("Lead deleted successfully");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to delete lead"
    );
  }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lead.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.service
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );


  const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "new":
      return "bg-blue-100 text-blue-700";

    case "contacted":
      return "bg-yellow-100 text-yellow-700";

    case "converted":
      return "bg-green-100 text-green-700";

    case "lost":
      return "bg-red-100 text-red-700";

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
              Leads Management
            </h1>

            <button
              onClick={() => {
                setEditingLead(null);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Lead
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {loading && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              Loading leads...
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
                      Name
                    </th>

                    <th className="text-left px-6 py-4">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Service
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
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-8 text-gray-500"
                      >
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-t"
                      >
                        <td className="px-6 py-4">
                          {lead.name}
                        </td>

                        <td className="px-6 py-4">
                          {lead.phone}
                        </td>

                        <td className="px-6 py-4">
                          {lead.email}
                        </td>

                        <td className="px-6 py-4">
                          {lead.service}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                              lead.status
                            )}`}
                          >
                            {lead.status?.charAt(0).toUpperCase() +
                              lead.status?.slice(1).toLowerCase()}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-4">

                            <button
                              onClick={() =>
                                setSelectedLead(lead)
                              }
                            >
                              👁
                            </button>

                            <button
                              onClick={() => {
                                setEditingLead(lead);
                                setShowModal(true);
                              }}
                            >
                              ✏️
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteLead(
                                  lead.id
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

          <AddLeadModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditingLead(null);
            }}
            onSubmit={
              editingLead
                ? handleUpdateLead
                : handleCreateLead
            }
            lead={editingLead}
            isEditing={!!editingLead}
          />

          {selectedLead && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    Lead Details
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedLead(null)
                    }
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedLead.name}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedLead.phone}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedLead.email}
                  </p>

                  <p>
                    <strong>Service:</strong>{" "}
                    {selectedLead.service}
                  </p>

                  <p>
                    <strong>Preferred Date:</strong>{" "}
                    {selectedLead.preferred_date}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedLead.status}
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

export default LeadsPage;