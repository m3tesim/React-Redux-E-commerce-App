import React, { Component } from "react";
import { connect } from "react-redux";
import cart from "../assets/cart.svg";
import addToCart from "../actions/addToCart";
import { Link } from "react-router-dom";
import {AddPopUp} from "./popUp";
class ProductThumbnail extends Component {
  state = {
    hover: false,
    addPopUp:false,
  };

  addItem = () => {

    this.setState({ addPopUp: true });


    //this.props.dispatch(addToCart(this.props.product));
  };
  onMouseOver = () => {
    console.log("hover");
    setTimeout(() => {
      this.setState(() => ({
        hover: true,
      }));
    }, 500);
  };

  onMouseOut = () => {
    setTimeout(() => {
      this.setState(() => ({
        hover: false,
      }));
    }, 500);
  };

  render() {
    const { product, currencies } = this.props;

    //console.log(currencies)
   const currency = product.prices.filter(
      (c) => c.currency.label === currencies.label
    );

    return (
      <div
        className="thubnail"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}>
        <Link to={`/product/${product.id}`}>
          <img
            className="thubnailimg"
            src={product.gallery[0]}
            alt={`${product.name} `}
          />
        </Link>

      
          <div>
            <a href="#" onClick={() => this.addItem()}>

              <img id="cart" src={cart} alt="cart-icon" className="navIcon" />
            </a >
          </div>
     
        
        <Link to={`/product/${product.id}`}>
          <div>{product.name}</div>
        </Link>
        <div>
          {currency[0].currency.symbol} {currency[0].amount}{" "}
        </div>
        {this.state.addPopUp === true ? (
              <AddPopUp
              title={"product have been added to the cart"}
              currency={currency}
              product={product}
              />

          ) : (
            ""
          )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductThumbnail);

function mapStateToProps({ products, currencies }, { id }) {
  const theProducts = products.category.products;
  const product = theProducts.filter((p) => p.id === id);

  return {
    product: product[0],
    currencies,
  };
}
