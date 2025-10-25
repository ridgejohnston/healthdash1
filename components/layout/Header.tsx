
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm shadow-sm p-4 flex justify-between items-center border-b border-slate-700">
      <div>
        {/* Can add breadcrumbs or page title here */}
      </div>
      <div>
        <p className="text-sm text-slate-400">
          Welcome back, Jane!
        </p>
      </div>
    </header>
  );
};

export default Header;
