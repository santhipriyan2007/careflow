import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Users,
  UserPlus,
  Calendar,
  IndianRupee,
} from "lucide-react";

import {
  getPatients,
} from "../../services/patientService";

import {
  getLeads,
} from "../../services/leadService";

import {
  getAppointments,
} from "../../services/appointmentService";

import {
  getTreatments,
} from "../../services/treatmentService";

import {
  getPayments,
} from "../../services/paymentService";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

function ReportsPage() {
  const [loading, setLoading] = useState(true);

  const [patients, setPatients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        patientsData,
        leadsData,
        appointmentsData,
        treatmentsData,
        paymentsData,
      ] = await Promise.all([
        getPatients(),
        getLeads(),
        getAppointments(),
        getTreatments(),
        getPayments(),
      ]);

      setPatients(patientsData.patients || []);
      setLeads(leadsData.leads || []);
      setAppointments(
        appointmentsData.appointments || []
      );
      setTreatments(
        treatmentsData.treatments || []
      );
      setPayments(
        paymentsData.payments || []
      );
    } catch (error) {
      console.error(
        "Error fetching report data:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = payments.reduce(
    (sum, payment) =>
      sum + Number(payment.amount || 0),
    0
  );

  const leadConversionRate =
    leads.length > 0
      ? (
          (patients.length / leads.length) *
          100
        ).toFixed(1)
      : 0;

  const appointmentStatusData = [
    {
      name: "Scheduled",
      value: appointments.filter(
        (a) =>
          a.status?.toLowerCase() ===
          "scheduled"
      ).length,
    },
    {
      name: "Completed",
      value: appointments.filter(
        (a) =>
          a.status?.toLowerCase() ===
          "completed"
      ).length,
    },
    {
      name: "Cancelled",
      value: appointments.filter(
        (a) =>
          a.status?.toLowerCase() ===
          "cancelled"
      ).length,
    },
  ];

  const treatmentStatusData = [
    {
      name: "Active",
      value: treatments.filter(
        (t) =>
          t.status?.toLowerCase() ===
          "active"
      ).length,
    },
    {
      name: "Completed",
      value: treatments.filter(
        (t) =>
          t.status?.toLowerCase() ===
          "completed"
      ).length,
    },
  ];

  const revenueData = payments.map(
    (payment) => ({
      date: payment.payment_date,
      revenue: Number(payment.amount),
    })
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Topbar />

          <main className="p-8">
            <h1 className="text-3xl font-bold">
              Reports
            </h1>

            <p className="mt-4">
              Loading analytics...
            </p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Reports & Analytics
          </h1>

          {/* Statistics Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            <StatCard
              title="Total Patients"
              value={patients.length}
              icon={<Users size={22} />}
            />

            <StatCard
              title="Total Leads"
              value={leads.length}
              icon={<UserPlus size={22} />}
            />

            <StatCard
              title="Appointments"
              value={appointments.length}
              icon={<Calendar size={22} />}
            />

            <StatCard
              title="Revenue"
              value={`₹${totalRevenue.toLocaleString()}`}
              icon={<IndianRupee size={22} />}
            />

          </div>

          {/* Charts */}

          <div className="grid lg:grid-cols-2 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold mb-4">
                Appointment Status
              </h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <PieChart>
                  <Pie
                    data={appointmentStatusData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {appointmentStatusData.map(
                      (_, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold mb-4">
                Treatment Status
              </h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <PieChart>
                  <Pie
                    data={treatmentStatusData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {treatmentStatusData.map(
                      (_, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Revenue Chart */}

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="font-semibold mb-4">
              Revenue Collection
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary */}

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold mb-4">
              Business Summary
            </h2>

            <div className="space-y-3">

              <p>
                Lead Conversion Rate:
                <strong>
                  {" "}
                  {leadConversionRate}%
                </strong>
              </p>

              <p>
                Total Revenue Collected:
                <strong>
                  {" "}
                  ₹
                  {totalRevenue.toLocaleString()}
                </strong>
              </p>

              <p>
                Active Treatments:
                <strong>
                  {" "}
                  {
                    treatments.filter(
                      (t) =>
                        t.status?.toLowerCase() ===
                        "active"
                    ).length
                  }
                </strong>
              </p>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {value}
          </h2>
        </div>

        <div className="text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;