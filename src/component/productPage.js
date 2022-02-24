import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "./nav";
import Gallery from "./gallery";
import ProductInfo from "./productInfo";
import PopUp from "./popUp";
class ProductPage extends Component {
  render() {
    const { product, currencies } = this.props;

    const currency = product.prices.filter(
      (c) => c.currency.label === currencies.label
    );
    return (
      <div >
        <Nav />


        <div className="product-container">
          <Gallery product={product} />

          <ProductInfo   currency={currency}  product={product}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductPage);

function mapStateToProps({ products, currencies }, props) {
  const { id } = props.match.params;
  const product = products.category.products.filter((p) => p.id === id);

  return {
    id,
    product: product[0],
    currencies,
  };
}
