import React, { Component } from "react";

import addToCart from "../actions/addToCart";
import { connect } from "react-redux";
class ProductInfo extends Component {
  state = {
    Size: null,
    Capacity:null,
    Color:null,
    attributes:[]
  };


  // let user change size
  changeSize = (e) => {

    this.setState({
       Size: e.target.value ,
       attributes:[...this.state.attributes,'Size']
      });
  };
  changeColor = (e) => {
    console.log("change color")
    this.setState({
      Color: e.target.value ,
      attributes:[...this.state.attributes,'Color']
     });

    
  };
  changeCapacity=(e)=>{
    this.setState({
      Capacity: e.target.value ,
      attributes:[...this.state.attributes,'Capacity']
     });
  }

// return the cutome product after the user change attributes
  setAttribute=(atr)=>{
    console.log("this is atr from additem " + JSON.stringify(atr));

    const { product } = this.props;

    let atribute = product.attributes.filter((i)=>(i.id===atr))[0].items.filter(
      (i) => i.value === this.state[atr])
    console.log("this is the cahnege atribute " + JSON.stringify(atribute));
    return atribute[0];
  }

  // add the cusomised item to the cart 
  addItem = () => {
    const { product} = this.props;


const allAttributes =this.state.attributes.map((atr)=>{
  let result=this.setAttribute(atr)

  return {__typename: 'AttributeSet', id: atr, name: atr, type: 'text', items: result}

})

 let cutomeProduct = Object.assign({}, product, { attributes: allAttributes});

    
console.log("all state atributes" + JSON.stringify(allAttributes));
console.log("the final product" + JSON.stringify(cutomeProduct));

   this.props.dispatch(addToCart(cutomeProduct));
  }


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
                        onChange={this.changeSize}
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
                        onChange={this.changeCapacity}
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
                <h5>{atr.name} :  <span style={{  color: "gray" }} >{this.state.color}</span></h5>
                <div className="atributes">
                {atr.items.map((i, index) => (
                    <>
                      <input
                        key={index}
                        type="radio"
                        id={i.id}
                        name={atr.name}
                        value={i.value}
                        onChange={this.changeColor}
                        required
                      />
                      <label    id="color-input" 
                   style={{  backgroundColor: i.value }} htmlFor={i.id}></label>
                    </>
                  ))}

                </div>
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
          <button className="cart-btn" onClick={() => this.addItem()}>
            ADD TO CART
          </button>
        </div>
        <br></br>
        <div id="discription"></div>
      </div>
    );
  }
}

export default connect()(ProductInfo);
