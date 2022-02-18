import React from "react";
import "./App.css";
import DashBoard from "./component/dashBoard";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";
import { store} from "./index"

import Nav from "./component/nav";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    
  }


  render() {


    const{loadingNav,loadingDashboard}=this.props
    return (
      <div className="app-container">
          {loadingNav === true ? null : <Nav />}

        <div className="App">
          <LoadingBar />

          {loadingDashboard === true ? null : <DashBoard />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

function mapStateToProps({ products ,currencies}) {
  return {
    loadingDashboard: currencies === null ,
    loadingNav:(currencies === null)  ,


  };
}
