import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { getRouteFromRole } from 'src/utils/routeAccess';

import DashboardLayout from 'src/layouts/dashboard';
import MarketCallFormPage from 'src/pages/marketcall/martketcall-form';
import MarketCallDetailsPage from 'src/pages/marketcall/marketcall-details';

export const ProductsPage = lazy(() => import('src/pages/products'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const MarketCallPage = lazy(() => import('src/pages/marketcall/marketcall'));
export const UserPage = lazy(() => import('src/pages/user/user'));
export const OrganizationPage = lazy(() => import('src/pages/organization'));
export const UserFormPage = lazy(() => import('src/pages/user/user-form'));
export const OrgFormPage = lazy(() => import('src/pages/org-register'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LoginPage = lazy(() => import('src/pages/auth/login'));
export const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));
export const ChangePasswordPage = lazy(() => import('src/pages/auth/change-password'));
export const HedgeOSPage = lazy(() => import('src/pages/externals/hedgeOS'));
export const CGPUPage = lazy(() => import('src/pages/externals/cGPU'));

// ----------------------------------------------------------------------

export default function Router() {
  const auth = useSelector((state) => state?.user?.auth);

  const user = useSelector((state) => state?.user?.details);

  const prodectedRoutes = [
    { path: 'user', element: <UserPage /> },
    { path: 'organization', element: <OrganizationPage /> },
    { path: 'market-call/:type?/:marketState?', element: <MarketCallPage /> },
    { path: 'market-call/details/:id/:response?', element: <MarketCallDetailsPage /> },
    { path: 'market-call/add', element: <MarketCallFormPage /> },
    {
      path: 'user/add',
      element: <UserFormPage />,
    },
    {
      path: 'organization/add',
      element: <OrgFormPage />,
    },
    { path: 'hedgeOS', element: <HedgeOSPage /> },
    { path: 'cGPU', element: <CGPUPage /> },
  ];
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
        ...getRouteFromRole(user?.role, prodectedRoutes),
      ],
    },
    {
      path: 'login',
      element: !auth ? <LoginPage /> : <Navigate to="/" />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPasswordPage />,
    },
    {
      path: 'change-password',
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
