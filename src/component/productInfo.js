import React, { Component } from "react";

import addToCart from "../actions/addToCart";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PopUp from "./popUp";
import Gallery from "./gallery";

class ProductInfo extends Component {
  state = {
    Size: null,
    Capacity: null,
    Color: null,
    "With USB 3 ports": null,
    "Touch ID in keyboard": null,
    attributes: [],

    validation: false,
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
    console.log("this is atr from additem " + JSON.stringify(atr));

    const { product } = this.props;

    let atribute = product.attributes
      .filter((i) => i.id === atr)[0]
      .items.filter((i) => i.value === this.state[atr]);
    console.log("this is the cahnege atribute " + JSON.stringify(atribute));
    return atribute[0];
  };

  validation = () => {
    const { product } = this.props;

    let missedAttributes = product.attributes.filter(
      (atr) => this.state[atr.name] === null
    );
    const warning = missedAttributes.map((atr) => (
      <p> `Please choose ${atr.name} `</p>
    ));

    if (missedAttributes.length === 0) return false;
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
    this.setState({ validation: true });
    let cutomeProduct = Object.assign({}, product, {
      attributes: allAttributes,
    });

    this.props.dispatch(addToCart(cutomeProduct));
  };

  render() {
    const { product, currency } = this.props;

    let attributes;
    try {
      attributes = product.attributes.map((atr) => {
        switch (atr.name) {
          case "Size":
            return (
              <div>
                <h5>{atr.name}</h5>

                <div className="atributes">
                  {atr.items.map((i, index) => (
                    <>
                      <input
                        key={index}
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                        required
                      />
                      <label htmlFor={i.id}> {i.value}</label>
                    </>
                  ))}
                </div>
              </div>
            );
          case "Capacity":
            return (
              <div>
                <h5>{atr.name}</h5>
                <div className="atributes">
                  {atr.items.map((i, index) => (
                    <>
                      <input
                        key={index}
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                        required
                      />
                      <label htmlFor={i.id}> {i.value}</label>
                    </>
                  ))}
                </div>
              </div>
            );
          case "Color":
            return (
              <div>
                <h5>
                  {atr.name} :{" "}
                  <span style={{ color: "gray" }}>{this.state.color}</span>
                </h5>
                <div className="atributes">
                  {atr.items.map((i, index) => (
                    <>
                      <input
                        key={index}
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
                    </>
                  ))}
                </div>
              </div>
            );
          case "With USB 3 ports":
            return (
              <div>
                <h5>{atr.name}</h5>
                <div className="atributes">
                  {atr.items.map((i, index) => (
                    <>
                      <input
                        key={index}
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                      />
                      <label htmlFor={i.id}> {i.value}</label>
                    </>
                  ))}
                </div>
              </div>
            );

          case "Touch ID in keyboard":
            return (
              <div>
                <h5>{atr.name}</h5>

                <div className="atributes">
                  {atr.items.map((i, index) => (
                    <>
                      <input
                        key={index}
                        type="radio"
                        id={i.value + "1"}
                        name={atr.name}
                        value={i.value}
                        onChange={(e) => this.changeAttribute(e, atr.name)}
                      />
                      <label htmlFor={i.value + "1"}> {i.value}</label>
                    </>
                  ))}
                </div>
              </div>
            );

          default:
            return <p>""</p>;
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
          {this.state.validation === true ? (
            <Link className="link" to="/">
              <PopUp 
              title={"product have been added to the cart"}
              body={`"${product.name} have been added to the cart  `}
              />

            </Link>
          ) : (
            ""
          )}
            <button
              className="cart-btn"
              onClick={() => this.addItem()}
              disabled={this.validation()}>
              ADD TO CART
            </button>
        </div>
        <br></br>
        <div
          id="discription"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    );
  }
}

export default connect()(ProductInfo);
