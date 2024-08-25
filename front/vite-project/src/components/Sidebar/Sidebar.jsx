import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'

function Sidebar() {
  const navigate = useNavigate();
  
  const create = () => {
    navigate('/addworkshop'); // Use absolute path
  };

  const update = () => {
    navigate('/updateworkshop'); // Use absolute path
  };

  const deletes = () => {
    window.location.reload();
    navigate('/deleteworkshop'); // Use absolute path
  };

  return (
    <div>
      <div className="sidebarContainer">
        <p className="sidebarButton" onClick={create}>Create Workshop</p>
        <p className="sidebarButton" onClick={update}>Update Workshop</p>
        <p className="sidebarButton" onClick={deletes}>Delete Workshop</p>
      </div>
    </div>
  );
}

export default Sidebar;
