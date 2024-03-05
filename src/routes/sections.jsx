import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const ProductsPage = lazy(() => import('src/pages/products'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user/user'));
export const OrganizationPage = lazy(() => import('src/pages/organization'));
export const UserFormPage = lazy(() => import('src/pages/user/user-form'));
export const OrgFormPage = lazy(() => import('src/pages/org-register'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LoginPage = lazy(() => import('src/pages/auth/login'));
export const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));
export const ChangePasswordPage = lazy(() => import('src/pages/auth/change-password'));

// ----------------------------------------------------------------------

export default function Router() {
  const auth = useSelector((state) => state?.user?.auth);

  const routes = useRoutes([
    {
      element: auth ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'organization', element: <OrganizationPage /> },
        { path: 'blog', element: <BlogPage /> },
        {
          path: 'user/add',
          element: <UserFormPage />,
        },
        {
          path: 'organization/add',
          element: <OrgFormPage />,
        },
      ],
    },
    {
      path: 'login',
      element: !auth ? <LoginPage /> : <Navigate to="/" />,
    },
    {
      path: 'forgot',
      element: <ForgotPasswordPage />,
    },
    {
      path: 'change',
      element: <ChangePasswordPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
