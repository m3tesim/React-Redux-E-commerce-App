import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { totalPrice, productCount, removeFromCart } from "../actions/addToCart";

class Cart extends Component {

  

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cart.items.length !== prevProps.cart.items.length) {
      this.calculateTotalPrice()
    }
  }

  calculateTotalPrice = (v) => {
    const { cart, currencies } = this.props;


    // this function filter the products currency  based on the currency type in store state "currencies"

    const allPrices = cart.items.map((i) => 
    {
     let currencyPrice= i.prices.filter((c) => c.currency.label === currencies.label)

     let result = currencyPrice.map((p) => p.amount * (i.count+ (v?v:0)))

      return result 
    }
    );

    // calculating the total price amount of all products
    let total = allPrices.map((i) => i[0]).reduce((Sum, a) => Sum + a, 0);

    this.props.dispatch(totalPrice(total));



  };




  
  render() {
    if (this.props.cart.items.length === 0)
      return (
        <div>
          <h3>Cart</h3>
          <div className="cart-container">
            <p>Cart is empty</p>
            <Link to="/">Go Shopping </Link>
          </div>
        </div>
      );
    const { cart, currencies } = this.props;

    return (
      <div className="cart-container">
        <h3>Cart</h3>

        <Listitems
          cart={cart}
          currencies={currencies}
          dispatch={this.props.dispatch}
          calculateTotalPrice={this.calculateTotalPrice}
        />
        <div className="navBar">
          <h4>
            {"Total " +
              currencies.symbol +
              " " +
              Math.round(cart.price[0] * 100) / 100}
          </h4>
          <button className="action-btn">Check Out</button>
        </div>
      </div>
    );
  }
}



export class Listitems extends Component {

 
  state = {
    addedPrice: 0,
  };




  render() {
    const { cart, currencies } = this.props;

    return (
      <div>
        {cart.items.map((i, index) => (
          <div key={index}>
            <Item
              product={i}
              cart={cart}
              currencies={currencies}
              dispatch={this.props.dispatch}
              calculateTotalPrice={this.props.calculateTotalPrice}
            />
          </div>
        ))}
      </div>
    );
  }
}

export class Item extends Component {

 
 
  Increment = () => {


    const { product, dispatch, calculateTotalPrice } = this.props;


    const productcount = { ...product, count: product.count + 1 };

    dispatch(productCount(productcount));

  //console.log("this is count first"+ productcount.count)  
    calculateTotalPrice(1);
  //  console.log("this is count socend"+product.count)  

    
  };

  decrement = () => {
    const { product, dispatch, calculateTotalPrice } = this.props;

    const productcount = { ...product, count: product.count - 1 };

    dispatch(productCount(productcount));
    calculateTotalPrice(-1);
  };

  removeItem = (productID) => {
    //console.log(JSON.stringify(this.props.changeTotalPrice))

    this.props.dispatch(removeFromCart(productID));


  };

  render() {

    const { product, currencies } = this.props;

    const currency = product.prices.filter(
      (c) => c.currency.label === currencies.label
    );

    return (
      <div>
        <hr />
        <div className="cart-info">
          <div>
            <p>
              <strong>{product.brand}</strong>
            </p>
            <h5>{product.name} </h5>
            <h4>
              {currency[0].currency.symbol}
              {currency[0].amount}
              {product.count !== 1 && (
                <span className="countColor"> x {product.count}</span>
              )}
            </h4>

            {product.attributes.map((atr, index) => {
              if (atr.name === "Color")
                return (
                  <h5 key={index}>
                    {atr.name}:{" "}
                    <span
                      className="colorAttribute"
                      style={{ backgroundColor: `${atr.items.value}` }}>
                      {atr.items.id}
                    </span>{" "}
                  </h5>
                );
              else
                return (
                  <h5 key={index}>
                    {atr.name}: {atr.items.id}
                  </h5>
                );
            })}
            <button onClick={() => this.removeItem(product)}> Remove </button>
          </div>

          <div className="left">
            <div className="increament">
              <button
                onClick={() => this.Increment()}
                disabled={product.count === 10}>
                +
              </button>

              <span>{product.count} </span>
              <button
                onClick={() => this.decrement()}
                disabled={product.count === 1}>
                -
              </button>
            </div>
            <ImgToggle product={product} />
          </div>
        </div>
      </div>
    );
  }
}

export class ImgToggle extends Component {
  state = {
    imgIndex: 0,
    val: false,
  };

  // dynamic toggling of the product imges  using thier index value
  ImgIndexUp = (value) => {
    if (
      0 <= this.state.imgIndex &&
      this.state.imgIndex < this.props.product.gallery.length - 1
    ) {
      this.setState(() => ({
        imgIndex: this.state.imgIndex + value,
      }));
    }
  };

  ImgIndexDown = (value) => {
    if (
      0 < this.state.imgIndex &&
      this.state.imgIndex <= this.props.product.gallery.length
    ) {
      this.setState(() => ({
        imgIndex: this.state.imgIndex + value,
      }));
    }
  };

  render() {
    const { product } = this.props;
    return (
      <div className="img-toggle">
        {this.state.imgIndex === this.props.product.gallery.length - 1 ? (
          ""
        ) : (
          <button onClick={() => this.ImgIndexUp(1)} className="icon-button">
            &and;
          </button>
        )}
        <img
          className="cart-img"
          alt="cart"
          src={product.gallery[this.state.imgIndex]}
        />
        {this.state.imgIndex === 0 ? (
          ""
        ) : (
          <button onClick={() => this.ImgIndexDown(-1)} className="icon-button">
            &or;
          </button>
        )}
      </div>
    );
  }
}


export default connect(mapStateToProps)(Cart);

function mapStateToProps({ cart, currencies }) {
  return {
    cart,
    currencies,
  };
}