import React, { useState, useContext, useRef, useEffect } from 'react';
import { Camera, X, Menu } from 'lucide-react';
import { SidebarContext } from './DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../api/authAPI';
// import { updateUser } from '../../store/slices/authSlice';

const Profile = () => {
  const { isOpen, toggleMobileMenu } = useContext(SidebarContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    profilePicture: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        region: user.region || '',
        profilePicture: null
      });
      setImagePreview(user.profilePicture || null);
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 10000);
  };

  const handleDeactivate = () => {
    showAlertMessage('error', 'Please contact your administrator to complete the deactivation process.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await updateProfile(formDataToSend);
      dispatch(updateUser(response));
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#F9FAFB] "
      style={{
        marginLeft: windowWidth >= 1024 ? (isOpen ? '256px' : '80px') : '0',
        transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="p-4 sm:p-6">
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center mb-4">
          <button
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-gray-100 rounded-lg mr-4"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <h1 className="font-bold text-[#34568B] text-xl">HealthPulse</h1>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl sm:text-3xl text-gray-900 font-bold">Profile Settings</h1>
          <button 
            onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
            className={`px-4 py-2 ${isEditing ? "bg-[#48BB78] text-black" : "bg-[#34568B] text-white"} rounded-md cursor-pointer transition-colors`}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-24 h-24 cursor-pointer bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                
                {imagePreview ? (
                  <img 
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 p-2 bg-[#34568B] cursor-pointer rounded-full text-white hover:bg-[#2A4571] transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-gray-600">Healthcare Provider</p>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <h3 className="text-lg font-semibold mb-4 sm:mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {['name', 'email', 'phone', 'region'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#34568B] focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#34568B] text-white rounded-md hover:bg-[#2A4571] transition-colors"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </div>
                ) : (
                  'Update Profile'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Account Settings Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-md">
              <div className="mb-2 sm:mb-0">
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-gray-600">Update your password</p>
              </div>
              <button className="px-4 py-2 text-[#34568B] hover:bg-gray-100 rounded-md transition-colors w-full sm:w-auto">
                Change
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-md">
              <div className="mb-2 sm:mb-0">
                <h4 className="font-medium">Notifications</h4>
                <p className="text-sm text-gray-600">Manage notification settings</p>
              </div>
              <button 
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none self-start sm:self-center"
                style={{ backgroundColor: notificationsEnabled ? '#34568B' : '#D1D5DB' }}
              >
                <span 
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-md">
              <div className="mb-2 sm:mb-0">
                <h4 className="font-medium text-red-500">Deactivate Account</h4>
                <p className="text-sm text-gray-600">Permanently deactivate your account</p>
              </div>
              <button 
                onClick={handleDeactivate}
                className="px-4 py-2 text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-colors w-full sm:w-auto"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 max-w-md animate-slide-up">
          <div 
            className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${
              alertType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            <p>{alertMessage}</p>
            <button 
              onClick={() => setShowAlert(false)}
              className="ml-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;