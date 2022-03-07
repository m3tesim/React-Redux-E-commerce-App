import React, { Component } from "react";
import { connect } from "react-redux";
import shoppingbag from "../assets/baglogo.svg";
import cartIcon from "../assets/cart.svg";
import { getproductByCategory } from "../actions/productsAction";
import getCurrency from "../actions/currencyAction";
import { Link, NavLink } from "react-router-dom";
import { Item } from "./cart";
import { totalPrice } from "../actions/addToCart";
import ReactDOM from "react-dom";

class Nav extends Component {
  state = {
    category: this.props.categories.categories,
    dropDown: false,
    active: "all",
    addedPrice: 0,
    currencyDropDown: false,
  };

  dropDown = () => {
    this.setState({ dropDown: !this.state.dropDown ,currencyDropDown: false });


    this.ubdateTotalPrice();
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

  ubdateTotalPrice = () => {
    const { cart, currencies } = this.props;

    // this function filter the products currency  based on the currency type in store state "currencies"
    const allPrices = cart.items.map((i) =>
      i.prices.filter((c) => c.currency.label === currencies.label)
    );

    // calculating the total price amount of all products
    let total = allPrices
      .map((i) => i[0].amount)
      .reduce((Sum, a) => Sum + a, 0);

    this.totalPriceState(this.state.addedPrice, total);
  };

  //this fuction ubdates the total price

  totalPriceState = (addedPrice, total) => {
    const { dispatch } = this.props;

    const price = addedPrice + total;

    dispatch(totalPrice(price));
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
    /* */

    // thtis will add the price of the prudect that it's number increased  to the total

    const changeTotalPrice = (value) => {
      this.setState(() => ({
        addedPrice: this.state.addedPrice + value,
      }));

      this.totalPriceState(value, cart.price[0]);
    };

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
              <a onClick={() => this.currencyDropDown()}>
                <span> {currencies.symbol} ⌄ </span>
              </a>

              <div
                className={`currencyDropdown  ${
                  this.state.currencyDropDown && `active`
                }`}>
                <CurrencySwitcher selectedCurrency={this.selectedCurrency} />
              </div>
            </div>

            <div className="dropdown-cart">
              <a onClick={() => this.dropDown()}>
                <img src={cartIcon} alt="cart-icon" className="navIcon" />
              </a>
              {cart.items.length > 0 && (
                <div className="cart-badge">{cart.items.length}</div>
              )}

              <div
                className={`dropdown-content   ${
                  this.state.dropDown && `active`
                }`}>
                <DropDownCart
                  totalPriceState={this.totalPriceState}
                  cart={cart}
                  currencies={currencies}
                  close={this.dropDown}
                  changeTotalPrice={changeTotalPrice}
                  dispatch={dispatch}
                />
              </div>
            </div>
          </div>
        </div>
      
      </div>
      <div className={  this.state.dropDown===true && `overlaycart`}   >
        
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
  state = {
    addedPrice: 0,
  };

  render() {
    const { cart, currencies, close, changeTotalPrice, dispatch } = this.props;
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

        {cart.items.map((i, index) => (
          <div key={index}>
            <Item
              product={i}
              currencies={currencies}
              cart={cart}
              changeTotalPrice={changeTotalPrice}
              dispatch={dispatch}
            />
          </div>
        ))}
        <h5>{"total " + Math.round(cart.price[0] * 100) / 100}</h5>
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
