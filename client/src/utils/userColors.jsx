//used to create the UI for User Roles and Statuses

export const getRoleColor = (role) => {
  const colors = {
    admin: "bg-red-100 text-red-800 border-red-200",
    manager: "bg-blue-100 text-blue-800 border-blue-200",
    staff: "bg-green-100 text-green-800 border-green-200",
    foster: "bg-purple-100 text-purple-800 border-purple-200",
    adopter: "bg-orange-100 text-orange-800 border-orange-200",
    volunteer: "bg-yellow-100 text-yellow-800 border-yellow-200",
    initial: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return colors[role?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
};

export const getStatusColor = (status) => {
  const colors = {
    approved: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    denied: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
};

export const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "staff", label: "Staff" },
  { value: "foster", label: "Foster" },
  { value: "adopter", label: "Adopter" },
  { value: "volunteer", label: "Volunteer" },
  { value: "initial", label: "Initial" }
];

export const statusOptions = [
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "denied", label: "Denied" },
  { value: "initial", label: "Initial"}
]