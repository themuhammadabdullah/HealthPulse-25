import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');

    try {
      // Replace these with your actual EmailJS credentials
      const templateParams = {
        to_email: 'laibaanwar012@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      await emailjs.send(
        'service_8c0z03n', // Replace with your EmailJS service ID
        'template_m5w1rmt', // Replace with your EmailJS template ID
        templateParams,
        'EG65qwIp6_e7Lt4Y6' // Replace with your EmailJS public key
      );

      setStatus('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
      console.error('Email error:', error);
    } finally {
      setSending(false);
    }
  };

  const contactCards = [
    {
      icon: <Mail className="w-6 h-6 text-indigo-800" />,
      title: "Email Us",
      info: "suppojsjjssjthanalytica.com"
    },
    {
      icon: <Phone className="w-6 h-6 text-indigo-800" />,
      title: "Call Us",
      info: "+1 (555) 123-4567"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-indigo-800" />,
      title: "Live Chat",
      info: "Available 24/7"
    }
  ];

  return (
    <div className="min-h-screen  bg-white bg-pink-400pb-16 font-sans">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16 bg-[#FAFAFA] py-12 ">
          <h1 className="text-3xl md:text-4xl font-bold text-[#34568B] mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto px-3 md:text-lg">
            Have questions about HealthAnalytica? We're here to help. Send us a message and 
            we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
          {contactCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                {card.icon}
              </div>
              <h3 className="text-sm font-semibold text-[#34568B] mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm text-center">{card.info}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            {status && (
              <div className={`mb-4 p-3 rounded ${
                status.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {status}
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full text-white py-2 px-4 rounded-md bg-[#34568B] hover:bg-[#2a4570] transition-colors duration-300 flex items-center justify-center gap-2 text-lg font-semibold disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;