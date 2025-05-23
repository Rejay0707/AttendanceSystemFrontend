import React from 'react';
import AttendanceContainer from './AttendanceContainer';
import AdminPage from '../pages/AdminPage';

const AdminContainer = () => {
  return <AdminPage attendance={<AttendanceContainer />} />;
};

export default AdminContainer;
