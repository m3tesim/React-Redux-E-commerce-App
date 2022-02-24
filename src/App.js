import React from "react";
import "./App.css";
import DashBoard from "./component/dashBoard";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { Route, Switch } from "react-router-dom";
import ProductPage from "./component/productPage";



class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    
  }
  componentWillUnmount(){
    this.props.dispatch(handleInitialData());

  }

  render() {


    const{loadingDashboard}=this.props
    return (

      <div className="app-container">

      <div className="App">
      <Switch>
        <Route  exact path="/">
    

          {loadingDashboard === true ? null : <DashBoard />}
    
      </Route>

      <Route   path="/product/:id" component={ProductPage}>


      </Route>
      </Switch>
      </div>
      </div>
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
