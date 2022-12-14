import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/BaseLayout/BaseLayout';
import { LoginLayout } from './layouts/LoginLayout/LoginLayout';
import Alert from './components/Alert/Alert';
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import ProfilePage from './pages/Profile/Profile';

function App() {
  return (
    <>
      <Alert />
      <Routes>
        <Route
          path=""
          element={
            <Layout />
}
        >
          <Route
            path=""
            element={(
              <React.Suspense fallback={<>...</>}>
                <HomePage />
              </React.Suspense>
                  )}
          />
          <Route
            path="profile"
            element={(
              <React.Suspense fallback={<>...</>}>
                <ProfilePage />
              </React.Suspense>
                  )}
          />
          <Route
            path="*"
            element={(
              <React.Suspense fallback={<>...</>}>
                <HomePage />
              </React.Suspense>
                  )}
          />
        </Route>
        <Route
          path="login"
          element={
            <LoginLayout />
}
        >
          <Route
            index
            element={(
              <React.Suspense fallback={<>...</>}>
                <LoginPage />
              </React.Suspense>
          )}
          />
        </Route>
      </Routes>
    </>

  );
}

export default App;
