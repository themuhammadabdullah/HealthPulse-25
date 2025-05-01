import React, { useState, useContext, useEffect } from 'react';
import { SidebarContext } from './DashboardLayout';
import Header from './Header';
import { Edit, Trash2, X, AlertTriangle, Info, CheckCircle, Plus } from 'lucide-react';

const AlertManagement = () => {
  const { isOpen } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'High Risk Alert',
      message: 'Flu cases rising in North Region. Expected 50% increase in next week.',
      type: 'danger',
      priority: 'high',
      status: 'active',
      created: '5/1/2025 6:13:58 PM'
    },
    {
      id: 2,
      title: 'Medicine Stock Alert',
      message: 'Antibiotic demand expected to surge by 30% in South Region.',
      type: 'info',
      priority: 'medium',
      status: 'active',
      created: '5/1/2025 6:13:58 PM'
    },
    {
      id: 3,
      title: 'COVID-19 Update',
      message: 'New variant detected in East Region. Monitoring situation.',
      type: 'info',
      priority: 'medium',
      status: 'pending',
      created: '5/1/2025 6:13:58 PM'
    },
    {
      id: 4,
      title: 'Vaccination Program Success',
      message: 'West Region achieves 95% vaccination rate.',
      type: 'success',
      priority: 'low',
      status: 'resolved',
      created: '5/1/2025 6:13:58 PM'
    }
  ]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState({
    id: null,
    title: '',
    message: '',
    type: 'info',
    priority: 'medium',
    status: 'active'
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openAddModal = () => {
    setModalType('add');
    setCurrentAlert({
      id: null,
      title: '',
      message: '',
      type: 'info',
      priority: 'medium',
      status: 'active'
    });
    setModalOpen(true);
  };

  const openEditModal = (alert) => {
    setModalType('edit');
    setCurrentAlert({ ...alert });
    setModalOpen(true);
  };

  const openDeleteModal = (alert) => {
    setCurrentAlert(alert);
    setDeleteModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAlert(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!currentAlert.title || !currentAlert.message) {
      showNotification('Title and message are required', 'error');
      return;
    }

    if (modalType === 'add') {
      const newAlert = {
        ...currentAlert,
        id: alerts.length + 1,
        created: new Date().toLocaleString()
      };
      
      setAlerts([...alerts, newAlert]);
      showNotification('Alert created successfully', 'success');
    } else {
      const updatedAlerts = alerts.map(alert => 
        alert.id === currentAlert.id ? { ...alert, ...currentAlert } : alert
      );
      
      setAlerts(updatedAlerts);
      showNotification('Alert updated successfully', 'success');
    }
    
    closeModal();
  };

  const handleDelete = () => {
    const updatedAlerts = alerts.filter(alert => alert.id !== currentAlert.id);
    setAlerts(updatedAlerts);
    showNotification('Alert deleted successfully', 'success');
    closeDeleteModal();
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'danger':
        return <AlertTriangle size={18} className="text-red-500" />;
      case 'info':
        return <Info size={18} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={18} className="text-green-500" />;
      default:
        return <Info size={18} className="text-blue-500" />;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F9FAFB]"
      style={{
        marginLeft: windowWidth >= 1024 ? (isOpen ? "256px" : "80px") : "0",
        transition: "margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Header
        title="Alert Management"
        subtitle="Create, view and manage system alerts and notifications"
      />
      
      <main className="pt-40 sm:pt-32 md:pt-28 lg:pt-32 p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Alert Examples</h2>
            <p className="text-gray-600 mb-6">Preview of how alerts appear to users in the system</p>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={20} className="text-red-500" />
                  <span className="font-semibold text-red-700">High Risk Alert</span>
                </div>
                <p className="text-red-700">Flu cases rising in North Region. Expected 50% increase in next week.</p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Info size={20} className="text-blue-500" />
                  <span className="font-semibold text-blue-700">Medicine Stock Alert</span>
                </div>
                <p className="text-blue-700">Antibiotic demand expected to surge by 30% in South Region.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Alerts</h2>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#34568B] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2e4b7a] transition-colors"
          >
            <Plus size={16} />
            <span>New Alert</span>
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Priority</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Created</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {alerts.map((alert) => (
                  <tr key={alert.id} className="cursor-pointer hover:bg-[#34568B]/10">
                    <td className="py-4 px-6">
                      {getAlertIcon(alert.type)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-800">{alert.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{alert.message}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        alert.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        alert.status === 'active' ? 'bg-green-100 text-green-800' : 
                        alert.status === 'pending' ? 'bg-purple-100 text-purple-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-500">{alert.created}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => openEditModal(alert)}
                          className="p-1 text-gray-500 hover:text-[#34568B] cursor-pointer hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(alert)}
                          className="p-1 text-gray-500 cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 flex items-center justify-between border-t border-gray-100">
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-[#34568B]">
              <span>Previous</span>
            </button>
            
            <div className="flex items-center">
              <button className="w-8 h-8 rounded-md flex items-center justify-center bg-[#34568B] text-white">
                1
              </button>
              <button className="w-8 h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100">
                2
              </button>
              <button className="w-8 h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100">
                3
              </button>
            </div>
            
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-[#34568B]">
              <span>Next</span>
            </button>
          </div>
        </div>
      </main>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">
                  {modalType === 'add' ? 'Create New Alert' : 'Edit Alert'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentAlert.title}
                    onChange={handleInputChange}
                    placeholder="Enter alert title"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={currentAlert.message}
                    onChange={handleInputChange}
                    placeholder="Enter alert message"
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
                    <select
                      name="type"
                      value={currentAlert.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent appearance-none bg-white"
                    >
                      <option value="info">Information</option>
                      <option value="danger">Danger</option>
                      <option value="success">Success</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      name="priority"
                      value={currentAlert.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent appearance-none bg-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={currentAlert.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent appearance-none bg-white"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 cursor-pointer bg-[#34568B] text-white rounded-lg hover:bg-[#2e4b7a] transition-colors"
                  >
                    {modalType === 'add' ? 'Create Alert' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40" onClick={closeDeleteModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Are you sure?</h3>
              <p className="text-gray-600 mb-6">
                This will permanently delete the alert "{currentAlert.title}". This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
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

export default AlertManagement;