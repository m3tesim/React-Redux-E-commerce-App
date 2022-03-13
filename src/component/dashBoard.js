import React, { Component } from "react";
import { connect } from "react-redux";
import ProductThumbnail from "./productThumbnail";
import { handleProducts  } from "../actions/shared";

class DashBoard extends Component {

  componentDidMount() {
 {this.props.dispatch(handleProducts())
  }
}

  render() {




    const { products, category, loading } = this.props
    

 //   console.log("this category dashboard page "+category)

   
    return (
      <div>
     {loading === true ? null : 
        <>

        <div className="categoryName">
          <h3>{category.name.toUpperCase()}</h3>
        </div>

        <div className="container">
          {products.map((p) => (
            <div key={p.id}>
              <ProductThumbnail id={p.id} />{" "}
            </div>
          ))}
        </div>
        </>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(DashBoard);

function mapStateToProps({ products }) {

  const theproduct = products?products.category.products:null;
  const category=products?products.category:null;
  return {
    loading: products === null,
  
   products: theproduct,
  category: category,
  };
}

