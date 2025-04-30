import React, { useState, useContext, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { SidebarContext } from './DashboardLayout';
import Header from './Header';

const MedicineDailyDashboard = () => {
  const { isOpen } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 Days');

  // Periods dropdown options
  const periodOptions = [
    'Last 7 Days',
    'Last 30 Days',
    'This Month',
    'Last Month',
    'This Quarter'
  ];

  // Exact color palette from the image
  const COLORS = {
    Paracetamol: '#8884d8',  // Light purple
    Ibuprofen: '#6a5acd',    // Dark purple
    Aspirin: '#00c0ef',      // Bright blue
    Amoxicillin: '#f7a35c',  // Light orange
    Omeprazole: '#ff4136'    // Bright red
  };

  // Exact values from the graph
  const dailyMedicineData = [
    { 
      day: 'Mon', 
      Paracetamol: 65, 
      Ibuprofen: 45, 
      Aspirin: 32, 
      Amoxicillin: 28, 
      Omeprazole: 37 
    },
    { 
      day: 'Tue', 
      Paracetamol: 58, 
      Ibuprofen: 48, 
      Aspirin: 28, 
      Amoxicillin: 38, 
      Omeprazole: 37 
    },
    { 
      day: 'Wed', 
      Paracetamol: 84, 
      Ibuprofen: 52, 
      Aspirin: 32, 
      Amoxicillin: 42, 
      Omeprazole: 51 
    },
    { 
      day: 'Thu', 
      Paracetamol: 52, 
      Ibuprofen: 48, 
      Aspirin: 38, 
      Amoxicillin: 35, 
      Omeprazole: 44 
    },
    { 
      day: 'Fri', 
      Paracetamol: 72, 
      Ibuprofen: 52, 
      Aspirin: 38, 
      Amoxicillin: 35, 
      Omeprazole: 43 
    },
    { 
      day: 'Sat', 
      Paracetamol: 45, 
      Ibuprofen: 38, 
      Aspirin: 22, 
      Amoxicillin: 28, 
      Omeprazole: 32 
    },
    { 
      day: 'Sun', 
      Paracetamol: 42, 
      Ibuprofen: 35, 
      Aspirin: 22, 
      Amoxicillin: 22, 
      Omeprazole: 29 
    }
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#F9FAFB]"
      style={{
        marginLeft: windowWidth >= 1024 ? (isOpen ? "256px" : "80px") : "0",
        transition: "margin-length 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Header
        title="Daily Medicine Report"
        subtitle="Today's medicine usage and statistics"
      />
      
      <main className="p-4 sm:p-6 mt-28 md:mt-24">
        {/* Period Selector */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periodOptions.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Medicine Usage Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 col-span-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Daily Medicine Usage</h2>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={dailyMedicineData} 
                  barCategoryGap="20%" 
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis 
                    domain={[0, 100]} 
                    ticks={[0, 20, 40, 60, 80, 100]} 
                  />
                  <Tooltip />
                  
                  <Bar dataKey="Paracetamol" fill={COLORS.Paracetamol} maxBarSize={30} />
                  <Bar dataKey="Ibuprofen" fill={COLORS.Ibuprofen} maxBarSize={30} />
                  <Bar dataKey="Aspirin" fill={COLORS.Aspirin} maxBarSize={30} />
                  <Bar dataKey="Amoxicillin" fill={COLORS.Amoxicillin} maxBarSize={30} />
                  <Bar dataKey="Omeprazole" fill={COLORS.Omeprazole} maxBarSize={30} />
                  
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    payload={Object.entries(COLORS).map(([key, color]) => ({
                      value: key,
                      type: 'square',
                      color: color
                    }))}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top 5 Medicines Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Top 5 Medicines Today</h2>
            
            <div className="space-y-4">
              {[
                { name: 'Paracetamol', usage: 437, change: 30 },
                { name: 'Ibuprofen', usage: 318, change: 15 },
                { name: 'Aspirin', usage: 210, change: -5 },
                { name: 'Amoxicillin', usage: 172, change: 10 },
                { name: 'Omeprazole', usage: 251, change: 8 }
              ].map((medicine, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{medicine.name}</span>
                  <div className="flex items-center">
                    <span className={`mr-3 ${medicine.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {medicine.change > 0 ? `↑ ${medicine.change}%` : `↓ ${Math.abs(medicine.change)}%`}
                    </span>
                    <span className="font-semibold">{medicine.usage} units</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Insights Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Performance Insights</h2>
            
            <div className="space-y-4 ">
              {[
                { name: 'Paracetamol', change: 'Increased by 30%' },
                { name: 'Ibuprofen', change: 'Increased by 15%' },
                { name: 'Aspirin', change: 'Decreased by 5%' },
                { name: 'Amoxicillin', change: 'Increased by 10%' },
                { name: 'Omeprazole', change: 'Increased by 8%' }
              ].map((medicine, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className='bg-[#F9FAFB] rounded-xl w-full p-3'>
                    <span className="font-medium">{medicine.name}</span>
                    <div className="text-sm text-gray-500">{medicine.change}</div>
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

export default MedicineDailyDashboard;