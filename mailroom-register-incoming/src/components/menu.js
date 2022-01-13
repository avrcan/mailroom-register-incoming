import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { UserInfo } from "./login";

export function Menu() {
    const currenUserInfo = useContext(UserInfo);

    return (
      currenUserInfo.name === "Anonymous" ? '' :
        <nav className={"Menu"}>


            {!currenUserInfo.isAdmin && (
              <>
              <NavLink to="/"> Home </NavLink>
              <NavLink to="/dashboard"> Dashboard</NavLink>
              </>
            )}
            {currenUserInfo.isAdmin && (
              <>
                <NavLink to="/"> Home </NavLink>
                <NavLink to="/admin/admin-dashboard"> Dashboard </NavLink>
                <NavLink to="/admin/add-entry"> Add Entry </NavLink>


              </>
            )}
        </nav>
    )
}
