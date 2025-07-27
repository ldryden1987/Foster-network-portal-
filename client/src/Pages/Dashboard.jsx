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
              <div className="rounded-lg p-4 border-2 border-[#F87575] text-left">
                <h3 className="text-lg font-semibold mb-4 text-[#102542] text-left">
                  User Management
                </h3>
                <ManagePasswords />
              </div>
              <div className="rounded-lg p-4 border-2 border-[#F87575] text-left">
                <h3 className="text-lg font-semibold mb-4 text-[#102542] text-left">
                  Update your profile
                </h3>
                <p className="text-[#102542]"></p>
              </div>
            </div>
          </section>
        );

      case "manager":
        return (
<section className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Manager Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg p-6 border-2 border-[#F87575] bg-white">
          <h3 className="text-lg font-semibold mb-4 text-[#102542]">
            Getting Started
          </h3>
          <p className="text-[#102542] mb-6">
            You have nothing pending. How can you make a difference today?
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Available Pets
            </h3>
            <p className="text-[#102542]">
              Browse pets available for adoption
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Quick Actions
            </h3>
            <p className="text-[#102542]">
              Volunteer opportunities and foster applications
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Resources
            </h3>
            <p className="text-[#102542]">
              Pet care guides and helpful information
            </p>
          </div>
        </div>
      </div>
    </section>
        );

      case "staff":
        return (
<section className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Staff Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg p-6 border-2 border-[#F87575] bg-white">
          <h3 className="text-lg font-semibold mb-4 text-[#102542]">
            Getting Started
          </h3>
          <p className="text-[#102542] mb-6">
            You have nothing pending. How can you make a difference today?
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Available Pets
            </h3>
            <p className="text-[#102542]">
              Browse pets available for adoption
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Quick Actions
            </h3>
            <p className="text-[#102542]">
              Volunteer opportunities and foster applications
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Resources
            </h3>
            <p className="text-[#102542]">
              Pet care guides and helpful information
            </p>
          </div>
        </div>
      </div>
    </section>
        );

      case "volunteer":
        return (
<section className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Volunteer Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg p-6 border-2 border-[#F87575] bg-white">
          <h3 className="text-lg font-semibold mb-4 text-[#102542]">
            Getting Started
          </h3>
          <p className="text-[#102542] mb-6">
            You have nothing pending. How can you make a difference today?
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Available Pets
            </h3>
            <p className="text-[#102542]">
              Browse pets available for adoption
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Quick Actions
            </h3>
            <p className="text-[#102542]">
              Volunteer opportunities and foster applications
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Resources
            </h3>
            <p className="text-[#102542]">
              Pet care guides and helpful information
            </p>
          </div>
        </div>
      </div>
    </section>
        );

      case "foster":
        return (
          <section className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Foster Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg p-6 border-2 border-[#F87575] bg-white">
          <h3 className="text-lg font-semibold mb-4 text-[#102542]">
            Getting Started
          </h3>
          <p className="text-[#102542] mb-6">
            You have nothing pending. How can you make a difference today?
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Available Pets
            </h3>
            <p className="text-[#102542]">
              Browse pets available for adoption
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Quick Actions
            </h3>
            <p className="text-[#102542]">
              Volunteer opportunities and foster applications
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Resources
            </h3>
            <p className="text-[#102542]">
              Pet care guides and helpful information
            </p>
          </div>
        </div>
      </div>
    </section>
        );

      case "adopter":
        return (
<section className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Adoption Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg p-6 border-2 border-[#F87575] bg-white">
          <h3 className="text-lg font-semibold mb-4 text-[#102542]">
            Getting Started
          </h3>
          <p className="text-[#102542] mb-6">
            You have nothing pending. How can you make a difference today?
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Available Pets
            </h3>
            <p className="text-[#102542]">
              Browse pets available for adoption
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Quick Actions
            </h3>
            <p className="text-[#102542]">
              Volunteer opportunities and foster applications
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Resources
            </h3>
            <p className="text-[#102542]">
              Pet care guides and helpful information
            </p>
          </div>
        </div>
      </div>
    </section>
        );

case "initial":
  return (
    <section className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="rounded-lg p-6 border-2 border-[#F87575] bg-white">
          <h3 className="text-lg font-semibold mb-4 text-[#102542]">
            Getting Started
          </h3>
          <p className="text-[#102542] mb-6">
            You have nothing pending. How can you make a difference today?
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Available Pets
            </h3>
            <p className="text-[#102542]">
              Browse pets available for adoption
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Quick Actions
            </h3>
            <p className="text-[#102542]">
              Volunteer opportunities and foster applications
            </p>
          </div>
          <div className="rounded-lg p-4 border-2 border-[#F87575] bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#102542]">
              Resources
            </h3>
            <p className="text-[#102542]">
              Pet care guides and helpful information
            </p>
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
