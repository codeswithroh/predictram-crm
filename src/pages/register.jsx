import { Helmet } from 'react-helmet-async';

import RegisterView from 'src/sections/user/form/user-form';

// ----------------------------------------------------------------------

export default function RegistrationPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
