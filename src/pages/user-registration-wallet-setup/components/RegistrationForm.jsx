import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    shareholderId: '',
    verificationCode: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.shareholderId.trim()) {
      newErrors.shareholderId = 'Shareholder ID is required';
    } else if (!/^SH\d{6}$/.test(formData.shareholderId)) {
      newErrors.shareholderId = 'Shareholder ID must be in format SH123456';
    }
    
    if (!formData.verificationCode.trim()) {
      newErrors.verificationCode = 'Company verification code is required';
    } else if (formData.verificationCode !== 'CORP2024') {
      newErrors.verificationCode = 'Invalid verification code. Use: CORP2024';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-card">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Create Your Account</h2>
        <p className="text-muted-foreground">
          Register as a verified shareholder to participate in corporate governance
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full legal name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@company.com"
          description="We'll send voting notifications to this address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Shareholder ID"
          type="text"
          placeholder="SH123456"
          description="Your unique shareholder identification number"
          value={formData.shareholderId}
          onChange={(e) => handleInputChange('shareholderId', e.target.value)}
          error={errors.shareholderId}
          required
        />

        <Input
          label="Company Verification Code"
          type="text"
          placeholder="Enter verification code"
          description="Provided by your company's board secretary"
          value={formData.verificationCode}
          onChange={(e) => handleInputChange('verificationCode', e.target.value)}
          error={errors.verificationCode}
          required
        />

        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="UserPlus"
            iconPosition="left"
          >
            Create Account
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="/shareholder-login" className="text-primary hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;