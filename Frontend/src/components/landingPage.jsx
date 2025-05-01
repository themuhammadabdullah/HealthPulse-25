import React from 'react';
import { Brain, Shield, BarChart2, Bell } from 'lucide-react';
import Navbar from './Navbar'; // Make sure to import the Navbar component
import FeaturesSection from './FeaturesSection';

const LandingPage = () => {
  const statsCards = [
    {
      icon: <Brain className="w-8 h-8 text-[#34568B]" />,
      title: "Predictive Analysis",
      value: "99.9%",
      description: "Accuracy in disease prediction"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#34568B]" />,
      title: "Data Security",
      value: "100%",
      description: "HIPAA Compliant"
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-[#34568B]" />,
      title: "Resource Optimization",
      value: "40%",
      description: "Reduction in shortages"
    },
    {
      icon: <Bell className="w-8 h-8 text-[#34568B]" />,
      title: "Real-time Alerts",
      value: "<2min",
      description: "Response time"
    }
  ];

  return (
    <div className="font-sans h-auto   bg-white overflow-x-hidden">
      
      {/* Hero Section */}
      <div className="px-4 md:px-7 lg:px-8 2xl:px-14 py-6 lg:py-10 h-auto 2xl:h-auto   w-full mx-auto lg:flex">
        <div className="w-full lg:w-[50%] mb-8 pt-3 2xl:pt-9 lg:pt-7">
          <h1 className="text-4xl leading-11 md:text-5xl lg:text-[3.6rem] 2xl:text-[4.5rem] font-bold mb-4 lg:mb-8 md:leading-12 lg:leading-14 2xl:leading-[4.8rem]">
            Transform 
            <br />
            Healthcare with{' '}
            <span className="text-[#34568B] block">Predictive Analytics</span>
          </h1>
          <p className="text-gray-600 text-[1.1rem] 2xl:text-[1.9rem] mb-5 2xl:mb-9 leading-relaxed">
            Empower your healthcare decisions with advanced analytics, machine learning, 
            and real-time insights for better public health outcomes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="bg-[#34568B] w-[95%] md:w-auto text-center text-white px-9 py-2 text-[1.1rem] 2xl:text-[1.6rem] font-semibold rounded hover:bg-[#34568B]/90 flex items-center justify-center gap-2">
              Get Started 
              <span className="text-xl">→</span>
            </button>
            <button className="bg-white w-[95%] md:w-auto text-center text-[1.1rem] font-semibold text-gray-800 2xl:text-[1.6rem] px-9 py-2 rounded border border-gray-200 hover:bg-gray-50">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2  w-full place-items-center pb-5 lg:pb-0 md:place-content-start 2xl:place-items-center 2xl:justify-center gap-y-3 gap-x-9 2xl:gap-3 lg:w-[50%] lg:pl-4 xl:pl-28 2xl:pl-20 pt-5 lg:pt-0">
          {statsCards.map((card, index) => (
            <div key={index} className="pl-5 pt-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white  w-[280px] md:w-[350px] lg:w-[230px] xl:w-[250px] h-[200px] 2xl:h-[200px] 2xl:w-[540px]">
              <div className="mb-2 text-[9rem] bg-[#E9EDF2] flex items-center justify-center rounded-lg  w-10 h-10 md:w-12 md:h-12 2xl:w-16 2xl:h-16">{card.icon}</div>
              <h3 className="text-[1.1rem] font-semibold mb-2 text-gray-800">{card.title}</h3>
              <div className="text-2xl font-bold text-[#34568B] mb-2">{card.value}</div>
              <p className="text-gray-600 text-base">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* {} features section */}
     <FeaturesSection/>
    </div>
  );
};

export default LandingPage;