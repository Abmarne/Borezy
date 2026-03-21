import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from '../Auth/UserContext';
import './Dashboard.css';

const Dashboard = () => {
  const { userData } = useUser();
  const [stats, setStats] = useState({
    totalLeads: 0,
    freshLeads: 0,
    demoScheduled: 0,
    demoDone: 0,
    leadWon: 0,
    leadLost: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const leadsCollection = collection(db, 'leads');
        const snapshot = await getDocs(leadsCollection);
        
        const leads = snapshot.docs.map(doc => doc.data());
        
        const statsData = {
          totalLeads: leads.length,
          freshLeads: leads.filter(l => l.status?.toLowerCase() === 'fresh leads').length,
          demoScheduled: leads.filter(l => l.status?.toLowerCase() === 'demo scheduled').length,
          demoDone: leads.filter(l => l.status?.toLowerCase() === 'demo done').length,
          leadWon: leads.filter(l => l.status?.toLowerCase() === 'lead won').length,
          leadLost: leads.filter(l => l.status?.toLowerCase() === 'lead lost').length
        };
        
        statsData.conversionRate = statsData.totalLeads > 0 
          ? ((statsData.leadWon / statsData.totalLeads) * 100).toFixed(2)
          : 0;
        
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-stats-container">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Leads</h3>
          <p className="stat-number">{stats.totalLeads}</p>
        </div>
        <div className="stat-card fresh">
          <h3>Fresh Leads</h3>
          <p className="stat-number">{stats.freshLeads}</p>
        </div>
        <div className="stat-card demo-scheduled">
          <h3>Demo Scheduled</h3>
          <p className="stat-number">{stats.demoScheduled}</p>
        </div>
        <div className="stat-card demo-done">
          <h3>Demo Done</h3>
          <p className="stat-number">{stats.demoDone}</p>
        </div>
        <div className="stat-card won">
          <h3>Lead Won</h3>
          <p className="stat-number">{stats.leadWon}</p>
        </div>
        <div className="stat-card lost">
          <h3>Lead Lost</h3>
          <p className="stat-number">{stats.leadLost}</p>
        </div>
        <div className="stat-card conversion">
          <h3>Conversion Rate</h3>
          <p className="stat-number">{stats.conversionRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
