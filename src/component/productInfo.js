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
    const size = `
    <h5{atr.name}</h5>;

    <p>"this is the size"</p>;
    `;

    let attributes;
    try {
      attributes = product.attributes.map((atr) => {
        <h5>{atr.name}</h5>;
        console.log(atr.name);
        switch (atr.name) {
          case "Size":
            return (
              <div>
                <h5>{atr.name}</h5>

                <p>"this is the size"</p>
              </div>
            );
          case "Capacity":
            return  (
                <div>
                  <h5>{atr.name}</h5>
  
                  <p>"this is the Capacity"</p>
                </div>
              );
          case "Color":
            return  (
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
            return  (
                <div>
                  <h5>{atr.name}</h5>
  
                  <p>"this is the  touch"</p>
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
        <button className="cart">ADD TO CART</button>

        <div>{product.description}</div>
      </div>
    );
  }
}

export default ProductInfo;
