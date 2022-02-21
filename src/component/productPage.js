import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "./nav";
import Gallery from "./gallery";
class ProductPage extends Component {
  render() {
    const { product, currencies } = this.props;

    const currency = product.prices.filter(
      (c) => c.currency.label === currencies.label
    );
    return (
      <div>
        <Nav />

        <div className="product-container">
        
<Gallery product={product} currency={currency}/>

<div className="product-info">
          <div>
            <h2> {product.brand} </h2>
            <h3> {product.name} </h3>
          </div>
          <div>
            <h5>{product.attributes[0].name}</h5>
          </div>
          <div>
            <h5>PRICE:</h5>
            <h4>
              {currency[0].currency.symbol} {currency[0].amount}
            </h4>
          </div>
          <button className="cart">ADD TO CART</button>

          <div>{product.description}</div>
        </div>

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
