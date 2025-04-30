import React, { useState, useContext, useEffect } from 'react';
import { SidebarContext } from './DashboardLayout';
import Header from './Header';
import { Search, Mail, Phone, Trash2, Send, X } from 'lucide-react';

const ContactManagement = () => {
  const { isOpen } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      date: 'Apr 27',
      message: "I'm having issues with my recent order #ORD-7890. Can someone assist me?",
      status: 'unread'
    },
    {
      id: 2,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 (555) 456-7890',
      date: 'Apr 25',
      message: "Hello, I'd like to inquire about your premium services. What options do you offer?",
      status: 'read'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 234-5678',
      date: 'Apr 23',
      message: "I need help with my account settings. I can't seem to update my payment information.",
      status: 'unread'
    },
    {
      id: 4,
      name: 'Michael Wilson',
      email: 'michael@example.com',
      phone: '+1 (555) 876-5432',
      date: 'Apr 20',
      message: "I'm interested in your product. Can you send me a brochure or additional information?",
      status: 'read'
    }
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Set first contact as selected by default when the component mounts
    if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts]);

  useEffect(() => {
    // Initialize reply subject when a contact is selected
    if (selectedContact) {
      setReplySubject(`Re: Inquiry from ${selectedContact.name}`);
    }
  }, [selectedContact]);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setShowReplyForm(false);
    
    // Mark as read when selected
    if (contact.status === 'unread') {
      const updatedContacts = contacts.map(c => 
        c.id === contact.id ? { ...c, status: 'read' } : c
      );
      setContacts(updatedContacts);
    }
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    
    // If the deleted contact was selected, select the first contact in the updated list
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact(updatedContacts.length > 0 ? updatedContacts[0] : null);
      setShowReplyForm(false);
    }
    
    // Show notification
    setNotification({ show: true, message: 'Contact deleted' });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const handleReplyClick = () => {
    setShowReplyForm(true);
    // Pre-populate the reply message with a template
    setReplyMessage(`Dear ${selectedContact.name},\n\nThank you for reaching out to us. Regarding your message:\n\n"${selectedContact.message}"\n\n`);
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  const handleSendReply = () => {
    // Here you would typically send the reply via an API
    // For now, we'll just show a notification
    setNotification({ show: true, message: 'Reply sent successfully' });
    
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
    
    setShowReplyForm(false);
  };

  const filteredContacts = contacts;

  return (
    <div
      className="min-h-screen bg-[#F9FAFB]"
      style={{
        marginLeft: windowWidth >= 1024 ? (isOpen ? "256px" : "80px") : "0",
        transition: "margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Header
        title="Contact Management"
        subtitle="View and manage customer inquiries and contact requests"
      />
      
      <main className="pt-40 sm:pt-32 md:pt-28 lg:pt-32 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contacts List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Contacts</h2>
              <p className="text-sm text-gray-500 mt-1">Manage your customer inquiries</p>
            </div>
            
            <div className="overflow-y-auto max-h-[500px]">
              {filteredContacts.length > 0 ? (
                <ul>
                  {filteredContacts.map((contact) => (
                    <li 
                      key={contact.id}
                      onClick={() => handleContactSelect(contact)}
                      className={`cursor-pointer border-b border-gray-100 hover:bg-[#34568B]/10 transition-colors ${selectedContact?.id === contact.id ? 'bg-[#34568B]/10' : ''}`}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-gray-800">{contact.name}</h3>
                          <span className="text-sm text-gray-500">{contact.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                          <Mail size={14} />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Phone size={14} />
                            <span>{contact.phone}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${contact.status === 'unread' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No contacts found
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
            {selectedContact ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Contact Details</h2>
                  <p className="text-sm text-gray-500 mt-1">Viewing details for {selectedContact.name}</p>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{selectedContact.name}</h3>
                      <p className="text-sm text-gray-500">Received on Sunday, April 27, 2025</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Read</span>
                      <button 
                        onClick={() => handleDeleteContact(selectedContact.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail size={16} className="text-gray-500" />
                      <span>{selectedContact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <span>{selectedContact.phone}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-700 font-medium mb-3">Message</h4>
                    <div className="p-4 border border-gray-200 rounded-lg bg-white">
                      <p>{selectedContact.message}</p>
                    </div>
                  </div>
                  
                  {!showReplyForm ? (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleReplyClick}
                        className="px-5 py-2.5 bg-[#34568B] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#2a4a74] cursor-pointer transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
                          <path d="m22 2-7 20-4-9-9-4Z"></path>
                          <path d="M22 2 11 13"></path>
                        </svg>
                        Reply
                      </button>
                    </div>
                  ) : (
                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-gray-700 font-medium">Reply to {selectedContact.name}</h4>
                        <button 
                          onClick={handleCancelReply}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                          <input
                            type="text"
                            id="subject"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#34568B] focus:border-[#34568B] outline-none"
                            value={replySubject}
                            onChange={(e) => setReplySubject(e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                          <textarea
                            id="message"
                            rows={5}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#34568B] focus:border-[#34568B] outline-none"
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={handleCancelReply}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSendReply}
                            className="px-5 py-2 bg-[#34568B] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#2a4a74]"
                          >
                            <Send size={16} />
                            Send Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No contact selected
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Notification */}
      {notification.show && (
        <div className="fixed top-16 right-4 bg-white rounded-md shadow-lg p-4 border-l-4 border-green-500 z-50 max-w-sm">
          <h3 className="font-medium">{notification.message}</h3>
          <p className="text-gray-600 text-sm">
            {notification.message === 'Contact deleted' 
              ? 'The contact has been successfully removed.' 
              : 'Your reply has been sent successfully.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;