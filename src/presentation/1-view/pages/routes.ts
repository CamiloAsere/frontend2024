import MyComponent from "./UsersPage";
import { Astro, AuthFormSweet } from "./index";
type TSXComponent = () => JSX.Element;
export type Route = {
    path: string;
    component: TSXComponent;
    errorElement?: TSXComponent;
    children?: Route[];
    name:string;
  };

export const routes:Route[] = [
{
    path: '/',
    component: AuthFormSweet,
    name: 'main',
    },
{
    path: '/about',
    component: Astro,
    name: 'about',
    },
{
    path: '/services',
    component: MyComponent,
    name: 'servicios',
    /*
    children:[
        {
                path: '/',
                component: TestComp1,
                name: 'testComp1',
                },
            {
                path: '/about',
                component: TestComp2,
                name: 'testComp2',
                },  
    ],
    */
    },
]

