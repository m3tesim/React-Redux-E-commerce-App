import React from "react";
import "./App.css";
import DashBoard from "./component/dashBoard";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import { Route, Switch } from "react-router-dom";
import ProductPage from "./component/productPage";



class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    
  }


  render() {


    const{loadingDashboard}=this.props
    return (

      <Switch>
        <Route  exact path="/">
      <div className="app-container">

        <div className="App">
          <LoadingBar />

          {loadingDashboard === true ? null : <DashBoard />}
        </div>
      </div>
      </Route>

      <Route   path="/product/:id" component={ProductPage}>


      </Route>
      </Switch>
    );
  }
}

export default connect(mapStateToProps)(App);

function mapStateToProps({ currencies}) {
  return {
    loadingDashboard: currencies === null ,
    loadingNav:(currencies === null)  ,


  };
}
