import React, { useEffect, Fragment } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { setSession } from '@/utils/session';

export default function Article() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === '/article' || pathname === '/article/') {
      setSession('curSelectedKeys', '/article/query');
      navigate('/article/query');
    }
  });
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}
