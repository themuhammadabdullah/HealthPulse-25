import React, { useState, useContext, useEffect } from 'react';
import { SidebarContext } from './DashboardLayout';
import Header from './Header';
import { Edit, Trash2, X, Plus } from 'lucide-react';
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from '../../api/faqAPI';

const ManageFAQs = () => {
  const { isOpen } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentFaq, setCurrentFaq] = useState({ id: null, question: '', answer: '' });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const data = await getAllFAQs();
      setFaqs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load FAQs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setModalType('add');
    setCurrentFaq({ id: null, question: '', answer: '' });
    setModalOpen(true);
  };

  const openEditModal = (faq) => {
    setModalType('edit');
    setCurrentFaq({ id: faq._id, question: faq.question, answer: faq.answer });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFaq(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!currentFaq.question.trim() || !currentFaq.answer.trim()) {
      showNotification('Question and Answer are required', 'error');
      return;
    }

    try {
      if (modalType === 'add') {
        await createFAQ({ question: currentFaq.question, answer: currentFaq.answer });
        showNotification('FAQ added successfully', 'success');
      } else {
        await updateFAQ(currentFaq.id, { question: currentFaq.question, answer: currentFaq.answer });
        showNotification('FAQ updated successfully', 'success');
      }
      fetchFAQs();
      closeModal();
    } catch (err) {
      showNotification(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFAQ(id);
      showNotification('FAQ deleted successfully', 'success');
      fetchFAQs();
    } catch (err) {
      showNotification(err.message || 'Failed to delete FAQ', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#34568B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-40 sm:pt-32 md:pt-0 bg-[#F9FAFB]"
      style={{
        marginLeft: windowWidth >= 1024 ? (isOpen ? "256px" : "80px") : "0",
        transition: "margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Header
        title="Manage FAQs"
        subtitle="Add, edit, or remove frequently asked questions"
      />
      
      <main className="p-4 sm:p-6 md:mt-24">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchFAQs}
              className="mt-2 text-red-600 hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-6 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800">Frequently Asked Questions</h2>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 cursor-pointer bg-[#34568B] text-white px-4 py-2 rounded-md hover:bg-[#2a4a74] transition-colors"
            >
              <Plus size={16} />
              <span>Add FAQ</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Question</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Answer</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {faqs.map((faq) => (
                  <tr key={faq._id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm text-gray-800 max-w-[250px] font-semibold truncate">{faq.question}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 max-w-[400px] truncate">{faq.answer}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => openEditModal(faq)}
                          className="p-1 text-gray-500 cursor-pointer hover:text-[#34568B] hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(faq._id)}
                          className="p-1 text-gray-500 cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {faqs.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-gray-500">
                      No FAQs found. Click the "Add FAQ" button to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">{modalType === 'add' ? 'Add New FAQ' : 'Edit FAQ'}</h3>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-full cursor-pointer hover:bg-gray-100/80 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                    <input
                      type="text"
                      name="question"
                      value={currentFaq.question}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent transition-all bg-white/50"
                      placeholder="Enter your question"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                    <textarea
                      name="answer"
                      value={currentFaq.answer}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent transition-all resize-none bg-white/50"
                      placeholder="Enter your answer"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 text-gray-700 hover:bg-gray-100/80 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-[#34568B] text-white rounded-lg hover:bg-[#2a4a74] transition-colors font-medium"
                  >
                    {modalType === 'add' ? 'Add FAQ' : 'Update FAQ'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border-l-4 ${
          notification.type === 'success' ? 'border-green-500' : 'border-red-500'
        } animate-slide-in z-50`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ManageFAQs;