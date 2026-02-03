"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Edit, Eye, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/layout";
import { deleteUser, getAllUser, updateUserProfile, updateUserRole } from "@/service/User";
import toast from "react-hot-toast";

import UserProfileModal, { User } from "@/components/admin/UserModal";
import { IUser } from "@/types";



export type UserRole = "user" | "admin" | "reviewer";

// interface IUser {
//     id: number;
//     name: string;
//     email: string;
//     role: UserRole;
//     created_at?: string;
// }

// interface ApiResponse {
//     data: IUser[];
//     meta: {
//         current_page: number;
//         last_page: number;
//         total: number;
//     };
// }

export default function UserManagementPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Handler for Preview button
    const handlePreviewLawJournal = (user: IUser) => {
        setSelectedUser(user);
        setShowPreviewModal(true);
    };

    // Handler for Edit button
    const handleEditLawJournal = (user: IUser) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };



    useEffect(() => {
        loadUsers();
    }, [page, search]);

    const loadUsers = async () => {
        setLoading(true);
        const res = await getAllUser(search, page, 10);
        console.log(res?.data?.data || []);
        setUsers(res?.data?.data || []);
        setLastPage(res?.data?.last_page || 1);
        setLoading(false);
    };

    const changeRole = async (userId: number, role: UserRole) => {
        const formData = new FormData();
        formData.append("role", role);
        const res = await updateUserRole(userId, formData);
        if (res.status === 200) {
            toast.success("User role updated successfully");
            loadUsers();
        }
    };
    // Handler for saving user changes
    const handleSaveUser = async (updatedUser: User) => {
        const formData = new FormData();

        formData.append("name", updatedUser.name);
        formData.append("email", updatedUser.email);
        formData.append("phone", updatedUser.phone ?? "");
        formData.append("institute", updatedUser.institute ?? "");
        formData.append("designation", updatedUser.designation ?? "");
        formData.append("address", updatedUser.address ?? "");
        formData.append("role", updatedUser.role);
        try {
            if (!selectedUser) return;

            const res = await updateUserProfile(selectedUser.id, formData);

            console.log('Updated user:', updatedUser);

            // Close modal and refresh data
            if (res.status === 200) {
                toast.success("User updated successfully!");
                setShowEditModal(false);
                setShowPreviewModal(false);
                loadUsers();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    //delete user ===================
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        const res = await deleteUser(id);
        if (res?.status === 200) {
            toast.success("User deleted successfully!");
            loadUsers(); // Refresh the list
        } else {
            toast.error("Failed to delete User.");
        }
    };

    return (
        <AdminLayout>

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full"></div>
                </div>

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                        className="w-full md:w-96 px-5 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Institute</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Designation</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Role</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Joined</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <svg className="animate-spin h-8 w-8 text-blue-900" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span className="text-gray-500 font-medium">Loading users...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-500 font-medium">No users found</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr key={user.id} className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-900">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{user.designation || 'Not provided'}</td>
                                        <td className="px-6 py-4 text-gray-600">{user.institute || 'Not provided'}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) =>
                                                    changeRole(user.id, e.target.value as UserRole)
                                                }
                                                className={`border-2 rounded-2xl px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:border-transparent transition-all ${user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-800 border-purple-200 hover:border-purple-300 focus:ring-purple-900'
                                                    : user.role === 'reviewer'
                                                        ? 'bg-green-100 text-green-800 border-green-200 hover:border-green-300 focus:ring-green-900'
                                                        : 'bg-blue-50 text-blue-900 border-blue-200 hover:border-blue-300 focus:ring-blue-900'
                                                    }`}
                                            >
                                                <option value="user">User</option>
                                                <option value="reviewer">Reviewer</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {user.created_at
                                                ? new Date(user.created_at).toLocaleDateString()
                                                : "—"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEditLawJournal(user)}
                                                    className="p-2 text-blue-600 hover:text-white hover:bg-blue-900 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handlePreviewLawJournal(user)}
                                                    className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all"
                                                    title="Preview"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-semibold text-gray-900">{users.length}</span> users
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="p-2.5 border-2 border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-900 rounded-lg border border-blue-200">
                            Page {page} of {lastPage}
                        </span>
                        <button
                            disabled={page === lastPage}
                            onClick={() => setPage((p) => p + 1)}
                            className="p-2.5 border-2 border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
                {showPreviewModal && (
                    <UserProfileModal
                        user={selectedUser}
                        isEditMode={false}
                        onClose={() => {
                            setShowPreviewModal(false);
                            setSelectedUser(null);
                        }}
                        onSave={handleSaveUser}
                    />
                )}

                {/* Edit Modal */}
                {showEditModal && (
                    <UserProfileModal
                        user={selectedUser}
                        isEditMode={true}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedUser(null);
                        }}
                        onSave={handleSaveUser}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
