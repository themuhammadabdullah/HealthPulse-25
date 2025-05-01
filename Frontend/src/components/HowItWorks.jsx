import React from 'react';
import { Database, Brain, Zap, LineChart, Shield, Users, AlertCircle, Activity, Info } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const HowItWorks = () => {
  const processSteps = [
    {
      icon: <Database className="w-6 h-6 text-blue-800" />,
      title: "Data Collection",
      description: "Secure gathering of healthcare data from multiple sources including hospitals, clinics, and research centers."
    },
    {
      icon: <Brain className="w-6 h-6 text-blue-800" />,
      title: "AI Processing",
      description: "Advanced machine learning algorithms analyze patterns and trends in the collected data."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-800" />,
      title: "Real-time Insights",
      description: "Instant generation of actionable insights and predictive analytics for healthcare providers."
    },
    {
      icon: <LineChart className="w-6 h-6 text-blue-800" />,
      title: "Predictive Analysis",
      description: "Forecast potential health trends and disease outbreaks with high accuracy."
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-800" />,
      title: "Security Measures",
      description: "Enterprise-grade security protocols ensuring HIPAA compliance and data protection."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-800" />,
      title: "Collaboration",
      description: "Enable seamless sharing of insights among healthcare professionals and institutions."
    }
  ];

  const chartData = [
    { month: 'Jan', actualCases: 350, aiPrediction: 365 },
    { month: 'Feb', actualCases: 280, aiPrediction: 290 },
    { month: 'Mar', actualCases: 500, aiPrediction: 485 },
    { month: 'Apr', actualCases: 300, aiPrediction: 310 },
    { month: 'May', actualCases: 600, aiPrediction: 590 },
    { month: 'Jun', actualCases: 700, aiPrediction: 695 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <p className="text-sm text-[#34568B]">
            Actual Cases: {payload[0].value}
          </p>
          <p className="text-sm text-emerald-600">
            AI Prediction: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const keyBenefits = [
    {
      title: "Improved Patient Care",
      description: "Make data-driven decisions that lead to better patient outcomes and experiences."
    },
    {
      title: "Resource Optimization",
      description: "Efficiently allocate healthcare resources based on predicted demand and trends."
    },
    {
      title: "Early Detection",
      description: "Identify potential health issues and outbreaks before they become critical."
    },
    {
      title: "Cost Reduction",
      description: "Minimize operational costs through predictive resource management."
    }
  ];

  return (
    <div className=" bg-white pb-16 ">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16 bg-[#FAFAFA] py-12">
          <h1 className=" text-3xl md:text-4xl 2xl:text-[5xl] font-bold text-[#34568B] mb-4">
            How HealthPulse Works
          </h1>
          <p className="text-gray-600 max-w-3xl md:text-lg mx-auto">
            Transform healthcare delivery with our advanced predictive analytics platform. Discover how we 
            turn complex health data into actionable insights.
          </p>
        </div>

        {/* Process Section */}
        <div className="mb-20 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl 2xl:text-[4xl] font-bold text-center text-[#34568B] mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#34568B] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <div className="mb-20 px-4 sm:px-6 lg:px-8 py-10 bg-[#FAFAFA]">
          <h2 className="text-3xl font-bold 2xl:text-[4xl]  text-center text-[#34568B] mb-8">
            See It In Action
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Experience the power of HealthAnalytica through our interactive demo. Witness how 
            our platform transforms healthcare data into actionable insights.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demo Features */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg flex items-start gap-4">
                <Info className="w-5 h-5 text-[#34568B] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Predictive Analysis Demo</h3>
                  <p className="text-sm text-gray-600">Watch our AI predict disease outbreaks with up to 99.9% accuracy based on historical data patterns.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start gap-4">
                <Activity className="w-5 h-5 text-[#34568B] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Real-Time Monitoring</h3>
                  <p className="text-sm text-gray-600">See how our platform tracks and analyzes healthcare metrics in real-time.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-[#34568B] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Early Warning System</h3>
                  <p className="text-sm text-gray-600">Experience our alert system that notifies healthcare providers of potential outbreaks.</p>
                </div>
              </div>

              <button className="w-full 2xl:text-[4xl]  cursor-pointer bg-[#34568B] text-white py-3 rounded-md hover:bg-blue-900 transition-colors mt-4">
                See on Dashboard
              </button>
            </div>

            {/* Graph */}
            <div className="bg-white md:p-6 rounded-lg shadow-md h-96 pb-14">
              <h3 className="text-lg font-semibold mb-4">Disease Prediction Accuracy</h3>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f6" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actualCases" 
                    name="Actual Cases"
                    stroke="#34568B"
                    strokeWidth={2}
                    dot={{ fill: '#34568B', r: 4 }}
                    activeDot={{ r: 6, fill: '#34568B' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="aiPrediction" 
                    name="AI Prediction"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6, fill: '#10b981' }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className='px-4 sm:px-6 lg:px-8'>
          <h2 className="text-3xl font-bold text-center 2xl:text-[4xl]  text-[#34568B] mb-12">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#34568B] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 ">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;