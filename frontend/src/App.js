import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { restoreUser } from "./store/session";

import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SpotDetailPage from "./components/SpotDetailPage";
import CreateSpotPage from "./components/CreateSpotPage";
import PageNotFound from "./components/PageNotFound";

import "./App.css";
import UserHomePage from "./components/UserHomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetailPage />
          </Route>
          <Route path="/spots">
            <CreateSpotPage />
          </Route>
          <Route path="/home">
            <UserHomePage />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
