import React, { useContext } from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { SidebarContext } from './DashboardLayout';
import { useNavigate } from 'react-router';
const Header = ({ title, subtitle }) => {
  const { isOpen, toggleMobileMenu } = useContext(SidebarContext);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const navigate=useNavigate()
  return (
  
    <div
      className="absolute top-0 lg:border-b  lg:border-gray-200 bg-[#F9FAFB]  "
      style={{
        right: '0',
        left: windowWidth >= 1024 ? (isOpen ? '256px' : '80px') : '0',
        transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 20
      }}
    >
      <div className="px-4 py-4 sm:px-6 ">
        <div className="flex items-center justify-between pb-3 lg:pb-0 w-full border-b border-gray-200 lg:border-none">
          <div className="flex items-center gap-4">
            {windowWidth < 1024 && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
            )}
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          
          <div className="flex items-center gap-0 md:gap-2">
            <button className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
              <Bell size={24} className="text-gray-600" />
            </button>
            <button 
             onClick={()=>navigate('/dashboard/profile')}
            className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
              <User size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        {subtitle && (
          <p className="text-gray-600  mt-4 md:mt-2 ">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default Header;