import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarContext } from './DashboardLayout';
import Header from './Header';
import { fetchMedicines, removeMedicine, setSelectedMedicine } from '../../store/slices/medicineSlice';
import AddMedicineModal from './AddMedicineModal';
import UpdateMedicineModal from './UpdateMedicineModal';

const MedicineCard = ({ medicine, isExpanded, onToggleExpand, onDelete, onUpdate }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(medicine._id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  return (
    <div className={`bg-white ${isExpanded ? "h-auto": "h-[270px]"} rounded-lg shadow-sm border border-gray-100 overflow-hidden relative group`}>
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onUpdate(medicine)}
          className="bg-[#34568B] text-white p-2 rounded-full hover:bg-[#2a4a74] transition-colors"
          title="Edit Medicine"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          title="Delete Medicine"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Medicine</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete {medicine.name}? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`h-48 w-full overflow-hidden`}>
        <img 
          src={medicine.image || '/src/assets/medicine-placeholder.jpg'} 
          alt={medicine.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/src/assets/medicine-placeholder.jpg';
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
            <p className="text-sm text-gray-500">{medicine.category}</p>
          </div>
          <button 
            onClick={onToggleExpand}
            className="text-[#34568B] hover:bg-blue-50 px-2 py-1 rounded"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Uses</h4>
              <p className="text-sm text-gray-600">{medicine.uses}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Side Effects</h4>
              <div className="flex flex-wrap gap-2">
                {medicine.sideEffects.map((effect, id) => (
                  <span 
                    key={id} 
                    className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Alternative Medicines</h4>
              <div className="flex flex-wrap gap-2">
                {medicine.alternativeMedicines.map((alt, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs border border-gray-300 px-2 py-1 rounded text-gray-600"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Dosage</h4>
              <p className="text-sm text-gray-600">{medicine.dosage}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Storage Instructions</h4>
              <p className="text-sm text-gray-600">{medicine.storageInstructions}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Price</h4>
              <p className="text-sm text-gray-600">${medicine.price}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Quantity</h4>
              <p className="text-sm text-gray-600">{medicine.quantity} units</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MedicineOverview = () => {
  const { isOpen } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const { medicines, loading, error } = useSelector((state) => state.medicine);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedMedicineId, setExpandedMedicineId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const selectedMedicine = useSelector((state) => state.medicine.selectedMedicine);

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(removeMedicine(id)).unwrap();
      dispatch(fetchMedicines()); // Refresh the list after deletion
    } catch (err) {
      console.error('Failed to delete medicine:', err);
    }
  };

  const handleUpdate = (medicine) => {
    console.log('Updating medicine:', medicine);
    dispatch(setSelectedMedicine(medicine));
    setIsUpdateModalOpen(true);
  };

  const handleMedicineUpdated = (updatedMedicine) => {
    console.log('Medicine updated:', updatedMedicine);
    dispatch(fetchMedicines()); // Refresh the medicines list
    setIsUpdateModalOpen(false);
    dispatch(setSelectedMedicine(null));
  };

  const handleMedicineAdded = () => {
    dispatch(fetchMedicines()); // Refresh the medicines list
    setIsAddModalOpen(false);
  };

  const categories = ['All', ...new Set(medicines.map(med => med.category))];

  const filteredMedicines = medicines.filter(medicine => 
    (selectedCategory === 'All' || medicine.category === selectedCategory) &&
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMedicineExpansion = (medicineId) => {
    setExpandedMedicineId(prevId => (prevId === medicineId ? null : medicineId));
  };

  return (
    <div
      className="min-h-screen pt-40 sm:pt-32 md:pt-0  bg-[#F9FAFB]"
      style={{
        marginLeft: windowWidth >= 1024 ? (isOpen ? "256px" : "80px") : "0",
        transition: "margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Header
        title="Medicine Overview"
        subtitle="View and manage your medicine inventory"
      />
      
      <main className="p-4 sm:p-6  md:mt-24">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#34568B]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <select
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#34568B] w-full sm:max-w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#34568B] mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading medicines...</p>
          </div>
        )}

        {/* Medicine Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {filteredMedicines.map((medicine) => (
              <MedicineCard 
                key={medicine._id}
                medicine={medicine}
                isExpanded={expandedMedicineId === medicine._id}
                onToggleExpand={() => toggleMedicineExpansion(medicine._id)}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && filteredMedicines.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No medicines found matching your search criteria.
          </div>
        )}
      </main>

      {/* Add Medicine Button */}
      <button 
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#34568B] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#2a4a74] transition-colors"
      >
        + Add Medicine
      </button>

      {/* Add Medicine Modal */}
      <AddMedicineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onMedicineAdded={handleMedicineAdded}
      />

      {/* Update Medicine Modal */}
      <UpdateMedicineModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          dispatch(setSelectedMedicine(null));
        }}
        medicine={selectedMedicine}
        onMedicineUpdated={handleMedicineUpdated}
      />
    </div>
  );
};

export default MedicineOverview;