import React, { Component } from "react";
import { connect } from "react-redux";
import cart from "../assets/cart.svg";
import addToCart from "../actions/addToCart";
class ProductThumbnail extends Component {
  state = {
    hover: false,
  };




  addItem=()=>{

    this.props.dispatch(addToCart(this.props.product))

  }
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
          <img
            className="thubnailimg"
            src={product.gallery[0]}
            alt={`${product.name} `}
          />
          {this.state.hover ? (
            <div   >
            </div>
            ) :  ""}
                         <button href="#" onClick={()=>(this.addItem())}> <img  id="cart" src={cart} alt="cart-icon" /></button>


          <div>{product.name}</div>

          <div>
            {currency[0].currency.symbol} {currency[0].amount}{" "}
          </div>
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
