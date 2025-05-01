import React from 'react';
import { CircleSlash, Heart, LineChart, Shield, Users, UserCog } from 'lucide-react';
import female from "../assets/ai-generated-young-muslim-woman-doctor-in-white-coat-with-stethoscope-photo.jpg"
import doctor from "../assets/doctor-offering-medical-teleconsultation.jpg"
import director from "../assets/portrait-outdoors-successful-business-person.jpg"
const AboutPage = () => {
  const features = [
    {
      icon: <CircleSlash className="w-6 h-6 text-blue-800" />,
      title: "Intelligent Analytics",
      description: "Advanced AI algorithms for precise healthcare predictions"
    },
    {
      icon: <Heart className="w-6 h-6 text-blue-800" />,
      title: "Patient-Centered",
      description: "Focusing on improving patient outcomes through data"
    },
    {
      icon: <LineChart className="w-6 h-6 text-blue-800" />,
      title: "Predictive Insights",
      description: "Anticipating healthcare trends and needs"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-800" />,
      title: "Secure Data",
      description: "Enterprise-grade security for healthcare data"
    },
    {
      icon: <UserCog className="w-6 h-6 text-blue-800" />,
      title: "Expert Team",
      description: "Healthcare and data science professionals"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-800" />,
      title: "Collaborative Approach",
      description: "Working together for better healthcare"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Data Scientist",
      profile:female,
      description: "Leading our predictive analytics initiatives with 15+ years of healthcare data experience."
    },
    {
      name: "Michael Chen",
      role: "Healthcare Analytics Director",
      profile:director,
      description: "Specializing in population health metrics and outcome predictions."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Medical Director",
      profile:doctor,
      description: "Ensuring our analytics align with clinical best practices and patient care."
    }
  ];

  return (
    <div className=" bg-white pb-16   ">
      <div className="w-full mx-auto ">
        {/* Hero Section */}
        <div className="text-center py-12 2xl:py-20 mb-16 bg-[#FAFAFA]">
          <h1 className="text-3xl md:text-4xl 2xl:text-5xl font-bold text-[#34568B] mb-4">
            Transforming Healthcare Through Data
          </h1>
          <p className="text-gray-600 px-3 max-w-3xl mx-auto md:text-lg">
            We're a team of healthcare professionals, data scientists, and technologists working 
            together to improve patient outcomes through advanced analytics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#34568B] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20 bg-[#FAFAFA] py-8 px-5">
          <h2 className="text-3xl 2xl:[text-4xl] font-bold text-center text-[#34568B] mb-20">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32  rounded-full mx-auto mb-4"><img className='rounded-full w-full h-full object-contain object-cover' src={member.profile}/></div>
                <h3 className="text-xl font-semibold text-[#34568B] mb-1">
                  {member.name}
                </h3>
                <h4 className="text-sm font-medium text-[#34568B] mb-2">
                  {member.role}
                </h4>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#34568B] 2xl:[text-4xl] mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg">
            To revolutionize healthcare decision-making through advanced analytics, ensuring 
            better patient outcomes and more efficient healthcare delivery for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;