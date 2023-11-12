import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { privateRoutes, publicRoutes } from './configs/router.tsx';
import DefaultLayout from './layouts/DefaultLayout.tsx';
import GlobalComponents from './components/GlobalComponents.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import ProtectedPublicRoute from './components/ProtectedPublicRoute.tsx';

export default function App() {
  return (
    <>
      <Helmet>
        <title>vnRoadmaps</title>
        {/* <link rel="icon" type="image/x-icon" href="favicon.png"></link> */}
      </Helmet>
      <Router>
        <Routes>
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout: React.FC<{
              children: React.ReactNode;
            }> = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = React.Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout: React.FC<{
              children: React.ReactNode;
            }> = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = React.Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedPublicRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedPublicRoute>
                }
              />
            );
          })}
          <Route path="*" Component={() => <div>Notfound</div>} />
        </Routes>
      </Router>
      <GlobalComponents />
    </>
  );
}
