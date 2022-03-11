import React, { Component } from "react";
import { connect } from "react-redux";
import Gallery from "./gallery";
import ProductInfo from "./productInfo";
import { getProductById } from "../actions/productsAction";
class ProductPage extends Component {
  componentDidMount() {
    //this.props.dispatch(handleProductByID(this.props.id));
    this.props.dispatch(getProductById(this.props.id));

  }
  render() {
    const { product, currencies, loading } = this.props;

    const currency = product
      ? product.prices.filter((c) => c.currency.label === currencies.label)
      : "";

    return (
      <div>

        {loading !== true ? (
          <div className="product-container">
            <Gallery product={product} />

            <ProductInfo currency={currency} product={product} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductPage);

function mapStateToProps({ productByID, currencies }, props) {
  const { id } = props.match.params;

  return {
    id,
    product:productByID? productByID.product : "",
    currencies,
    loading:productByID === null,
  };
}
