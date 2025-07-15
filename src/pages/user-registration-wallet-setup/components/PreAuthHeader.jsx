import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreAuthHeader = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Vote" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">ChainVote</span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Support Contact */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="HelpCircle" size={16} />
              <span>Need help?</span>
              <a 
                href="mailto:support@chainvote.com" 
                className="text-primary hover:underline"
              >
                support@chainvote.com
              </a>
            </div>

            {/* Sign In Link */}
            <Button
              variant="ghost"
              size="sm"
              iconName="LogIn"
              iconPosition="left"
              onClick={() => window.location.href = '/shareholder-login'}
            >
              Sign In
            </Button>

            {/* Mobile Support */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              title="Contact Support"
            >
              <Icon name="HelpCircle" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PreAuthHeader;