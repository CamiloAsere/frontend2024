//HocExport.js


import UserDetails from '../pages/UserDetailsv2';
import MyApp from '../test-views/MyApp';
import AddUser from '../test-views/loginA/SignUp';
import withAuth from './WithAuth';
export const AdminPanelWithAuth = withAuth({ ComponentToProtect:  MyApp, requiredRole:'admin' });
export const SignUpPageWithAuth = withAuth({ ComponentToProtect:  AddUser , requiredRole:'admin' });
export const UserDetailsWithAuth = withAuth({ ComponentToProtect: UserDetails, requiredRole:'user' });
