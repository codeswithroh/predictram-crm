import { useState } from 'react';

import { Container } from '@mui/material';

import { ROLES } from 'src/enums';

import Tabs from 'src/components/Tabs';
import PageHeader from 'src/components/pageHeader';
import AccessControl from 'src/components/Accesscontrol';

import MarketCallDetails from 'src/sections/marketcall/details/market-call-details';

import MarketCallResponse from './market-call-response';

export default function MarketCallDetailsViewPage() {
  const [currentTab, setCurrentTab] = useState('details');
  const tabConfig = [
    { index: 'details', label: 'Details' },
    { index: 'response', label: 'Response' },
  ];
  console.log(ROLES);
  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader title="Market Call Details" />
      <AccessControl accepted_roles={[ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
        <Tabs
          sx={{ mb: 1 }}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabConfig={tabConfig}
        />
      </AccessControl>

      {currentTab === 'details' && <MarketCallDetails />}
      {currentTab === 'response' && <MarketCallResponse />}
    </Container>
  );
}
