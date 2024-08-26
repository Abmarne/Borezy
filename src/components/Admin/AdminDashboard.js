import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import editIcon from '../../assets/Edit.png';
import deleteIcon from '../../assets/Trash Can - Copy.png';
import Sidebar from '../Leads/Sidebar';
import Header from '../Leads/Header';
import '../Profile/Profile.css';

const AdminDashboard = () => {
  const [branches, setBranches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    const fetchBranches = async () => {
      const branchesCollection = collection(db, 'branches');
      const branchSnapshot = await getDocs(branchesCollection);
      const branchList = branchSnapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });
      setBranches(branchList);
    };

    fetchBranches();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'branches', id));
      setBranches(branches.filter(branch => branch.id !== id));
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-branch/${id}`);
  };

  const calculateRemainingDays = (deactiveDate) => {
    if (!deactiveDate) return 'N/A';
    const end = new Date(deactiveDate);
    const today = new Date();
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const applyFilter = (branches) => {
    switch (activeFilter) {
      case 'ongoing':
        return branches.filter(branch => calculateRemainingDays(branch.deactiveDate) > 0);
      case 'expiring':
        return branches.filter(branch => calculateRemainingDays(branch.deactiveDate) > 0 && calculateRemainingDays(branch.deactiveDate) <= 5);
      case 'expired':
        return branches.filter(branch => calculateRemainingDays(branch.deactiveDate) <= 0);
      case 'all':
      default:
        return branches;
    }
  };

  const filteredBranches = applyFilter(branches).filter(branch => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      branch.branchCode.toLowerCase().includes(lowerCaseQuery) ||
      branch.branchName.toLowerCase().includes(lowerCaseQuery) ||
      branch.emailId.toLowerCase().includes(lowerCaseQuery) ||
      branch.location.toLowerCase().includes(lowerCaseQuery) ||
      branch.ownerName.toLowerCase().includes(lowerCaseQuery) ||
      branch.subscriptionType.toLowerCase().includes(lowerCaseQuery) ||
      (branch.activeDate ? branch.activeDate.toLowerCase().includes(lowerCaseQuery) : false) ||
      (branch.deactiveDate ? branch.deactiveDate.toLowerCase().includes(lowerCaseQuery) : false) ||
      branch.amount.toString().includes(lowerCaseQuery) ||
      branch.numberOfUsers.toString().includes(lowerCaseQuery) ||
      (calculateRemainingDays(branch.deactiveDate) > 0 ? 'active' : 'deactive').includes(lowerCaseQuery)
    );
  });

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={handleSidebarToggle} 
        onFilterChange={handleFilterChange} 
      />
      <div className="dashboard-content">
        <Header onMenuClick={handleSidebarToggle} isSidebarOpen={sidebarOpen} />
      </div>
      <div className="create-branch-container">
        <button onClick={() => navigate('/create-branch')}>Add Branch</button>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search branches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h2 style={{marginTop: '8%', left: '25px', top: '126px', fontFamily: 'Public Sans', fontStyle: 'normal', fontWeight: '600', fontSize: '24px', lineHeight: '28px', color: '#000000' }}>
        Total Branches ({filteredBranches.length})
      </h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Branch Code</th>
              <th>Branch Name/Email</th>
              <th>Location</th>
              <th>Owner Name</th>
              <th>Subscription Type</th>
              <th>Users</th>
              <th>Password</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Subscription Fees</th>
              <th>Remaining Days</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBranches.map((branch, index) => (
              <tr key={branch.id}>
                <td>{index + 1}</td>
                <td>{branch.branchCode}</td>
                <td>{branch.branchName}<br />{branch.emailId}</td>
                <td>{branch.location}</td>
                <td>{branch.ownerName}</td>
                <td>{branch.subscriptionType}</td>
                <td>{branch.numberOfUsers}</td>
                <td>{branch.password}</td>
                <td>{branch.activeDate || 'N/A'}</td>
                <td>{branch.deactiveDate || 'N/A'}</td>
                <td>{branch.amount}</td>
                <td>{calculateRemainingDays(branch.deactiveDate)}</td>
                <td className={calculateRemainingDays(branch.deactiveDate) > 0 ? 'status-active' : 'status-deactive'}>
                  {calculateRemainingDays(branch.deactiveDate) > 0 ? 'Active' : 'Deactive'}
                </td>
                <td className="actions">
                  <button className='.button1' onClick={() => handleEdit(branch.id)}>
                    <img src={editIcon} alt="Edit" className="icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
