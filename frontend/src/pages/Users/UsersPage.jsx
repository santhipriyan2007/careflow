import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AddUserModal from "../../components/AddUserModal";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      setUsers(response || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
  try {
    await createUser(userData);

    await fetchUsers();

    toast.success(
      "User created successfully"
    );

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to create user"
    );
  }
  };

  const handleUpdateUser = async (userData) => {
  try {
    await updateUser(
      editingUser.id,
      userData
    );

    await fetchUsers();

    toast.success(
      "User updated successfully"
    );

    setEditingUser(null);
    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to update user"
    );
  }
  };

  const handleDeleteUser = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmed) return;

  try {
    await deleteUser(id);

    await fetchUsers();

    alert("User deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete user");
  }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.role
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
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
              Users Management
            </h1>

            <button
              onClick={() => {
                setEditingUser(null);
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add User
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <input
              type="text"
              placeholder="Search users..."
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
              Loading users...
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
              <table className="min-w-[700px] w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4">
                      Name
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Role
                    </th>

                    <th className="text-left px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-8 text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t"
                      >
                        <td className="px-6 py-4">
                          {user.name}
                        </td>

                        <td className="px-6 py-4">
                          {user.email}
                        </td>

                        <td className="px-6 py-4 capitalize">
                          {user.role}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-4">

                            <button
                              onClick={() =>
                                setSelectedUser(user)
                              }
                            >
                              👁
                            </button>

                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setShowModal(true);
                              }}
                            >
                              ✏️
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteUser(
                                  user.id
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
          <AddUserModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditingUser(null);
            }}
            onSubmit={
              editingUser
                ? handleUpdateUser
                : handleCreateUser
            }
            user={editingUser}
            isEditing={!!editingUser}
          />

          {/* View Modal */}
          {selectedUser && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    User Details
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedUser(null)
                    }
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedUser.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedUser.email}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    {selectedUser.role}
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

export default UsersPage;