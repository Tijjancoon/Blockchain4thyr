import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/user-registration-wallet-setup': { label: 'Registration & Wallet Setup', icon: 'UserPlus' },
    '/shareholder-login': { label: 'Shareholder Login', icon: 'LogIn' },
    '/election-voting-interface': { label: 'Voting Interface', icon: 'Vote' },
    '/proxy-management': { label: 'Proxy Management', icon: 'Users' },
    '/election-results-audit-trail': { label: 'Results & Audit Trail', icon: 'BarChart3' },
    '/admin-election-management': { label: 'Election Management', icon: 'Settings' }
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ path: '/', label: 'Dashboard', icon: 'Home' }];

    if (location.pathname === '/' || location.pathname === '/dashboard') {
      return breadcrumbs;
    }

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const route = routeMap[currentPath];
      
      if (route) {
        breadcrumbs.push({
          path: currentPath,
          label: route.label,
          icon: route.icon,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-border" />
            )}
            
            {crumb.isLast ? (
              <span className="flex items-center space-x-1.5 text-foreground font-medium">
                <Icon name={crumb.icon} size={14} />
                <span>{crumb.label}</span>
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="flex items-center space-x-1.5 hover:text-foreground transition-smooth"
              >
                <Icon name={crumb.icon} size={14} />
                <span>{crumb.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;