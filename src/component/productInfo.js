import React, { Component } from "react";

/*

switch(expression) {
    case x:
      // code block
      break;
    case y:
      // code block
      break;
    default:
      // code block
  }
*/

class ProductInfo extends Component {
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
                      />
                      <label for={i.id}>{i.value}</label>
                    </>
                  ))}
                </div>
              </div>
            );
          case "Capacity":
            return (
              <div>
                <h5>{atr.name}</h5>

                <p>"this is the Capacity"</p>
              </div>
            );
          case "Color":
            return (
              <div>
                <h5>{atr.name}</h5>

                <p>"this is the Color"</p>
              </div>
            );
          case "With USB 3 ports":
            return (
              <div>
                <h5>{atr.name}</h5>

                <p>"this is the ports"</p>
              </div>
            );

          case "Touch ID in keyboard":
            return (
              <div>
                <h5>{atr.name}</h5>

                <p>"this is the touch"</p>
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
          <button className="cart-btn">ADD TO CART</button>
        </div>
        <br></br>
        <div id="discription" >
        </div>

      </div>
    );
  }
}

export default ProductInfo;
