import React from 'react';
import { Brain, LineChart, Activity, Bell, Shield, Users } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12 text-[#34568B]" />,
      title: "Predictive Analytics",
      description: "Leverage advanced ML algorithms to predict disease outbreaks and trends with high accuracy."
    },
    {
      icon: <LineChart className="w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12 text-[#34568B]" />,
      title: "Resource Optimization",
      description: "Optimize medicine distribution and resource allocation based on predicted demand."
    },
    {
      icon: <Activity className="w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12 text-[#34568B]" />,
      title: "Interactive Dashboards",
      description: "Visualize health data through dynamic charts, maps, and real-time analytics."
    },
    {
      icon: <Bell className="w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12 text-[#34568B]" />,
      title: "Alert System",
      description: "Receive real-time notifications about emerging health threats and critical updates."
    },
    {
      icon: <Shield className="w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12 text-[#34568B]" />,
      title: "Data Security",
      description: "Enterprise-grade security measures ensuring HIPAA compliance and data privacy."
    },
    {
      icon: <Users className="w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12 text-[#34568B]" />,
      title: "Comprehensive Support",
      description: "Access to extensive documentation, tutorials, and dedicated support team."
    }
  ];

  return (
    <section className="w-full bg-[#FAFAFA] border-t  border-gray-100">
      <div className="py-8 md:py-12 lg:py-16 2xl:py-20 px-4 md:px-7 lg:px-8 2xl:px-14">
        {/* Header Section */}
        <div className="text-center max-w-[90%] md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl mx-auto mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-[2.75rem] font-bold text-gray-900 mb-3 md:mb-4 lg:mb-5">
            Powerful Features for Healthcare Excellence
          </h2>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl 2xl:text-2xl leading-relaxed">
            Our comprehensive suite of features enables healthcare professionals to make data-driven 
            decisions and improve public health outcomes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 2xl:gap-10 max-w-[90%] md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-4 md:p-5 lg:p-6 2xl:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="bg-[#E9EDF2] w-12 h-12 md:w-14 md:h-14 2xl:w-16 2xl:h-16 rounded-lg flex items-center justify-center mb-4 md:mb-5 lg:mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl lg:text-lg 2xl:text-[1.7rem] font-semibold text-gray-900 mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-base 2xl:text-xl leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;