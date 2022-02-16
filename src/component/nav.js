import React, { Component } from "react";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    
    return (
      <div className="navBar">
        <ol>
          {this.props.categories.categories.map((g, index) => (
            <li key={index}> {g.name} </li>
          ))}
        </ol>
        Nav
      </div>
    );
  }
}

export default connect(mapStateToProps)(Nav);

function mapStateToProps({ categories }) {
  return {
    categories,
  };
}
