import React, { Component } from "react";
import Gallery from "./gallery";
import ProductInfo from "./productInfo";
export  class PopUp extends Component {
    state={
        active:"active"
    }

    setActive=()=>{
     this.setState({active:"false"})
    }

  render() {
    const {title,body}=this.props
    return (

        <>
      <div className={`model ${this.state.active}`}>
        <div className="model-header">
          <div className="title"> {title}</div>
          <button  onClick={()=>this.setActive()} className="icon-button">&times; </button>
        </div>

        <div className="model-body">
          {body}
        </div>
      </div>
    <div className={`${this.state.active}`} id='overlay'>
    </div>
    </>
    );
  }
}

export class AddPopUp extends Component {
  state={
      active:"active"
  }

  setActive=()=>{
   this.setState({active:"false"})
  }

render() {
  const {title,currency,product}=this.props

  return (

      <>
    <div className={`add-model ${this.state.active}`}>
      <div className="model-header">
        <div className="title"> Choose atributes</div>
        <button  onClick={()=>this.setActive()} className="icon-button">&times; </button>
      </div>

      <div className="model-body" >
        <div className="product-container">
      <Gallery product={product} />
          <ProductInfo   currency={currency}  product={product}/>
          </div>
                </div>
    </div>
  <div className={`${this.state.active}`} id='overlay'>
  </div>
  </>
  );
}
}

