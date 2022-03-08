import React, { Component } from "react";
import { connect } from "react-redux";
import shoppingbag from "../assets/baglogo.svg";
import cartIcon from "../assets/cart.svg";
import { getproductByCategory } from "../actions/productsAction";
import getCurrency from "../actions/currencyAction";
import { Link, NavLink } from "react-router-dom";
import {  Listitems } from "./cart";
import ReactDOM from "react-dom";

class Nav extends Component {
  state = {
    category: this.props.categories.categories,
    dropDown: false,
    active: "all",
    currencyDropDown: false,
  };

  dropDown = () => {
    this.setState({ dropDown: !this.state.dropDown ,currencyDropDown: false });

  };

  currencyDropDown = () => {
    this.setState({ currencyDropDown: !this.state.currencyDropDown ,dropDown: false });
  };

  // change products in the srore to much the selected category

  ChangeCategory = (category) => {
    this.props.dispatch(getproductByCategory(category));
    this.setState({ active: category });
  };

  selectedCurrency = (value, name) => {
    this.setState({
      currencyDropDown: false,
      dropDown: false,
    });
    this.props.dispatch(
      getCurrency({ __typename: "Currency", label: value, symbol: name })
    );
  };


 

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        currencyDropDown: false,
        dropDown: false,
      });
    }
  };
  render() {
 

    const { categories, cart, currencies, dispatch } = this.props;
    return (
      <>
      <div className="nav-container">
        <div className="navBar">
          <div>
            {categories.categories.map((g, index) => (
              <li key={index}>
                <NavLink
                  className={`navLink ${
                    this.state.active === g.name && "navLinkActive"
                  } `}
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
            <div className="dropdown-cart">
             
                <span  className="currencySwitcher" onClick={() => this.currencyDropDown()}> {currencies.symbol} ⌄ </span>
            

              <div
                className={`currencyDropdown  ${
                  this.state.currencyDropDown && `active`
                }`}>
                <CurrencySwitcher selectedCurrency={this.selectedCurrency} />
              </div>
            </div>

            <div className="dropdown-cart">
                <img  onClick={() => this.dropDown()} src={cartIcon} alt="cart-icon" className="navIcon" />
              {cart.items.length > 0 && (
                <div className="cart-badge">{cart.items.length}</div>
              )}

              <div
                className={`dropdown-content   ${
                  this.state.dropDown && `active`
                }`}>
                <DropDownCart
                  cart={cart}
                  currencies={currencies}
                  close={this.dropDown}
                  dispatch={dispatch}

                />
              </div>
            </div>
          </div>
        </div>
      
      </div>
      <div className={` ${this.state.dropDown===true? "overlaycart" :"non"}`}   >
        
        </div>
     
      </>
    );
  }
}

export default connect(mapStateToProps)(Nav);

function mapStateToProps({ categories, currencies, cart }) {
  //console.log(JSON.stringify(currencies))
  return {
    categories,
    currencies,
    cart,
  };
}


export class CurrencySwitcher extends Component {
  state = {
    value: "$",
  };

  changeCurrency = (e) => {
    const newValue = e.target.value;
    const newValue2 = e.target.name;

    this.setState(() => ({
      value: newValue,
    }));
    this.props.selectedCurrency(newValue, newValue2);
  };
  render() {
    return (
      <div className="currency">
        <button onClick={(e) => this.changeCurrency(e)} value="USD" name="$">
          $ USD
        </button>
        <button onClick={(e) => this.changeCurrency(e)} value="GBP" name="£">
          £ GBP
        </button>
        <button onClick={(e) => this.changeCurrency(e)} value="AUD" name="A$">
          A$ AUD
        </button>
        <button onClick={(e) => this.changeCurrency(e)} value="JPY" name="¥">
          ¥ JPY
        </button>
        <button onClick={(e) => this.changeCurrency(e)} value="RUB" name="₽">
          ₽ RUB
        </button>
      </div>
    );
  }
}

class DropDownCart extends Component {
 

  render() {
    const { cart, currencies, close, } = this.props;
    if (this.props.cart.items.length === 0)
      return (
        <div>
          <div className="cart-container noItems">
            <p>Cart is empty</p>
            <Link to="/">Keep Shopping </Link>
          </div>
        </div>
      );

    return (
      <div className="cart-container">
        <p>
          {" "}
          <strong>My bag:</strong> {cart.items.length} items
        </p>
        <Listitems  cart={cart}  currencies={currencies} dispatch={this.props.dispatch}/>

   
        <h5>{"total " +currencies.symbol +" "+ Math.round(cart.price[0] * 100) / 100}</h5>
        <div className="navBar">
          <NavLink
            onClick={() => close()}
            to="/cart"
            className="action-btn viewBag">
            View bag
          </NavLink>

          <button className="action-btn">Check Out</button>
        </div>
      </div>
    );
  }
}
