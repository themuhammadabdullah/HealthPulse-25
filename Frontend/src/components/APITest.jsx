import React, { useState, useEffect } from 'react';
import { login, signup, getProfile } from '../api/authAPI';
import { getDashboardOverview } from '../api/dashboardAPI';
import { getAllMedicines, createMedicine } from '../api/medicineAPI';
import { getAllSales, createSale } from '../api/medicineSaleAPI';
import { getAllReports, createReport } from '../api/reportAPI';
import { getAllAlerts, createAlert } from '../api/alertAPI';
import { getAllFAQs, createFAQ } from '../api/faqAPI';
import { getAllContacts, createContact } from '../api/contactAPI';

const APITest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Test Authentication APIs
  const testAuth = async () => {
    try {
      setLoading(true);
      // Test login
      const loginData = await login({
        email: 'test@example.com',
        password: 'password123'
      });
      setTestResults(prev => ({ ...prev, login: loginData }));

      // Test signup
      const signupData = await signup({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
      setTestResults(prev => ({ ...prev, signup: signupData }));

      // Test get profile
      const profileData = await getProfile();
      setTestResults(prev => ({ ...prev, profile: profileData }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Dashboard APIs
  const testDashboard = async () => {
    try {
      setLoading(true);
      const overviewData = await getDashboardOverview();
      setTestResults(prev => ({ ...prev, dashboard: overviewData }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Medicine APIs
  const testMedicine = async () => {
    try {
      setLoading(true);
      // Test get all medicines
      const medicines = await getAllMedicines();
      setTestResults(prev => ({ ...prev, medicines }));

      // Test create medicine
      const newMedicine = await createMedicine({
        name: 'Test Medicine',
        description: 'Test Description',
        price: 10.99,
        quantity: 100
      });
      setTestResults(prev => ({ ...prev, newMedicine }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Medicine Sales APIs
  const testSales = async () => {
    try {
      setLoading(true);
      // Test get all sales
      const sales = await getAllSales();
      setTestResults(prev => ({ ...prev, sales }));

      // Test create sale
      const newSale = await createSale({
        medicineId: 'test-medicine-id',
        quantity: 5,
        totalPrice: 54.95
      });
      setTestResults(prev => ({ ...prev, newSale }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Report APIs
  const testReports = async () => {
    try {
      setLoading(true);
      // Test get all reports
      const reports = await getAllReports();
      setTestResults(prev => ({ ...prev, reports }));

      // Test create report
      const newReport = await createReport({
        title: 'Test Report',
        content: 'Test Content',
        type: 'test'
      });
      setTestResults(prev => ({ ...prev, newReport }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Alert APIs
  const testAlerts = async () => {
    try {
      setLoading(true);
      // Test get all alerts
      const alerts = await getAllAlerts();
      setTestResults(prev => ({ ...prev, alerts }));

      // Test create alert
      const newAlert = await createAlert({
        title: 'Test Alert',
        message: 'Test Message',
        type: 'warning'
      });
      setTestResults(prev => ({ ...prev, newAlert }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test FAQ APIs
  const testFAQs = async () => {
    try {
      setLoading(true);
      // Test get all FAQs
      const faqs = await getAllFAQs();
      setTestResults(prev => ({ ...prev, faqs }));

      // Test create FAQ
      const newFAQ = await createFAQ({
        question: 'Test Question?',
        answer: 'Test Answer'
      });
      setTestResults(prev => ({ ...prev, newFAQ }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Contact APIs
  const testContacts = async () => {
    try {
      setLoading(true);
      // Test get all contacts
      const contacts = await getAllContacts();
      setTestResults(prev => ({ ...prev, contacts }));

      // Test create contact
      const newContact = await createContact({
        name: 'Test Contact',
        email: 'contact@example.com',
        message: 'Test Message'
      });
      setTestResults(prev => ({ ...prev, newContact }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">API Test Component</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={testAuth}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Test Auth APIs
        </button>
        <button
          onClick={testDashboard}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          Test Dashboard APIs
        </button>
        <button
          onClick={testMedicine}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          disabled={loading}
        >
          Test Medicine APIs
        </button>
        <button
          onClick={testSales}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          disabled={loading}
        >
          Test Sales APIs
        </button>
        <button
          onClick={testReports}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          disabled={loading}
        >
          Test Report APIs
        </button>
        <button
          onClick={testAlerts}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          Test Alert APIs
        </button>
        <button
          onClick={testFAQs}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          disabled={loading}
        >
          Test FAQ APIs
        </button>
        <button
          onClick={testContacts}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          disabled={loading}
        >
          Test Contact APIs
        </button>
      </div>

      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      )}

      {Object.keys(testResults).length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Test Results:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(testResults, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default APITest; 