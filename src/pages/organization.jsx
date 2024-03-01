import { Helmet } from 'react-helmet-async';

import { OrganizationView } from 'src/sections/organization/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Organization </title>
      </Helmet>

      <OrganizationView />
    </>
  );
}
