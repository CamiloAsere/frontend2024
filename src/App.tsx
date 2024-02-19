import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminPanelWithAuth, UserDetailsWithAuth , SignUpPageWithAuth} from './presentation/1-view/components/HOC';
import Layout from './presentation/1-view/Layout';
import LoginPage from './presentation/1-view/pages/NewLoginPage';
import NotFound from './presentation/1-view/pages/errorPage/NotFound';
import HomePage from './presentation/1-view/pages/Home';
import MyApp from './presentation/1-view/test-views/MyApp';
import UserForm from './presentation/1-view/test-views/View2';
import SignIn from './presentation/1-view/test-views/loginA/LoginB'; //LoginB
//import StrapiApp from './presentation/1-view/test-views/StrapiPage';

//import MyComponent from './presentation/view/test-views/TestView';
import { AuthFormSweet } from './data/dataPlan/AlertModal';
import UsersPage1 from './presentation/1-view/test-views/UsersTable3';
import Profile from './data/cucuota-frontend/Profile';
import AddUser from './presentation/1-view/test-views/loginA/SignUp';
import Astro from './presentation/1-view/test-views/Astro';
import Tester from './presentation/1-view/pages/Tester';



export type Route = {
  index?: boolean,
  path?: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
  children?: Route[];
};


const router: Route[] = [
{
  path:"/",
  element:<Layout/>,
  errorElement: <NotFound />,
  children: [
    //{ path: '/', element: <HomePage />},
    { index: true , element: <HomePage />},
    { path: 'login', element: <LoginPage /> },
    { path: 'signup', element: <SignUpPageWithAuth /> },
    { path: 'admin', element: <AdminPanelWithAuth /> },
    { path: 'protected',  element: <UserDetailsWithAuth /> },
    { path: 'users', element: <MyApp /> },
    // { path: '/strapi', element: <StrapiApp /> },
    { path: 'sweet2', element: <AuthFormSweet /> },
    //{ path: '/api', element: <UsersPage1 /> },
    { path: 'test', element: <Profile/> },
    { path: 'profile', element: <Profile/> },
    { 
      path: 'astro', element: <Astro/> ,
      
      children:[
        { path: 'chi', element: <Tester /> },
      ]
      
  },
  ],
},
{ path: '/superuser', element: <AddUser/> },
]

const router1=createBrowserRouter(router)
function App() {
  return (
      <RouterProvider router={router1} />
  );
}

export default App;
//nota : crear un objeto dpara guardar cada ruta para ser mapeada y ahorrar codigo.
/*
{
routes.map(({ path,component:Component })=>(
<Route
key={ path }
path={ path }
element={ <Component/> }
/>
)
)
}
*/