import React, { Component } from "react";
import { connect } from "react-redux";
import ProductThumbnail from "./productThumbnail";
//import { getproductByCategory } from "../actions/productsAction";

class DashBoard extends Component {
  render() {
    const { products, category } = this.props;

    // const data = dispatch(getproductByCategory("clothes"))
    return (
      <div>
        
        <div className="categoryName">
        <h3>{category.name.toUpperCase()}</h3>

        </div>

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
    category: products.category,
  };
}
