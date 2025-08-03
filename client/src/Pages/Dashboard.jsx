import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Nav from "../components/Nav.jsx";
import { Link } from "react-router-dom";
import ManagePasswords from "../components/ManagePasswords.jsx";
import { useUser } from "../context/UserContext.jsx";
import CreateManager from "../components/CreateManager.jsx";
import ManageUserRoles from "../components/ManageUserRoles.jsx";
import UpdatePassword from "../components/UpdatePassword.jsx";
import DeleteUsers from "../components/DeleteUsers.jsx";
import ManageResource from "../components/ManageResource.jsx"
import ManageFAQs from "../components/ManageFAQs.jsx"
import CreateStaff from "../components/CreateStaff.jsx";

export default function Dashboard() {
  const { user, loading } = useUser();

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <Nav />
        <main className="flex-1 flex items-center justify-center">
          <div>Loading dashboard...</div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <Nav />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p>Please log in to access your dashboard.</p>
            <Link
              to="/signin"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render dashboard based on user role
  const renderDashboardContent = () => {
    switch (user.role) {
      case "admin":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            {/* User Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mb-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                User Management
              </summary>
              <div className="flex flex-row gap-4 text-sm mt-4">
                <div className="w-full m-2">
                  <ManagePasswords />
                </div>
                <div className="w-full m-2">
                  <CreateManager/>
                </div>
                <div className="w-full m-2">
                  <ManageUserRoles />
                </div>
                <div className="w-full m-2">
                  <DeleteUsers />
                </div>
              </div>
            </details>

            {/* Animal Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4 mb-4" close>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Animal Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  {/* Placeholder for animal management component */}
                  <div>Animal Intake</div>
                </div>
                <div className="w-full m-2">
                  <div>Manage Animal Records</div>
                </div>
                <div className="w-full m-2">
                  <div>Adoption Status</div>
                </div>
              </div>
            </details>

            {/* Website Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4" close>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Website Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  <div><ManageFAQs/></div>
                </div>
                <div className="w-full m-2">
                  <div><ManageResource/></div>
                </div>
                <div className="w-full m-2">
                  <div>Some other thing</div>
                </div>
              </div>
            </details>
          </section>
        );

      case "manager":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Manager Dashboard</h2>
            {/* User Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mb-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                User Management
              </summary>
              <div className="flex flex-row gap-4 text-sm mt-4">
                <div className="w-full m-2">
                  <ManagePasswords />
                </div>
                <div className="w-full m-2">
                  <CreateStaff/>
                </div>
                <div className="w-full m-2">
                  <ManageUserRoles />
                </div>
                <div className="w-full m-2">
                  <DeleteUsers />
                </div>
              </div>
            </details>

            {/* Animal Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4 mb-4" close>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Animal Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  {/* Placeholder for animal management component */}
                  <div>Animal Intake</div>
                </div>
                <div className="w-full m-2">
                  <div>Manage Animal Records</div>
                </div>
                <div className="w-full m-2">
                  <div>Adoption Status</div>
                </div>
              </div>
            </details>

            {/* Website Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4" close>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Website Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  <div><ManageFAQs/></div>
                </div>
                <div className="w-full m-2">
                  <div><ManageResource/></div>
                </div>
                <div className="w-full m-2">
                  <div>Some other thing</div>
                </div>
              </div>
            </details>
          </section>
        );

      case "staff":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Staff Dashboard</h2>
            {/* Animal Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4 mb-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Animal Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  {/* Placeholder for animal management component */}
                  <div>Animal Intake</div>
                </div>
                <div className="w-full m-2">
                  <div>Manage Animal Records</div>
                </div>
                <div className="w-full m-2">
                  <div>Adoption Status</div>
                </div>
              </div>
            </details>

            {/* Website Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Website Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  <div><ManageFAQs/></div>
                </div>
                <div className="w-full m-2">
                  <div><ManageResource/></div>
                </div>
                <div className="w-full m-2">
                  <div>Some other thing</div>
                </div>
              </div>
            </details>
          </section>
        );

      case "volunteer":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Volunteer Dashboard</h2>

            {/* Animal Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4 mb-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Animal Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  {/* Placeholder for animal management component */}
                  <div>Animal Intake</div>
                </div>
                <div className="w-full m-2">
                  <div>Manage Animal Records</div>
                </div>
                <div className="w-full m-2">
                  <div>Adoption Status</div>
                </div>
              </div>
            </details>

            {/* Website Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Website Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  <div><ManageFAQs/></div>
                </div>
                <div className="w-full m-2">
                  <div><ManageResource/></div>
                </div>
                <div className="w-full m-2">
                  <div>Some other thing</div>
                </div>
              </div>
            </details>
          </section>
        );

      case "foster":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Foster Dashboard</h2>

            {/* Animal Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4 mb-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Animal Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  {/* Placeholder for animal management component */}
                  <div>Animal Intake</div>
                </div>
                <div className="w-full m-2">
                  <div>Manage Animal Records</div>
                </div>
                <div className="w-full m-2">
                  <div>Adoption Status</div>
                </div>
              </div>
            </details>

            {/* Website Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Website Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  <div><ManageFAQs/></div>
                </div>
                <div className="w-full m-2">
                  <div><ManageResource/></div>
                </div>
                <div className="w-full m-2">
                  <div>Some other thing</div>
                </div>
              </div>
            </details>
          </section>
        );

      case "adopter":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Adoption Dashboard</h2>

            {/* Animal Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4 mb-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Animal Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  {/* Placeholder for animal management component */}
                  <div>Animal Intake</div>
                </div>
                <div className="w-full m-2">
                  <div>Manage Animal Records</div>
                </div>
                <div className="w-full m-2">
                  <div>Adoption Status</div>
                </div>
              </div>
            </details>

            {/* Website Management Collapsible */}
            <details className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-4" open>
              <summary className="text-lg font-semibold mb-4 cursor-pointer select-none">
                Website Management
              </summary>
              <div className="flex flex-row gap-4 mt-4">
                <div className="w-full m-2">
                  <div><ManageFAQs/></div>
                </div>
                <div className="w-full m-2">
                  <div><ManageResource/></div>
                </div>
                <div className="w-full m-2">
                  <div>Some other thing</div>
                </div>
              </div>
            </details>
          </section>
        );

      case "initial":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="rounded-lg p-6 border-2 border-[#F87575]">
                <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
                <p className="mb-6">
                  You have nothing pending. How can you make a difference today?
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Quick Action</h3>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Available Pets</h3>
                  <p>Browse pets available for adoption</p>
                </div>

                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Resources</h3>
                  <p className="mb-6">
                    Trying to decide if adoption or fostering is right for your
                    family? Check our FAQs/Resources Page!
                  </p>
                  <Link to="/resources">
                    <button className="bg-[#102542] text-white px-4 py-2 rounded hover:bg-[#dc5a4e] transition">
                      Resources
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Nav />

      <main className="flex flex-row px-8 py-8">
        {/* Welcome message */}
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {user.firstName || user.email}!
              </h1>
              <p className="mb-4">
                Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>
            <div>
              <UpdatePassword />
            </div>
          </div>

          {/* Role-specific dashboard content */}
          {renderDashboardContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
