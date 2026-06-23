import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import StatCard from "../../components/StatCard";

function DashboardPage() {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    leads: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

       const [
        patientsRes,
        appointmentsRes,
        leadsRes,
        paymentsRes,
      ] = await Promise.all([
        API.get("/patients"),
        API.get("/appointments"),
        API.get("/leads"),
        API.get("/payments"),
      ]);

        const totalRevenue =
          paymentsRes.data.payments.reduce(
            (sum, payment) =>
              sum + Number(payment.amount || 0),
            0
          );

        setStats({
          patients: patientsRes.data.count,
          appointments: appointmentsRes.data.count,
          leads: leadsRes.data.count,
          revenue: totalRevenue,
        });
      } catch (error) {
        console.error(
          "Dashboard Stats Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <main className="p-8">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Welcome to CareFlow Dashboard
          </p>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Patients"
              value={
                loading ? "..." : stats.patients
              }
              color="text-blue-600"
            />

            <StatCard
              title="Appointments"
              value={
                loading
                  ? "..."
                  : stats.appointments
              }
              color="text-green-600"
            />

            <StatCard
              title="Revenue"
              value={
                loading
                  ? "..."
                  : `₹${stats.revenue.toLocaleString()}`
              }
              color="text-purple-600"
            />

            <StatCard
              title="New Leads"
              value={
                loading ? "..." : stats.leads
              }
              color="text-orange-600"
            />
          </div>

          {/* Widgets Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Upcoming Appointments
              </h2>

              <p className="text-gray-500">
                Dynamic appointment data will be
                added in the next milestone.
              </p>
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">
                Recent Leads
              </h2>

              <p className="text-gray-500">
                Dynamic lead data will be added in
                the next milestone.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
