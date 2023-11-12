// Layouts
import AuthLayout from '@/layouts/AuthLayout';
import DefaultLayout from '@/layouts/DefaultLayout';
// Pages
import Home from '@/pages/Home';
import InfoChange from '@/pages/InfoChange';
import Roadmaps from '@/pages/Roadmaps';
import RoadmapsItem from '@/pages/RoadmapsItem';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import Login from '@/pages/auth/Login';
import RecoverPassword from '@/pages/auth/RecoverPassword';
import Signup from '@/pages/auth/Signup';
import React from 'react';

interface Route {
  path: string;
  component: React.FC;
  layout?: React.FC<{
    children: React.ReactNode;
  }> | null;
}

// Public routes
const privateRoutes: Route[] = [
  { path: '/roadmaps', component: Roadmaps, layout: DefaultLayout },
  { path: '/roadmaps/:slug', component: RoadmapsItem, layout: DefaultLayout },
  // { path: '/infochange', component: InfoChange, layout: DefaultLayout },
];

const publicRoutes: Route[] = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/login', component: Login, layout: AuthLayout },
  { path: '/signup', component: Signup, layout: AuthLayout },
  { path: '/forgotPassword', component: ForgotPassword, layout: DefaultLayout },
  { path: '/recoverPassword', component: RecoverPassword, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
