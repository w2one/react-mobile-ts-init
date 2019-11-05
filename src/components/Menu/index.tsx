import React from "react";
import { NavLink } from "react-router-dom";
import Style from "./style";

function Menu() {
  return (
    <div className={Style.menu}>
      <NavLink to="/" exact>
        首页
      </NavLink>
      <NavLink to="/about">关于</NavLink>
    </div>
  );
}

export default Menu;
