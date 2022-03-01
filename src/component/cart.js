import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { totalPrice } from "../actions/addToCart";
class Cart extends Component {
  state = {
    addedPrice: 0,
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

    // this function filter the products currency  based on the currency type in store state "currencies"
    const allPrices = cart.items.map((i) =>
      i.prices.filter((c) => c.currency.label === currencies.label)
    );

    // calculating the total price amount of all products
    let total = allPrices
      .map((i) => i[0].amount)
      .reduce((Sum, a) => Sum + a, 0);



    const changeTotalPrice =(value)=>{
  
      this.setState(()=>({
        addedPrice:this.state.addedPrice+value
      }))

    }

    console.log("state total price " +this.state.total)



    return (
      <div className="cart-container">
        <h3>Cart</h3>

        {cart.items.map((i, index) => (
          <>
            <Item
              key={index}
              product={i}
              currencies={currencies}
              totalAmount={this.totalAmount}
              changeTotalPrice={changeTotalPrice }
            />
          </>
        ))}

        <div className="navBar">
          <h4>
            Total: {allPrices[0][0].currency.symbol}
            { this.state.addedPrice+total}
          </h4>
          <button  className="action-btn">
            Check Out
          </button>
        </div>
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

export class Item extends Component {
  state = {
    value: 1,
  };

  Increment = (value) => {

    this.setState(() => ({
      value: this.state.value + 1,
    }));
    this.props.changeTotalPrice(value)
  };

  decrement = (value) => {
    this.setState(() => ({
      value: this.state.value - 1,
    }));
    this.props.changeTotalPrice(-value)

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
              {" "}
              <strong>{product.brand}</strong>
            </p>
            <h5>{product.name} </h5>
            <h4>
              {currency[0].currency.symbol}
              {currency[0].amount}
             { this.state.value!==1&&<span style={{color:"#5ece7b"}}> x {this.state.value}</span>} 
            </h4>

            {product.attributes.map((atr) => {
              const style = {
                backgroundColor: atr.items.value,
                width: "200px",
                height: "200px",
              };
              if (atr.name === "Color")
                return (
                  <h5>
                    {atr.name}: <span style={style}>{atr.items.id}</span>{" "}
                  </h5>
                );
              else
                return (
                  <h5>
                    {" "}
                    {atr.name}: {atr.items.id}
                  </h5>
                );
            })}
          </div>

          <div className="left">
            <div className="increament">
              <button
                onClick={() => this.Increment(currency[0].amount)}
                disabled={this.state.value === 10}>
                +
              </button>

              <span> {this.state.value}</span>
              <button
                onClick={() => this.decrement(currency[0].amount)}
                disabled={this.state.value === 1}>
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

export class Increment extends Component {
  state = {
    value: 1,
  };

  Increment = () => {
    this.setState(() => ({
      value: this.state.value + 1,
    }));

    console.log("Clicked increment");
    this.props.dispatch(totalPrice(this.props.total));
  };

  decrement = () => {
    this.setState(() => ({
      value: this.state.value - 1,
    }));
  };

  render() {
    return (
      <div className="increament">
        <button
          onClick={() => this.Increment()}
          disabled={this.state.value === 10}>
          +
        </button>

        <span> {this.state.value}</span>
        <button
          onClick={() => this.decrement()}
          disabled={this.state.value === 1}>
          -
        </button>
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
        <img className="cart-img" src={product.gallery[this.state.imgIndex]} />
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
