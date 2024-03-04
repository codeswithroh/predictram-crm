import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_dashboard'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'organization',
    path: '/organization',
    icon: icon('ic_org'),
  },
  {
    title: 'market call',
    path: '/market-call',
    icon: icon('ic_market'),
  },
];

export default navConfig;
