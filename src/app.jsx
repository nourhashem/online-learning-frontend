import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from 'containers/SignIn';
import NotFound from 'containers/NotFound';
import SignUp from 'containers/SignUp';
import Dashboard from 'containers/Dashboard';
import Home from 'containers/Home';
import Class from 'containers/Class';
import Main from 'containers/Main';

const App = () => {
  const authenticated = useSelector((state) => state.app.authenticated);
  if (!authenticated) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Main />} />
        <Route path="class" element={<Class />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
