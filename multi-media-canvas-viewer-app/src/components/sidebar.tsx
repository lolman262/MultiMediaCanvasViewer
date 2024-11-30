import React from 'react';

const Sidebar: React.FC<{ mediaItems: any[] }> = ({ mediaItems }) => {
  return (
    <div className="sidebar">
      {mediaItems.map((item, index) => (
        <div key={index} className="sidebar-item">
          {/* Display thumbnails or names */}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
