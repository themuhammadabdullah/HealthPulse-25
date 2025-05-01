import React, { useState, useContext, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
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

const YearlyMedicineReport = () => {
  const { isOpen } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Colors matching the original design
  const COLORS = {
    lastYear: '#6a5acd',    // Dark purple for Last Year
    thisYear: '#8884d8',    // Light purple for This Year
    predicted: '#00c0ef'    // Bright blue
  };

  // Yearly usage data
  const yearlyUsageData = [
    { month: 'Jan', lastYear: 2800, thisYear: 2900, predicted: 3000 },
    { month: 'Feb', lastYear: 2700, thisYear: 2800, predicted: 2900 },
    { month: 'Mar', lastYear: 3100, thisYear: 3200, predicted: 3300 },
    { month: 'Apr', lastYear: 3000, thisYear: 3100, predicted: 3200 },
    { month: 'May', lastYear: 3050, thisYear: 3150, predicted: 3250 },
    { month: 'Jun', lastYear: 3200, thisYear: 3300, predicted: 3400 },
    { month: 'Jul', lastYear: 3300, thisYear: 3400, predicted: 3500 },
    { month: 'Aug', lastYear: 3250, thisYear: 3350, predicted: 3450 },
    { month: 'Sep', lastYear: 3200, thisYear: 3300, predicted: 3400 },
    { month: 'Oct', lastYear: 3300, thisYear: 3400, predicted: 3500 },
    { month: 'Nov', lastYear: 3450, thisYear: 3550, predicted: 3650 },
    { month: 'Dec', lastYear: 3600, thisYear: 3700, predicted: 3800 }
  ];

  // Monthly growth comparison data
  const monthlyGrowthData = [
    { month: 'Feb', lastYear: 2700, thisYear: 3000 },
    { month: 'Apr', lastYear: 3000, thisYear: 3200 },
    { month: 'Jun', lastYear: 3200, thisYear: 3400 },
    { month: 'Aug', lastYear: 3250, thisYear: 3450 },
    { month: 'Oct', lastYear: 3300, thisYear: 3500 },
    { month: 'Dec', lastYear: 3600, thisYear: 3800 }
  ];

  // Seasonal trends data
  const seasonalTrendsData = {
    Winter: [
      { medicine: 'Flu Medicine', units: 2500, increase: 45 },
      { medicine: 'Vitamin C', units: 2200, increase: 35 },
      { medicine: 'Cough Syrup', units: 2000, increase: 40 }
    ],
    Spring: [
      { medicine: 'Allergy Medicine', units: 2300, increase: 25 },
      { medicine: 'Eye Drops', units: 1800, increase: 15 },
      { medicine: 'Nasal Spray', units: 1600, increase: 20 }
    ],
    Summer: [
      { medicine: 'Sunscreen', units: 2800, increase: 30 },
      { medicine: 'Rehydration Salts', units: 2100, increase: 25 },
      { medicine: 'Burn Relief', units: 1900, increase: 20 }
    ],
    Fall: [
      { medicine: 'Immune Boosters', units: 2400, increase: 35 },
      { medicine: 'Vitamin D', units: 2000, increase: 30 },
      { medicine: 'Cold Medicine', units: 1800, increase: 25 }
    ]
  };

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
        title="Yearly Medicine Report"
        subtitle="Annual medicine statistics and trends"
      />
      
      <main className="p-4 sm:p-6 mt-28 md:mt-24">
        <div className="grid grid-cols-1 gap-6">
          {/* Yearly Usage Comparison & Prediction Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Yearly Usage Comparison & Prediction</h2>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 6000]} />
                  <Tooltip />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                  />
                  
                  <Area 
                    type="monotone" 
                    dataKey="lastYear" 
                    stroke={COLORS.lastYear} 
                    fill={`${COLORS.lastYear}33`}
                    name="Last Year"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="thisYear" 
                    stroke={COLORS.thisYear} 
                    fill={`${COLORS.thisYear}33`}
                    name="This Year"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke={COLORS.predicted} 
                    fill={`${COLORS.predicted}33`}
                    name="Predicted"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Growth Comparison and Seasonal Trends */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Growth Comparison */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Monthly Growth Comparison</h2>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyGrowthData}>
                    <XAxis 
                      dataKey="month" 
                      interval={0}  // Show selected month labels
                    />
                    <YAxis domain={[0, 1000]} />
                    <Tooltip />
                    
                    <Bar 
                      dataKey="lastYear" 
                      fill={COLORS.lastYear}  // Dark purple 
                      name="Last Year"
                    />
                    <Bar 
                      dataKey="thisYear" 
                      fill={COLORS.thisYear}  // Light purple
                      name="This Year"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend at the bottom */}
              <div className="flex justify-center mt-4 space-x-4">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 mr-2" 
                    style={{ backgroundColor: COLORS.lastYear }}
                  />
                  <span>Last Year</span>
                </div>
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 mr-2" 
                    style={{ backgroundColor: COLORS.thisYear }}
                  />
                  <span>This Year</span>
                </div>
              </div>
            </div>

            {/* Seasonal Trends */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Seasonal Trends</h2>
              
              <div className="space-y-4">
                {Object.entries(seasonalTrendsData).map(([season, medicines]) => (
                  <div key={season} className="mb-4">
                    <h3 className="text-base font-semibold mb-2">{season}</h3>
                    <div className="space-y-2 ">
                      {medicines.map((medicine, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between bg-[#F9FAFB] rounded-xl p-3 items-center"
                        >
                          <span className="font-medium">{medicine.medicine}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {medicine.units} units
                            </span>
                            <span 
                              className="px-2 py-1 rounded text-xs font-semibold"
                              style={{ 
                                backgroundColor: 'rgba(52, 86, 139, 0.1)',
                                color: '#34568B'
                              }}
                            >
                              +{medicine.increase}%
                            </span>
                          </div>
                        </div>
                      ))}
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

export default YearlyMedicineReport;