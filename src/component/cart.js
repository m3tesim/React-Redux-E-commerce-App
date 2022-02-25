import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "./nav";
class Cart extends Component {
  render() {
    const { cart, currencies } = this.props;

    return (
      <div>
        <Nav />
        <h3 >Cart</h3>

        <div className="cart-container">

          <div>
            {cart.items.map((i, index) => (
                <>
              <Item key={index} product={i} currencies={currencies} />
              <hr />
              </>

            ))}
          </div>
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
      <div className="cart-info">

        <h4>{product.brand}</h4>
        <p>{product.name}    </p>
        <h4>
          {currency[0].currency.symbol} {currency[0].amount}
        </h4>

        
          {product.attributes.map((atr) => {
              const style={
                backgroundColor:atr.items.value,
                width:'200px',
                height:'200px',
            }
              if (atr.name==="Color") return (<h5 > {atr.name}: <span style={style}>{atr.items.id}</span> </h5>)

           else  return (<h5> {atr.name}: {atr.items.id}</h5>)

           } )}
        
      </div>
    );
  }
}
