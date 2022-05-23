import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import PortfolioList from "../pages/PortfolioList";
import NewPortfolio from "../pages/NewPortfolio";
import StockList from "../pages/StockList";
import NewStock from "../pages/NewStock";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/portfolios/new">
            <NewPortfolio user={user} />
          </Route>
          <Route path="/stocks/new">
            <NewStock user={user} />
          </Route>
          <Route path="/stocks">
            <StockList />
          </Route>
          <Route path="/">
            <PortfolioList />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
