import React, { Component } from "react";

import addToCart from "../actions/addToCart";
import { connect } from "react-redux";
import { PopUp } from "./popUp";

class ProductInfo extends Component {
  state = {
    Size: null,
    Capacity: null,
    Color: null,
    "With USB 3 ports": null,
    "Touch ID in keyboard": null,
    attributes: [],

    feedBack: false,
  };

  // let user change size

  changeAttribute = (e, atr) => {
    this.setState({
      [atr]: e.target.value,
      attributes: [...this.state.attributes, atr],
    });
  };

  // return the cutome product after the user changed attributes
  setAttribute = (atr) => {
    const { product } = this.props;

    let atribute = product.attributes
      .filter((i) => i.id === atr)[0]
      .items.filter((i) => i.value === this.state[atr]);
    return atribute[0];
  };

  validation = () => {
    const { product } = this.props;

    // this check the choosen atributes in the state array "attributes"
    //if there is one attribute that not choosed it will add it to miisedAtrributes
    let missedAttributes = product.attributes.filter(
      (atr) => this.state[atr.name] === null
    );

    if (product.inStock === false) return true;
    else if (missedAttributes.length === 0) return false;
    else return true;
  };

  // add the customised item to the cart
  addItem = () => {
    const { product } = this.props;

    const allAttributes = this.state.attributes.map((atr) => {
      let result = this.setAttribute(atr);

      return {
        __typename: "AttributeSet",
        id: atr,
        name: atr,
        type: "text",
        items: result,
      };
    });


    let cutomeProduct = Object.assign({}, product, {
      attributes: allAttributes,
      count:1
    });

    // the if condition closes the addproduct popUp in  after submitting
    if (this.props.close) {
      const delay = () => {
        setTimeout(this.props.close, 2000);
      };
      delay();
    }

    const duplicateProduct = this.props.cart.items.filter(
      (i) =>{
       return i.id === cutomeProduct.id
      } 
    );

    const originalProduct= duplicateProduct.map((product)=>(
       JSON.stringify(product)!==JSON.stringify(cutomeProduct)
    ))

    if(originalProduct.includes(false))
    {   alert("Product already in cart")

   

    }else {

      this.setState({ feedBack: true });

      this.props.dispatch(addToCart(cutomeProduct));
    }

   
  };

  render() {
    const { product, currency } = this.props;

    let attributes;
    try {
      attributes = product.attributes.map((atr) => {
        switch (atr.name) {
          case "Size":
            return (
              <div key={atr.name}>
                <h5>{atr.name}</h5>

                <div className="atributes">
                  {atr.items.map((i) => (
                    <div key={i.id}>
                      <input
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                        required
                      />
                      <label htmlFor={i.id}> {i.value}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "Capacity":
            return (
              <div key={atr.name}>
                <h5>{atr.name}</h5>
                <div className="atributes">
                  {atr.items.map((i) => (
                    <div key={i.id}>
                      <input
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                        required
                      />
                      <label htmlFor={i.id}> {i.value}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "Color":
            return (
              <div key={atr.name}>
                <h5>
                  {atr.name} :{" "}
                  <span style={{ color: "gray" }}>{this.state.color}</span>
                </h5>
                <div className="atributes">
                  {atr.items.map((i) => (
                    <div key={i.id}>
                      <input
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                        required
                      />
                      <label
                        id="color-input"
                        style={{ backgroundColor: i.value }}
                        htmlFor={i.id}></label>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "With USB 3 ports":
            return (
              <div key={atr.name}>
                <h5>{atr.name}</h5>
                <div className="atributes">
                  {atr.items.map((i) => (
                    <div key={i.id}>
                      <input
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                      />
                      <label htmlFor={i.id}> {i.value}</label>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "Touch ID in keyboard":
            return (
              <div key={atr.name}>
                <h5>{atr.name}</h5>

                <div className="atributes">
                  {atr.items.map((i) => (
                    <div key={i.id}>
                      <input
                        type="radio"
                        id={i.value + "1"}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                      />
                      <label htmlFor={i.value + "1"}> {i.value}</label>
                    </div>
                  ))}
                </div>
              </div>
            );

          default:
            return <p key={atr.name}>""</p>;
        }
      });
    } catch (e) {
      attributes = [];
    }

    return (
      <div className="product-info">
        <div>
          <h2> {product.brand} </h2>
          <h3> {product.name} </h3>
        </div>
        <div>{attributes}</div>
        <div>
          <h5>PRICE:</h5>
          <h4>
            {currency[0].currency.symbol} {currency[0].amount}
          </h4>
        </div>
        <div>
          {this.state.feedBack === true ? (
            <PopUp product={product} currency={currency} />
          ) : (
            ""
          )}

          {product.inStock === false && (
            <div>
              <h4 style={{ color: "grey" }}> OUT OF STOCK !</h4>
            </div>
          )}
          <button
            className="action-btn"
            onClick={() => this.addItem()}
            disabled={this.validation()}>
            ADD TO CART
          </button>
        </div>
        <br></br>

        <div id="discription" />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductInfo);

function mapStateToProps({ cart }) {
  return {
    cart,
  };
}
