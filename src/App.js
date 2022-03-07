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
    const { loading } = this.props;
    return (
      <div className="app-container">
        <div className="App">
          {loading === true ? null : <Nav />}

          <Switch>
            <Route exact path="/">
              {loading === true ? null : <DashBoard />}
            </Route>

            {loading === true ? null : (
              <Route
                path="/product/:id"
                render={(props) => {
                  const {
                    match: {
                      params: { id },
                    },
                  } = props;
                  return <ProductPage key={`id=${id}`} {...props} />;
                }}/>
                
            )}

            <Route path="/cart" component={Cart}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

function mapStateToProps({ currencies, categories }) {
  return {
    loading: currencies === null,
  };
}
