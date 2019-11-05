/**
 * main
 */
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Menu, Loading, Nav } from "@components";
import Style from "./style";
const Home = lazy(() => import(/* webpackChunkName: "Home" */ "../Home"));
const About = lazy(() => import(/* webpackChunkName: "About" */ "../About"));

const map = {
  "/": "首页",
  "/about": "关于"
};

function Main({
  history: {
    location: { pathname }
  }
}) {
  const [title, setTitle] = useState("");
  useEffect(() => {
    const str = map[pathname];
    setTitle(str);
    document.title = str;
  }, [pathname]);

  return (
    <div className={Style.main}>
      {/* 顶部nav */}

      <Nav title={title} />
      <div className={Style.container}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Redirect to={{ pathname: `/` }} />
          </Switch>
        </Suspense>
      </div>

      {/* 菜单 */}
      <Menu />
    </div>
  );
}

export default Main;
