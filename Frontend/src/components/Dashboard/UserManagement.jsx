import React, { useState, useContext, useEffect } from 'react';
import { SidebarContext } from './DashboardLayout';
import Header from './Header';
import { Edit, Trash2, X, UserPlus } from 'lucide-react';

const UserManagement = () => {
  const { isOpen } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: 'Sarah Connor',
      email: 'sarah.connor@healthpulse.com',
      role: 'Admin',
      department: 'Administration'
    },
    {
      id: 2,
      fullName: 'John Smith',
      email: 'john.smith@healthpulse.com',
      role: 'Doctor',
      department: 'Cardiology'
    },
    {
      id: 3,
      fullName: 'Emily Johnson',
      email: 'emily.johnson@healthpulse.com',
      role: 'Staff',
      department: 'Nursing'
    },
    {
      id: 4,
      fullName: 'Michael Davis',
      email: 'michael.davis@healthpulse.com',
      role: 'Doctor',
      department: 'Neurology'
    },
    {
      id: 5,
      fullName: 'Jessica Brown',
      email: 'jessica.brown@healthpulse.com',
      role: 'Patient',
      department: 'N/A'
    }
  ]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentUser, setCurrentUser] = useState({
    id: null,
    fullName: '',
    email: '',
    password: '',
    role: 'Staff',
    department: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openAddModal = () => {
    setModalType('add');
    setCurrentUser({
      id: null,
      fullName: '',
      email: '',
      password: '',
      role: 'Staff',
      department: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setModalType('edit');
    setCurrentUser({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: '', // We don't show actual password for security
      role: user.role,
      department: user.department
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!currentUser.fullName || !currentUser.email) {
      showNotification('All fields are required', 'error');
      return;
    }

    if (modalType === 'add') {
      const newUser = {
        ...currentUser,
        id: users.length + 1
      };
      
      setUsers([...users, newUser]);
      showNotification('User added successfully', 'success');
    } else {
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? { ...user, ...currentUser } : user
      );
      
      setUsers(updatedUsers);
      showNotification('User updated successfully', 'success');
    }
    
    closeModal();
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    showNotification('User deleted successfully', 'success');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
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
        title="User Management"
        subtitle="Manage system users, roles and permissions"
      />
      
      <main className="pt-40 sm:pt-32 md:pt-28 lg:pt-32 p-4 sm:p-6">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#34568B] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#34568B] transition-colors"
          >
            <UserPlus size={16} />
            <span>Add User</span>
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">User</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Role</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="cursor-pointer hover:bg-[#34568B]/10">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {user.fullName ? (
                            <div className="bg-[#34568B] text-white w-full h-full flex items-center justify-center">
                              {user.fullName.split(' ').map(name => name[0]).join('')}
                            </div>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{user.fullName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-800">{user.role}</div>
                      <div className="text-sm text-gray-500">{user.department}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => openEditModal(user)}
                          className="p-1 text-gray-500 hover:text-[#34568B] cursor-pointer hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
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
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40" onClick={closeModal}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">{modalType === 'add' ? 'Create New User' : 'Edit User'}</h3>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={currentUser.fullName}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={currentUser.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    name="role"
                    value={currentUser.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34568B] focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Staff">Staff</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Admin">Admin</option>
                    <option value="Patient">Patient</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-[#34568B] text-white rounded-lg hover:bg-[#34568B] transition-colors"
                  >
                    {modalType === 'add' ? 'Create User' : 'Update User'}
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

export default UserManagement;