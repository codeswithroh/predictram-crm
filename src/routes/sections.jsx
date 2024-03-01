import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const ProductsPage = lazy(() => import('src/pages/products'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const OrganizationPage = lazy(() => import('src/pages/organization'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegistrationPage = lazy(() => import('src/pages/register'));
export const OrgRegistrationPage = lazy(() => import('src/pages/org-register'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'organization', element: <OrganizationPage /> },
        { path: 'blog', element: <BlogPage /> },
        {
          path: 'user/add',
          element: <RegistrationPage />,
        },
        {
          path: 'organization/add',
          element: <OrgRegistrationPage />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
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
