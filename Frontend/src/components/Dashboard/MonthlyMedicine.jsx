import React, { useState, useContext, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { SidebarContext } from './DashboardLayout';
import Header from './Header';

const MonthlyMedicineReport = () => {
  const { isOpen } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Color palette matching the original design
  const COLORS = {
    Painkillers: '#8884d8',    // Light purple
    Antibiotics: '#6a5acd',    // Dark purple
    Antacids: '#00c0ef',       // Bright blue
    Vitamins: '#f7a35c'        // Light orange
  };

  // Monthly usage trends data
  const monthlyTrendsData = Array.from({length: 30}, (_, i) => ({
    day: i + 1,
    Painkillers: [
      90, 70, 110, 80, 150, 120, 40, 60, 95, 85, 
      100, 75, 105, 90, 140, 110, 50, 80, 115, 95, 
      130, 100, 70, 85, 125, 110, 60, 75, 105, 90
    ][i],
    Antibiotics: [
      50, 80, 70, 60, 120, 90, 30, 45, 65, 55, 
      85, 60, 75, 65, 110, 90, 40, 55, 80, 70, 
      100, 80, 50, 65, 95, 85, 45, 60, 80, 70
    ][i],
    Antacids: [
      40, 60, 50, 45, 80, 70, 25, 35, 55, 45, 
      65, 50, 60, 50, 90, 75, 30, 45, 65, 55, 
      85, 65, 40, 50, 75, 65, 35, 45, 65, 55
    ][i],
    Vitamins: [
      60, 50, 70, 55, 100, 80, 35, 45, 65, 55, 
      75, 60, 70, 60, 105, 85, 40, 55, 75, 65, 
      95, 75, 50, 60, 85, 75, 45, 55, 75, 65
    ][i]
  }));

  // Usage by category data
  const usageByCategoryData = [
    { 
      category: 'Painkillers', 
      currentMonth: 2200, 
      nextMonth: 2350 
    },
    { 
      category: 'Antibiotics', 
      currentMonth: 1800, 
      nextMonth: 1900 
    },
    { 
      category: 'Antacids', 
      currentMonth: 1500, 
      nextMonth: 1600 
    },
    { 
      category: 'Vitamins', 
      currentMonth: 1700, 
      nextMonth: 1750 
    }
  ];

  // Month-over-month comparison data
  const monthOverMonthData = [
    { 
      medicine: 'Paracetamol', 
      thisMonth: 1150, 
      lastMonth: 980, 
      change: 17.3,
      changeColor: '#34568B'
    },
    { 
      medicine: 'Amoxicillin', 
      thisMonth: 920, 
      lastMonth: 850, 
      change: 8.2,
      changeColor: '#34568B'
    },
    { 
      medicine: 'Omeprazole', 
      thisMonth: 680, 
      lastMonth: 720, 
      change: -5.6,
      changeColor: '#FF4136'
    },
    { 
      medicine: 'Vitamin D', 
      thisMonth: 950, 
      lastMonth: 890, 
      change: 6.7,
      changeColor: '#34568B'
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
        title="Monthly Medicine Report"
        subtitle="Monthly medicine trends and analysis"
      />
      
      <main className="p-4 sm:p-6 mt-28 md:mt-24">
        <div className="grid grid-cols-1 gap-6">
          {/* Monthly Usage Trends Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Monthly Usage Trends</h2>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 160]} />
                  <Tooltip />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                  />
                  
                  <Line 
                    type="monotone" 
                    dataKey="Painkillers" 
                    stroke={COLORS.Painkillers} 
                    dot={{ stroke: COLORS.Painkillers, strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Antibiotics" 
                    stroke={COLORS.Antibiotics} 
                    dot={{ stroke: COLORS.Antibiotics, strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Antacids" 
                    stroke={COLORS.Antacids} 
                    dot={{ stroke: COLORS.Antacids, strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Vitamins" 
                    stroke={COLORS.Vitamins} 
                    dot={{ stroke: COLORS.Vitamins, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Usage by Category and Month-over-Month Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Usage by Category */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Usage by Category</h2>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageByCategoryData}>
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 2400]} />
                    <Tooltip />
                    
                    <Bar 
                      dataKey="currentMonth" 
                      fill={COLORS.Painkillers} 
                      name="Current Month"
                    />
                    <Bar 
                      dataKey="nextMonth" 
                      fill={COLORS.Antacids} 
                      name="Next Month (Predicted)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Month-over-Month Comparison */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Month-over-Month Comparison</h2>
              
              <div className="space-y-4">
                {monthOverMonthData.map((item, index) => (
                  <div key={index} className="flex flex-col bg-[#F9FAFB] rounded-xl w-full p-3">
                    <div className="flex justify-between items-center  mb-2">
                      <span className="font-medium">{item.medicine}</span>
                      <div 
                        className="px-2 py-1 rounded-2xl text-sm font-semibold"
                        style={{ 
                          backgroundColor: item.changeColor === '#FF4136' 
                            ? 'rgba(255, 65, 54, 0.1)' 
                            : 'rgba(52, 86, 139, 0.1)',
                          color: item.changeColor 
                        }}
                      >
                        {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      This Month: {item.thisMonth} units
                      <span className="ml-2 text-gray-400">Last Month: {item.lastMonth} units</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MonthlyMedicineReport;