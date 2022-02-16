import React from "react";
import "./App.css";
import DashBoard from "./component/dashBoard";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div className="App">
        Hello wolrd
        {this.props.loading===true? null : <DashBoard />}
        
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

function mapStateToProps({products}){
  return{
    loading: products === null

  }
}


