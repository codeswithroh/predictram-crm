import { ROLES } from 'src/enums';

export const roleBasedRoutes = {
  ADMIN: ['', 'user', 'user/add', 'market-call', 'market-call/details/:id'],
  EMPLOYEE: ['', 'user', 'market-call', 'market-call/details/:id', 'market-call/add'],
  CLIENT: ['', 'market-call', 'market-call/details/:id'],
};

export const getRouteFromRole = (role, protectedRoutes) => {
  if (role === ROLES.SUPER_ADMIN) return protectedRoutes;

  const filterRoutes = [];
  protectedRoutes?.forEach((route) => {
    if (roleBasedRoutes[role]?.includes(route?.path)) {
      filterRoutes.push(route);
    }
  });
  return filterRoutes;
};
