import React, { Component } from "react";
import { connect } from "react-redux";
import shoppingbag from "../assets/baglogo.svg";
import cartIcon from "../assets/cart.svg";
import { getproductByCategory } from "../actions/productsAction";
import getCurrency from "../actions/currencyAction";
import { Link, NavLink } from "react-router-dom";
import { Item} from "./cart";

class Nav extends Component {
  state = {
    category: this.props.categories.categories,
    dropDown: false,
    active:"all"
  };

  dropDown = () => {
    this.setState({ dropDown: !this.state.dropDown });
  };

  // change products in the srore to much the selected category

  ChangeCategory = (category) => {
    this.props.dispatch(getproductByCategory(category));
    this.setState({active:category})

  };

  selectedCurrency = (value) => {
    this.props.dispatch(getCurrency({ __typename: "Currency", label: value }));
  };

  
  render() {
    /* */


    const { categories,cart ,currencies} = this.props;
    return (
      <div className="nav-container">
        <div className="navBar">
          <div>
            {categories.categories.map((g, index) => (
              <li key={index}>
                <NavLink
                  className={`navLink ${this.state.active ===g.name&&"navLinkActive"} `}
                  to="/"
                  onClick={() => this.ChangeCategory(g.name)}
                  value={g.name}>
                  {g.name.toUpperCase()}
                </NavLink>
              </li>
            ))}
          </div>

          <div className="navIcon logo ">
            <img src={shoppingbag} alt="Logo" />
          </div>

          <div className="leftnavBar">
            <select
              className="dropDown"
              name="currencies"
              onChange={(e) => this.selectedCurrency(e.target.value)}>
              <option value="USD">$</option>
              <option value="GBP">£</option>
              <option value="AUD">A$</option>
              <option value="JPY">A¥</option>
              <option value="RUB">A₽</option>
            </select>
            <div className="dropdown-cart" >
              <a onClick={() => this.dropDown()} >
                <img src={cartIcon} alt="cart-icon" className="navIcon" />
              </a>

              <div   className={`dropdown-content  ${this.state.dropDown && `active`}`}>
            <DropDownCart  cart={cart} currencies={currencies} close={this.dropDown} />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Nav);

function mapStateToProps({ categories, currencies ,cart}) {
  //console.log(JSON.stringify(currencies))
  return {
    categories,
    currencies,
    cart
  };
}


class DropDownCart extends Component {
  


  render() {
  
    const { cart, currencies,close } = this.props;
    if (this.props.cart.items.length === 0)
    return (
      <div>
        <div className="cart-container">
          <p>Cart is empty</p>
          <Link to="/">Go Shopping </Link>
        </div>
      </div>
    );

    return (

        <div className="cart-container">
        <p> <strong>My bag:</strong> {cart.items.length} items</p>

          {cart.items.map((i, index) => (
            <>
              <Item
                key={index}
                product={i}
                currencies={currencies}
                totalAmount={this.totalAmount}
                cart={cart}
              />

            </>
          ))}
 <h5>
       
       { "total " + Math.round(cart.price[0]* 100) / 100}
     </h5>
          <div className="navBar">
         
         
      
          
            <NavLink   onClick={()=>close()}  to='/cart' className="action-btn viewBag">View bag</NavLink>

            <button  className="action-btn">
            Check Out
          </button>
          </div>

        </div>
    );
  }
}