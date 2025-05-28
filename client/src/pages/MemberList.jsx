import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const MemberList = ({ orgId }) => {
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${API_URL}/organizations/${orgId}/members`);
      setMembers(res.data);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  useEffect(() => {
    if (orgId) fetchMembers();
  }, [orgId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/organizations/members/`, {
        id: crypto.randomUUID(),
        user_email: email,
        role,
        organization_id: orgId,
      });
      setEmail("");
      fetchMembers();
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const handleUpdateRole = async (memberId, newRole) => {
    try {
      await axios.put(`${API_URL}/organizations/members/${memberId}`, { role: newRole });
      fetchMembers();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(`${API_URL}/organizations/members/${memberId}`);
      fetchMembers();
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };
  return (
   <div className="p-6 bg-blue-50 shadow-lg rounded-lg mt-6 max-w-4xl mx-auto">
  <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
    Add Member to Organization
  </h3>

  <form onSubmit={handleAdd} className="space-y-4">
    <div className="flex space-x-4">
      <input
        type="email"
        placeholder="Enter Email"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
      >
        Add
      </button>
    </div>
  </form>

  <div className="mt-8">
    <h4 className="text-xl font-medium text-blue-600 mb-4 text-center">
      Current Members
    </h4>

    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-900">{m.user_email}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    m.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {m.role}
                </span>
              </td>
              <td className="px-6 py-4 text-sm space-x-4">
                <button
                  onClick={() =>
                    handleUpdateRole(m.id, m.role === "admin" ? "member" : "admin")
                  }
                  className="text-blue-600 hover:text-blue-800"
                >
                  {m.role === "admin" ? "Demote" : "Promote"}
                </button>

                <button
                  onClick={() => handleDeleteMember(m.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
);
};

export default MemberList;