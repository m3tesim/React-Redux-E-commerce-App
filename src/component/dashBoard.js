import React, { Component } from "react";
import { connect } from "react-redux";
import ProductThumbnail from "./productThumbnail"; 
import Nav from "./nav";
//import { getproductByCategory } from "../actions/productsAction";

class DashBoard extends Component {
  render() {
    const {  products } = this.props;

    // const data = dispatch(getproductByCategory("clothes"))

    return (
      <div>

        <div className="container">


          {products.map((p) => (
            <div key={p.id}>
              <ProductThumbnail id={p.id} />{" "}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DashBoard);

function mapStateToProps({ products }) {
  const theproduct = products.category.products;
  return {
    products: theproduct,
  };
}
