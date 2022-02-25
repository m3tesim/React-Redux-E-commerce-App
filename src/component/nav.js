import React, { Component } from "react";
import { connect } from "react-redux";
import shoppingbag from "../assets/baglogo.svg";
import cart from "../assets/cart.svg";
import { getproductByCategory } from "../actions/productsAction";
import getCurrency from "../actions/currencyAction";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  state = {
    category: this.props.categories.categories,
  };

  // change products in the srore to much the selected category

  ChangeCategory = (category) => {
    this.props.dispatch(getproductByCategory(category));
  };

  selectedCurrency = (value) => {
    this.props.dispatch(getCurrency({ __typename: "Currency", label: value }));
  };

  render() {
    /* */
    const { categories } = this.props;
    return (
      <div className="nav-container">
        <div className="navBar">
          <div>
            {categories.categories.map((g, index) => (
              <li key={index}>
                <NavLink
                className="navLink"
                  style={{ textDecoration: "none" }}
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

          <div className="leftnavBar" >
          
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
         

            <NavLink to="/cart" className="navIcon">
              <img src={cart} alt="cart-icon" />
            </NavLink>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Nav);

function mapStateToProps({ categories, currencies }) {
  //console.log(JSON.stringify(currencies))
  return {
    categories,
    currencies,
  };
}
