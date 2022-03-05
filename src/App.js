import React from "react";
import "./App.css";
import DashBoard from "./component/dashBoard";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { Route, Switch } from "react-router-dom";
import ProductPage from "./component/productPage";
import Cart from "./component/cart";
import Nav from "./component/nav";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  componentWillUnmount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { loadingDashboard,loadingNav } = this.props;
    return (
      <div className="app-container">
        <div className="App">
           {loadingNav === true ? null : <Nav />}

          <Switch>
            <Route exact path="/">
              {loadingDashboard === true ? null : <DashBoard />}
            </Route>

            <Route path="/product/:id" component={ProductPage}></Route>

            <Route path="/cart" component={Cart}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

function mapStateToProps({ currencies ,categories}) {
  return {
    loadingDashboard: currencies === null,
    loadingNav: currencies === null,
  };
}
