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
          //  User Management Section
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            <div className="rounded-lg p-4 border-2 border-[#F87575] text-left">
              <h3 className="text-lg font-semibold mb-4 text-left">
                User Management
              </h3>
              <div className="flex flex-row gap-4">
                <div className="w-full xl:w-1/3">
                  <CreateManager />
                </div>
                <div className="w-full xl:w-1/3">
                  <ManagePasswords />
                </div>
                <div className="w-full xl:w-1/3">
                  <ManageUserRoles />
                </div>
                <div className="w-full xl:w-1/4">
                  <DeleteUsers />
                </div>
              </div>
            </div>

            {/* Animal Management Section */}
            <div className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-8">
              <h3 className="text-lg font-semibold mb-4 text-left">
                Animal Management
              </h3>
              <div className="flex flex-row gap-4">
                <div className="w-full xl:w-1/3">
                  {/* Placeholder for animal management component */}
                  <div>Animal Intake</div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div>Manage Animal Records</div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div>Adoption Status</div>
                </div>
              </div>
            </div>
            
            {/* Website Management Section */}
            <div className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-8">
              <h3 className="text-lg font-semibold mb-4 text-left">
                Website Management
              </h3>
              <div className="flex flex-row gap-4">
                <div className="w-full xl:w-1/3">
                  <div><ManageFAQs/></div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div><ManageResource/></div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div>Some other thing</div>
                </div>
              </div>
            </div>
          </section>
        );

      case "manager":
        return (
          //  User Management Section
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Manager Dashboard</h2>
            <div className="rounded-lg p-4 border-2 border-[#F87575] text-left">
              <h3 className="text-lg font-semibold mb-4 text-left">
                User Management
              </h3>
              <div className="flex flex-row gap-4">
                <div className="w-full xl:w-1/4">
                  <ManagePasswords />
                </div>
                <div className="w-full xl:w-1/4">
                  <CreateStaff/>
                </div>
                <div className="w-full xl:w-1/4">
                  <ManageUserRoles />
                </div>
                <div className="w-full xl:w-1/4">
                  <DeleteUsers />
                </div>
              </div>
            </div>
            {/* Animal Management Section */}
            <div className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-8">
              <h3 className="text-lg font-semibold mb-4 text-left">
                Animal Management
              </h3>
              <div className="flex flex-row gap-4">
                <div className="w-full xl:w-1/3">
                  {/* Placeholder for animal management component */}
                  <div>Animal Intake</div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div>Manage Animal Records</div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div>Adoption Status</div>
                </div>
              </div>
            </div>
            {/* Website Management Section */}
            <div className="rounded-lg p-4 border-2 border-[#F87575] text-left mt-8">
              <h3 className="text-lg font-semibold mb-4 text-left">
                Website Management
              </h3>
              <div className="flex flex-row gap-4">
                <div className="w-full xl:w-1/3">
                  <div><ManageFAQs/></div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div><ManageResource/></div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div>Some other thing</div>
                </div>
              </div>
            </div>
          </section>
        );

      case "staff":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Staff Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="rounded-lg p-6 border-2 border-[#F87575]">
                <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
                <p className="mb-6">
                  You have nothing pending. How can you make a difference today?
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Available Pets</h3>
                  <p>Browse pets available for adoption</p>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <p>Volunteer opportunities and foster applications</p>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Resources</h3>
                  <p>Pet care guides and helpful information</p>
                </div>
              </div>
            </div>
          </section>
        );

      case "volunteer":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Volunteer Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="rounded-lg p-6 border-2 border-[#F87575]">
                <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
                <p className="mb-6">
                  You have nothing pending. How can you make a difference today?
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4]">
                    Available Pets
                  </h3>
                  <p>Browse pets available for adoption</p>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <p>Volunteer opportunities and foster applications</p>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Resources</h3>
                  <p>Pet care guides and helpful information</p>
                </div>
              </div>
            </div>
          </section>
        );

      case "foster":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Foster Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="rounded-lg p-6 border-2 border-[#F87575]">
                <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
                <p className="mb-6">
                  You have nothing pending. How can you make a difference today?
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Available Pets</h3>
                  <p>Browse pets available for adoption</p>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <p>Volunteer opportunities and foster applications</p>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Resources</h3>
                  <p>Pet care guides and helpful information</p>
                </div>
              </div>
            </div>
          </section>
        );

      case "adopter":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">Adoption Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="rounded-lg p-6 border-2 border-[#F87575]">
                <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
                <p className="mb-6">
                  You have nothing pending. How can you make a difference today?
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Available Pets</h3>
                  <p className="text-[#102542] dark:text-[#CDD7D6]">
                    Browse pets available for adoption
                  </p>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <p className="text-[#102542]">
                    Volunteer opportunities and foster applications
                  </p>
                </div>
                <div className="rounded-lg p-4 border-2 border-[#F87575]">
                  <h3 className="text-lg font-semibold mb-4">Resources</h3>
                  <p>Pet care guides and helpful information</p>
                </div>
              </div>
            </div>
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
