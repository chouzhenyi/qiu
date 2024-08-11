import React from 'react';
import { Link, Outlet } from 'react-router-dom'
const Layout = () => { 
    return (
        <div>
            <Link to="/home">二级页面</Link>
            <Link to="/login" >登录二级页面</Link>
            <Outlet />
        </div>
    )
}
export default Layout;