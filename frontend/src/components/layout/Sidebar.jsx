import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LogOut, ShoppingBag, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Sidebar = ({ links, mobile = false }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={clsx(
      "flex flex-col bg-slate-900 border-r border-slate-800 z-40 transition-all text-slate-300 h-full w-full",
      !mobile && "hidden md:flex md:w-64 md:fixed md:inset-y-0"
    )}>
      
      {/* Logo */}
      <div className="h-16 flex items-center px-6 shrink-0 border-b border-slate-800 bg-slate-950/50">
        <Link to="/" className="flex items-center gap-3 group w-full">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-400 transition-colors">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">MultiStore</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto custom-scrollbar px-3 py-6">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Menu</div>
        <nav className="flex-1 space-y-1.5">
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "text-white bg-indigo-500/10 border border-indigo-500/20 shadow-sm shadow-indigo-500/5"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center z-10">
                    <item.icon
                      className={clsx(
                        "mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200",
                        isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-400"
                      )}
                    />
                    {item.name}
                  </div>
                  {isActive && (
                    <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-indigo-400 z-10" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="shrink-0 p-4 border-t border-slate-800 bg-slate-950/30">
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-white truncate max-w-[100px]">{user?.name}</p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors tooltip"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
