import React, { useState } from 'react';
import Alljobsuser from './Alljobsuser';
import Preferredjobs from './Preferredjobs';
import Appliedjobs from './Appliedjobs';

const AllJobs = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: 'all', label: 'All Jobs' },
    { id: 'preferred', label: 'Preferred Jobs' },
    { id: 'applied', label: 'Applied Jobs' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', width: '90vw', maxWidth: '1200px', margin: '0 auto' ,  zIndex:0}}>
      
      {/* Sticky Tab Bar */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
       
          padding: '10px 0',
          borderBottom: '1px solid #ddd',
          width:'fit-content',
         
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === tab.id ? '#007bff' : '#f0f0f0',
              color: activeTab === tab.id ? '#fff' : '#000',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              boxShadow: activeTab === tab.id ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scrollable Job Area */}
      <div
        style={{
          overflowY: 'auto',
          maxHeight: '75vh',
          scrollbarWidth: 'none', 
        
        }}
        className="hide-scrollbar" // For Chrome (optional CSS below)
      >
        {activeTab === 'all' && <Alljobsuser />}
        {activeTab === 'preferred' && <Preferredjobs />}
        {activeTab === 'applied' && <Appliedjobs />}
      </div>
    </div>
  );
};

export default AllJobs;
