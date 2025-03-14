
import authRoles from '../../auth/authRoles';
import RecoveryPasswordPage from './RecoveryPasswordPage';

const RecoveryPasswordConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/auth/recoveryPassword',
      element: <RecoveryPasswordPage />
    },
  ],
};

export default RecoveryPasswordConfig;