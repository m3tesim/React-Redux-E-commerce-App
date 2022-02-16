import React, { Component } from "react";
import { connect } from "react-redux";

//import { getproductByCategory } from "../actions/productsAction";

class DashBoard extends Component {
  render() {
    const { dispatch, products } = this.props;

    // const data = dispatch(getproductByCategory("clothes"))

    return (
      <div >
        {
           products.map((p,index) => <div key={index}>{p.name}</div>)
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(DashBoard);

function mapStateToProps({ products }) {
  const theproduct =  products.category.products
  return {
    products:theproduct
  };
}
