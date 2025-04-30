import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getAllFAQs } from '../api/faqAPI';

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 ">
      <button 
        className="w-full py-4 px-6 text-left flex justify-between items-center focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="font-medium text-gray-800">{question}</span>
        <span className="text-gray-500 cursor-pointer">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getAllFAQs();
        setFaqs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load FAQs. Please try again later.');
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#34568B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 text-[#34568B] hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl 2xl:text-[5xl] text-[#34568B] font-bold">Frequently Asked Questions</h1>
          <p className="mt-4 text-gray-600">
            Find answers to common questions about HealthPulse and how our platform 
            can help improve healthcare analytics and outcomes.
          </p>
        </div>

        <div className="bg-white max-w-3xl mx-auto rounded-lg shadow-sm overflow-hidden">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <FAQItem
                key={faq._id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleFAQ(index)}
              />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No FAQs available at the moment.
            </div>
          )}
        </div>
        
        {/* Support Section */}
        <div className="mt-12 py-8 bg-white border-t w-[100%] border-gray-200">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900">Didn't find what you were looking for?</h2>
            <p className="mt-2 text-gray-600">Our support team is ready to answer any additional questions you may have.</p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate('/contact-us')}
                className="flex items-center cursor-pointer bg-[#34568B] hover:bg-[#2a4a74] text-white px-4 py-2 rounded shadow-sm transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;