import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { SidebarContext } from "./DashboardLayout";
import Header from "./Header";

const Dashboard = () => {
  const { isOpen } = useContext(SidebarContext);
  const { role, region } = useSelector((state) => state.auth);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [pieAngle, setPieAngle] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isAdmin = role === "admin";

  const finalBarData = isAdmin
    ? [
        { name: "Vaccines", value: 6500, category: "Preventive" },
        { name: "Antibiotics", value: 4200, category: "Treatment" },
        { name: "Analgesics", value: 3800, category: "Pain Relief" },
        { name: "Antivirals", value: 3200, category: "Treatment" },
        { name: "Antipyretics", value: 2800, category: "Fever" },
      ]
    : [
        { name: "Paracetamol", value: 4000, category: "Pain Relief" },
        { name: "Omeprazole", value: 3000, category: "Gastric" },
        { name: "Metformin", value: 2000, category: "Diabetes" },
        { name: "Amoxicillin", value: 2800, category: "Antibiotic" },
        { name: "Ibuprofen", value: 2500, category: "Pain Relief" },
      ];

  const finalPieData = isAdmin
    ? [
        { name: "Vaccines", value: 45, color: "#34568B" },
        { name: "Antibiotics", value: 30, color: "#2ECC71" },
        { name: "Analgesics", value: 15, color: "#7DCEA0" },
        { name: "Others", value: 10, color: "#D5F5E3" },
      ]
    : [
        { name: "Paracetamol", value: 35, color: "#34568B" },
        { name: "Amoxicillin", value: 25, color: "#2ECC71" },
        { name: "Ibuprofen", value: 20, color: "#7DCEA0" },
        { name: "Metformin", value: 12, color: "#A3E4D7" },
        { name: "Others", value: 8, color: "#D5F5E3" },
      ];
      const increasingMedicines = [
        { name: 'Aspirin', increase: '45%', category: 'Pain Relief', status: 'Critical' },
        { name: 'Ibuprofen', increase: '38%', category: 'Pain Relief', status: 'Watch' },
        { name: 'Paracetamol', increase: '32%', category: 'Pain Relief', status: 'Normal' },
        { name: 'Amoxicillin', increase: '28%', category: 'Antibiotic', status: 'Watch' },
        { name: 'Omeprazole', increase: '25%', category: 'Gastric', status: 'Normal' },
        { name: 'Cetirizine', increase: '22%', category: 'Antiallergy', status: 'Normal' },
        { name: 'Metformin', increase: '20%', category: 'Diabetes', status: 'Watch' }
      ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setBarChartData(finalBarData.map((item) => ({ ...item, value: 0 })));
    setPieChartData(finalPieData);
    setPieAngle(0);
    let startTime = null;
    const duration = 1000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress <= 1) {
        setBarChartData(
          finalBarData.map((item) => ({
            ...item,
            value: item.value * Math.min(progress, 1),
          }))
        );
        setPieAngle(360 * Math.min(progress, 1));
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isAdmin]);

  return (
    <div
      className="min-h-screen bg-[#F9FAFB]"
      style={{
        marginLeft: windowWidth >= 1024 ? (isOpen ? "256px" : "80px") : "0",
        transition: "margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Header
        title={
          isAdmin ? "National Health Overview" : `Dashboard Overview`
        }
        subtitle={
          isAdmin
            ? "System-wide healthcare analytics and monitoring"
            : "Regional health data and trends analysis"
        }
      />
      <main className="p-4 sm:p-6 mt-28 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Top Medications</h2>
            <div className="h-[300px] sm:h-[400px] lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tickMargin={10}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#34568B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Market Share</h2>
            <div className="h-[300px] sm:h-[400px] lg:h-96">
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
               <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2  px-2 sm:px-4">
                {pieChartData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 min-w-fit">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                      {item.name} ({Math.round(item.value)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
         

          {/* Top Increasing Medicines */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Top Increasing Medicines</h2>
            <div className="space-y-3 sm:space-y-4">
              {increasingMedicines.map((medicine, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{medicine.name}</span>
                    <span className="text-xs sm:text-sm text-gray-500 ml-2">({medicine.category})</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      medicine.status === 'Critical' ? 'bg-red-100 text-red-600' :
                      medicine.status === 'Watch' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {medicine.status}
                    </span>
                    <span className="text-green-500 flex items-center gap-1 min-w-[60px] justify-end">
                      <span className="text-xs">↗</span>
                      {medicine.increase}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
