import React from "react";
import "./App.css";
import DashBoard from "./component/dashBoard";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";

import Nav from "./component/nav";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div className="app-container">
        <Nav />

        <div className="App">
          <LoadingBar />

          {this.props.loading === true ? null : <DashBoard />}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

function mapStateToProps({ products }) {
  return {
    loading: products === null,
  };
}
