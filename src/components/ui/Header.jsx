import React, { useState, useContext, createContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthContext = createContext({
  user: null,
  isConnected: false,
  walletAddress: null,
  role: 'shareholder',
  roles: ['shareholder'],
  balance: 0
});

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  
  // Mock authentication context
  const authContext = {
    user: { name: 'John Smith', email: 'john.smith@company.com' },
    isConnected: true,
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590b5',
    role: 'shareholder',
    roles: ['shareholder', 'proxy_holder'],
    balance: 150
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'View active elections and voting status'
    },
    {
      label: 'Vote',
      path: '/election-voting-interface',
      icon: 'Vote',
      description: 'Participate in elections and manage proxies',
      subItems: [
        { label: 'Voting Interface', path: '/election-voting-interface' },
        { label: 'Proxy Management', path: '/proxy-management' }
      ]
    },
    {
      label: 'Results',
      path: '/election-results-audit-trail',
      icon: 'BarChart3',
      description: 'View election results and audit trails'
    },
    {
      label: 'Administration',
      path: '/admin-election-management',
      icon: 'Settings',
      description: 'Manage elections and user oversight',
      roles: ['admin', 'board_secretary']
    }
  ];

  const isActiveRoute = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const getVisibleNavItems = () => {
    return navigationItems.filter(item => 
      !item.roles || item.roles.includes(authContext.role)
    );
  };

  const handleRoleSwitch = (newRole) => {
    console.log('Switching to role:', newRole);
    setIsRoleSwitcherOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setIsUserMenuOpen(false);
  };

  const handleWalletDisconnect = () => {
    console.log('Disconnecting wallet...');
    setIsUserMenuOpen(false);
  };

  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Vote" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">ChainVote</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {getVisibleNavItems().map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth hover-scale ${
                    isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  title={item.description}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
                
                {/* Dropdown for Vote section */}
                {item.subItems && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-1100">
                    <div className="py-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-4 py-2 text-sm transition-smooth ${
                            location.pathname === subItem.path
                              ? 'bg-accent text-accent-foreground'
                              : 'text-popover-foreground hover:bg-muted'
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side - Auth Status & Role Switcher */}
          <div className="flex items-center space-x-4">
            {/* Role Switcher (Multi-role users only) */}
            {authContext.roles.length > 1 && (
              <div className="relative hidden lg:block">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRoleSwitcherOpen(!isRoleSwitcherOpen)}
                  iconName="UserCheck"
                  iconPosition="left"
                  className="text-xs"
                >
                  {authContext.role.replace('_', ' ').toUpperCase()}
                </Button>
                
                {isRoleSwitcherOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-modal z-1100">
                    <div className="py-2">
                      {authContext.roles.map((role) => (
                        <button
                          key={role}
                          onClick={() => handleRoleSwitch(role)}
                          className={`w-full text-left px-4 py-2 text-sm transition-smooth ${
                            role === authContext.role
                              ? 'bg-accent text-accent-foreground'
                              : 'text-popover-foreground hover:bg-muted'
                          }`}
                        >
                          {role.replace('_', ' ').toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Authentication Status */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-sm"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${authContext.isConnected ? 'bg-success' : 'bg-error'}`} />
                  <span className="hidden md:inline font-mono text-xs">
                    {formatWalletAddress(authContext.walletAddress)}
                  </span>
                  <span className="hidden sm:inline text-xs text-muted-foreground">
                    {authContext.balance} CVT
                  </span>
                </div>
                <Icon name="ChevronDown" size={14} />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-72 bg-popover border border-border rounded-md shadow-modal z-1100">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} color="white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{authContext.user.name}</p>
                        <p className="text-xs text-muted-foreground">{authContext.user.email}</p>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-muted rounded-md">
                      <div className="flex justify-between text-xs">
                        <span>Wallet:</span>
                        <span className="font-mono">{formatWalletAddress(authContext.walletAddress)}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Balance:</span>
                        <span>{authContext.balance} CVT</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Status:</span>
                        <span className={`flex items-center space-x-1 ${authContext.isConnected ? 'text-success' : 'text-error'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${authContext.isConnected ? 'bg-success' : 'bg-error'}`} />
                          <span>{authContext.isConnected ? 'Connected' : 'Disconnected'}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleWalletDisconnect}
                      className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="Unlink" size={14} className="inline mr-2" />
                      Disconnect Wallet
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
                    >
                      <Icon name="LogOut" size={14} className="inline mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="px-6 py-4 space-y-2">
              {getVisibleNavItems().map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                      isActiveRoute(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                  </Link>
                  
                  {/* Mobile Sub-items */}
                  {item.subItems && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-3 py-1.5 text-sm rounded transition-smooth ${
                            location.pathname === subItem.path
                              ? 'bg-accent text-accent-foreground'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Role Switcher */}
              {authContext.roles.length > 1 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Switch Role</p>
                  {authContext.roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        handleRoleSwitch(role);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-smooth ${
                        role === authContext.role
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {role.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;