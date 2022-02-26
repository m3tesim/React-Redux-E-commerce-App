import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "./nav";
class Cart extends Component {
  state = {
    total: 0,
  };

  totalAmount = (itemAmount) => {
    console.log("item   amout " + itemAmount);

    console.log("total amout  " + this.state.total);

    return;
  };

  render() {
    const { cart, currencies } = this.props;

    // this function filter the products currency  based on the currency type in store state "currencies"
    const allPrices = cart.items.map((i) =>
      i.prices.filter((c) => c.currency.label === currencies.label)
    );

    // calculating the total price amount of all products
    const total = allPrices
      .map((i) => i[0].amount)
      .reduce((partialSum, a) => partialSum + a, 0);

    return (
      <div>
        <Nav />
        <h3>Cart</h3>

        <div className="cart-container">
          {cart.items.map((i, index) => (
            <>
              <Item
                key={index}
                product={i}
                currencies={currencies}
                totalAmount={this.totalAmount}
              />
            </>
          ))}
        </div>

        <div className="model-header">
          <h4>
            Total: {allPrices[0][0].currency.symbol}
            {total}{" "}
          </h4>
          <button className="action-btn">Check Out</button>
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

class Item extends Component {
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
            <h4>{product.brand}</h4>
            <p>{product.name} </p>
            <h4>
              {currency[0].currency.symbol} {currency[0].amount}
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
                    {" "}
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
          <ImgToggle product={product} />
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
