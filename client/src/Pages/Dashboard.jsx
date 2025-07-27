import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Nav from "../components/Nav.jsx";
import { Link } from "react-router-dom";
import ManagePasswords from "../components/ManagePasswords.jsx";
import UpdateProfile from "../components/UpdateProfile.jsx";
import { useUser } from "../context/UserContext.jsx";

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
            <h2 className="text-2xl font-bold mb-6 text-[#CDD7D6]">
              Admin Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  User Management
                </h3>
                <ManagePasswords />
              </div>
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  Update your profile
                </h3>
                <p className="text-[#102542]"></p>
                <UpdateProfile />
              </div>
            </div>
          </section>
        );

      case "manager":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-[#CDD7D6]">
              Manager Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  Staff Management
                </h3>
                <p className="text-[#102542]">Manage staff and volunteers</p>
              </div>
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  Reports
                </h3>
                <p className="text-[#102542]">View management reports</p>
              </div>
            </div>
          </section>
        );

      case "staff":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-[#CDD7D6]">
              Staff Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  Foster Management
                </h3>
                <p className="text-[#102542]">
                  Manage foster applications and placements
                </p>
              </div>
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  Volunteer Coordination
                </h3>
                <p className="text-[#102542]">
                  Coordinate volunteer activities
                </p>
              </div>
            </div>
          </section>
        );

      case "volunteer":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-[#CDD7D6]">
              Volunteer Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  My Schedule
                </h3>
                <p className="text-[#102542]">View your volunteer schedule</p>
              </div>
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  Training
                </h3>
                <p className="text-[#102542]">Access training materials</p>
              </div>
            </div>
          </section>
        );

      case "foster":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-[#CDD7D6]">
              Foster Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  My Foster Pets
                </h3>
                <p className="text-[#102542]">
                  View and manage your foster pets
                </p>
              </div>
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  Resources
                </h3>
                <p className="text-[#102542]">
                  Foster care resources and support
                </p>
              </div>
            </div>
          </section>
        );

      case "adopter":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-[#CDD7D6]">
              Adopter Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  My Applications
                </h3>
                <p className="text-[#102542]">
                  Track your adoption applications
                </p>
              </div>
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  Available Pets
                </h3>
                <p className="text-[#102542]">
                  Browse pets available for adoption
                </p>
              </div>
            </div>
          </section>
        );

      case "initial":
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">
              Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]"></h3>
                <p className="text-[#102542] text-2xl">
                  You have nothing pending. How can you make a difference?
                </p>
                <UpdateProfile />
              </div>
              <div className="bg-[#F87575] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-[#102542]">
                  Available Pets
                </h3>
                <p className="text-[#102542]">
                  Browse pets available for adoption
                </p>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-[#CDD7D6]">Welcome</h2>
            <div className="bg-[#F87575] rounded-lg p-4">
              <p className="text-[#102542]">
                Your account role is not recognized. Please contact support.
              </p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Nav />

      <main className="flex flex-1 px-8 py-8">
        {/* Welcome message */}
        <div className="w-full">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">
              Welcome, {user.firstName || user.email}!
            </h1>
            <p className="">
              Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </div>

          {/* Role-specific dashboard content */}
          {renderDashboardContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
