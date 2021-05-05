import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "../Decks/Decks";

function Layout() {
  // console.log("Layout/index.js (parent) ran");
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/">
            <Decks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
