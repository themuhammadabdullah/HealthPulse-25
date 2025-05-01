import React, { useState, useEffect } from 'react';
import { Bell, User, Clock, AlertTriangle, Activity, Pill, MapPin, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { useOutletContext } from 'react-router-dom';
import DiseaseHeatmap from './DiseaseHeatmap';
import Header from './Header';
import { SidebarContext } from './DashboardLayout';
import { useContext } from 'react';
const AnalysisDashboard = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isOpen } = useContext(SidebarContext);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const diseaseData = [
    { month: 'Jan', cases: 4500 },
    { month: 'Feb', cases: 3200 },
    { month: 'Mar', cases: 2000 },
    { month: 'Apr', cases: 2800 },
    { month: 'May', cases: 2200 },
    { month: 'Jun', cases: 2500 }
  ];
  
  const medicineDistribution = [
    { name: 'Antibiotics', value: 33, color: '#2C3E50', labelColor: '#34568B' },
    { name: 'Painkillers', value: 25, color: '#3498DB', labelColor: '#3498DB' },
    { name: 'Vaccines', value: 25, color: '#2ECC71', labelColor: '#2ECC71' },
    { name: 'Others', value: 17, color: '#95A5A6', labelColor: '#95A5A6' }
  ];

  const topDiseases = [
    { name: 'Influenza', cases: 450, trend: '+15%' },
    { name: 'COVID-19', cases: 380, trend: '-8%' },
    { name: 'Dengue', cases: 220, trend: '+12%' },
    { name: 'Malaria', cases: 180, trend: '-5%' },
    { name: 'Pneumonia', cases: 150, trend: '+7%' }
  ];

  const topMedicines = [
    { name: 'Amoxicillin', demand: 1200, trend: '+18%' },
    { name: 'Paracetamol', demand: 980, trend: '+12%' },
    { name: 'Ibuprofen', demand: 850, trend: '+15%' },
    { name: 'Azithromycin', demand: 720, trend: '+10%' },
    { name: 'Hydroxychloroquine', demand: 650, trend: '-5%' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name }) => {
    const radius = outerRadius * 1.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const textAnchor = (cos >= 0 ? 'start' : 'end');

    return (
      <text 
        x={x} 
        y={y} 
        fill={medicineDistribution[index].color}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fontSize="13"
        fontWeight="500"
      >
        {`${name} ${value}%`}
      </text>
    );
  };

  return (
    <div 
      style={{
        marginLeft: windowWidth >= 1024 ? (isOpen ? '256px' : '80px') : '0',
        transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        paddingTop: '60px'
      }}
      className="bg-[#F9FAFB] min-h-screen"
    >
     <Header 
        title="Analysis Overview" 
        subtitle="Monitor disease predictions and medicine demand forecasts" 
      />

      <div className="p-4 sm:p-6 mt-[98px] sm:mt-24 md:mt-10">
        {/* Page Title */}
     

        {/* Alert Sections */}
        <div className="space-y-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-600">
              <Clock size={20} />
              <AlertTriangle size={20} />
              <span className="font-medium">High Risk Alert</span>
            </div>
            <p className="text-red-600 mt-1">Flu cases rising in North Region. Expected 50% increase in next week.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={20} />
              <span className="font-medium">Medicine Stock Alert</span>
            </div>
            <p className="text-gray-600 mt-1">Antibiotic demand expected to surge by 30% in South Region.</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
          <select className="border border-gray-200 rounded-lg p-2  bg-white">
            <option>Select Region</option>
          </select>
          <select className="border border-gray-200 rounded-lg p-3 bg-white">
            <option>Select Disease</option>
          </select>
          <select className="border border-gray-200 rounded-lg p-3 bg-white">
            <option>Time Period</option>
          </select>
          <div className="flex gap-2">
  <button className="flex-1 bg-[#34568B] text-white rounded-lg px-4 py-3">
    Apply Filters
  </button>
  <button className="px-4 py-3 border border-gray-200 rounded-lg bg-white flex items-center gap-2 hover:bg-gray-50">
    <Download size={20} className="text-gray-600" />
    <span className="text-gray-600">Export</span>
  </button>
</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Disease Predictions</h3>
                <p className="text-3xl font-bold mt-2">128</p>
                <p className="text-green-500 text-sm mt-1">
                  ↑ +12.5% Predicted cases next month
                </p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg">
                <Activity size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Medicine Demand</h3>
                <p className="text-3xl font-bold mt-2">2,847</p>
                <p className="text-green-500 text-sm mt-1">
                  ↑ +23.1% Units needed
                </p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg">
                <Pill size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Affected Regions</h3>
                <p className="text-3xl font-bold mt-2">24</p>
                <p className="text-red-500 text-sm mt-1">
                  ↓ -5.0% Active outbreak areas
                </p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <MapPin size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
  <DiseaseHeatmap />
</div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Disease Trends Chart */}
         {/* Disease Trends Chart */}
<div className="bg-white p-6 rounded-lg border border-gray-200">
  <h3 className="text-lg font-medium text-gray-900 mb-4">Disease Trends & Predictions</h3>
  <div className="h-[300px] sm:h-[400px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={diseaseData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#87d4bc" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="#b7edd7" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={true} 
          horizontal={true}
          stroke="#E5E7EB"
        />
        <XAxis 
          dataKey="month" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
        />
        <YAxis 
          domain={[0, 6000]} 
          ticks={[0, 1500, 3000, 4500, 6000]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '8px'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="cases" 
          stroke="#87d4bc"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorCases)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
</div>

{/* Medicine Distribution Chart */}
<div className="bg-white p-6 rounded-lg border border-gray-200">
  <h3 className="text-lg font-medium text-gray-900 mb-4">Medicine Demand Distribution</h3>
  <div className="h-[300px] sm:h-[400px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={medicineDistribution}
          cx="50%"
          cy="50%"
          labelLine={{
            stroke: '#CBD5E1',
            strokeWidth: 1,
            opacity: 0.8,
            strokeDasharray: '2 2'
          }}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
            const RADIAN = Math.PI / 180;
            const radius = outerRadius * 1.35;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            
            return (
              <g>
                <text
                  x={x}
                  y={y}
                  fill={medicineDistribution[index].labelColor}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize="13"
                  fontWeight="500"
                >
                  {`${name} ${value}%`}
                </text>
              </g>
            );
          }}
          outerRadius={90}
          innerRadius={70}
          dataKey="value"
          startAngle={90}
          endAngle={450}
        >
          {medicineDistribution.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              strokeWidth={0}
            />
          ))}
        </Pie>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            paddingTop: '20px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
        </div>

        {/* Additional Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 Predicted Diseases</h3>
            <div className="space-y-4">
              {topDiseases.map((disease, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">#{index + 1}</span>
                    <span className="font-medium">{disease.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">{disease.cases} cases</span>
                    <span className={`${
                      disease.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {disease.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 Medicines in Demand</h3>
            <div className="space-y-4">
              {topMedicines.map((medicine, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">#{index + 1}</span>
                    <span className="font-medium">{medicine.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">{medicine.demand} units</span>
                    <span className={`${
                      medicine.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {medicine.trend}
                    </span>
                  </div>

</div>

))}
</div>
</div>
</div>

{/* Forecast Section */}
<div className="mt-8">
<div className="bg-white p-6 rounded-lg border border-gray-200">
<h3 className="text-lg font-medium text-gray-900 mb-4">Next Month Forecast</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
<h4 className="font-medium text-gray-800 mb-2">Disease Outlook</h4>
<ul className="space-y-2">
<li className="flex items-center justify-between">
  <span className="text-gray-600">Expected New Cases</span>
  <span className="font-medium">580</span>
</li>
<li className="flex items-center justify-between">
  <span className="text-gray-600">High Risk Areas</span>
  <span className="font-medium">12</span>
</li>
<li className="flex items-center justify-between">
  <span className="text-gray-600">Risk Level</span>
  <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-sm">Moderate</span>
</li>
</ul>
</div>

<div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
<h4 className="font-medium text-gray-800 mb-2">Medicine Requirements</h4>
<ul className="space-y-2">
<li className="flex items-center justify-between">
  <span className="text-gray-600">Total Units Needed</span>
  <span className="font-medium">3,450</span>
</li>
<li className="flex items-center justify-between">
  <span className="text-gray-600">Stock Alert Level</span>
  <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-sm">Optimal</span>
</li>
<li className="flex items-center justify-between">
  <span className="text-gray-600">Restock Required</span>
  <span className="font-medium">2 Items</span>
</li>
</ul>
</div>

<div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
<h4 className="font-medium text-gray-800 mb-2">Regional Impact</h4>
<ul className="space-y-2">
<li className="flex items-center justify-between">
  <span className="text-gray-600">Affected Areas</span>
  <span className="font-medium">18</span>
</li>
<li className="flex items-center justify-between">
  <span className="text-gray-600">Population at Risk</span>
  <span className="font-medium">245K</span>
</li>
<li className="flex items-center justify-between">
  <span className="text-gray-600">Resource Status</span>
  <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded text-sm">Prepared</span>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
);
};

export default AnalysisDashboard;