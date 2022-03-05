import React, { Component } from "react";
import Gallery from "./gallery";
import ProductInfo from "./productInfo";
export class PopUp extends Component {
  state = {
    active: "active",
  };

  setActive = () => {
    this.setState({ active: "false" });
  };

  render() {
    const {product ,currency} = this.props;
    return (
      <>
        <div className={`model ${this.state.active}`}>
          <div className="model-header">
            <div className="title"> Product added to the Cart</div>
            <button onClick={() => this.setActive()} className="icon-button">
              &times;
            </button>
          </div>

          <div className="model-body">
         
          <img 
            className="thubnailimg"
            style={{width:"30%",margin:"auto 1em auto 1em"}}
            src={product.gallery[0]}
            alt={`${product.name} `}
          />   
        
          
          <div>
          <h3>{product.brand}</h3>
            <h3>{product.name}</h3>
          <h4>
            {currency[0].currency.symbol} {currency[0].amount}
          </h4>
          </div>  
          
            </div>
        </div>
        <div   onClick={() => this.setActive()} className={`${this.state.active}`} id="overlay"></div>
      </>
    );
  }
}

export class AddPopUp extends Component {
  state = {
    active: "active",
  };

  setActive = () => {
    this.setState({ active: "false" });
  };

  render() {
    const { currency, product } = this.props;

    return (
      <>
        <div className={`add-model ${this.state.active}`}>
          <div className="model-header">
            <div className="title"> Choose atributes</div>
            <button onClick={() => this.setActive()} className="icon-button">
              &times;{" "}
            </button>
          </div>

          <div className="model-body">
            <div className="product-container">
              <Gallery product={product} />
              <ProductInfo currency={currency} product={product}   close={this.setActive} />
            </div>
          </div>
        </div>
        <div className={`${this.state.active}`} id="overlay"></div>
      </>
    );
  }
}
