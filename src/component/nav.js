import React, { Component } from "react";
import { connect } from "react-redux";
import shoppingbag from "../assets/baglogo.svg";
import cart from "../assets/cart.svg";
import {getproductByCategory} from '../actions/productsAction'

class Nav extends Component {
  state={
    category:this.props.categories.categories
    
  }
  ChangeCategory=(category)=>{
     
  this.props.dispatch(getproductByCategory(category))
    console.log("Clicked"+JSON.stringify(this.props.categories.categories))

   
  }


  render() {

   /* */
    const {categories,currencies}=this.props
    return (
      <div>
        <div className="navBar">
          <div>
            {categories.categories.map((g, index) => (
              <li key={index} >  <a   href="#" onClick={()=>(this.ChangeCategory(g.name))}  value={g.name}> {g.name.toUpperCase()} </a></li>
            ))}
          </div>

          <div className="navIcon">
            <img src={shoppingbag} alt="Logo" />
          </div>

          <div>
            <form>
              <select name="currencies" id="currencies">
                {currencies.currencies.map((c)=>(

                <option key={c.label} value={c.label}>{c.label} {c.symbol}</option>


                ))}
            
              </select>
            </form>
            
            
          </div>
          <div className="cart">
            <img src={cart} alt="cart-icon" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Nav);

function mapStateToProps({ categories,currencies }) {
  //console.log(JSON.stringify(currencies))
  return {
    categories,
    currencies,

    
  };
}
