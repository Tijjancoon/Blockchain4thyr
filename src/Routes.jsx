import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistrationWalletSetup from "pages/user-registration-wallet-setup";
import ShareholderLogin from "pages/shareholder-login";
import ProxyManagement from "pages/proxy-management";
import ElectionVotingInterface from "pages/election-voting-interface";
import ElectionResultsAuditTrail from "pages/election-results-audit-trail";
import AdminElectionManagement from "pages/admin-election-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ShareholderLogin />} />
        <Route path="/user-registration-wallet-setup" element={<UserRegistrationWalletSetup />} />
        <Route path="/shareholder-login" element={<ShareholderLogin />} />
        <Route path="/proxy-management" element={<ProxyManagement />} />
        <Route path="/election-voting-interface" element={<ElectionVotingInterface />} />
        <Route path="/election-results-audit-trail" element={<ElectionResultsAuditTrail />} />
        <Route path="/admin-election-management" element={<AdminElectionManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;