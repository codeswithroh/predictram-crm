import { Helmet } from 'react-helmet-async';

import RegisterView from 'src/sections/user/form/user-form';

// ----------------------------------------------------------------------

export default function UserFormPage() {
  return (
    <>
      <Helmet>
        <title> User Form </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
