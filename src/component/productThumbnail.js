import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _getProductsById } from '../assets/API'

 class ProductThumbnail extends Component {

  render() {
const{product}=this.props

    return (
      <div>ProductThumbnail {product.id}</div>

    )
  }
}


export default connect(mapStateToProps)(ProductThumbnail)


function mapStateToProps({ products },{id}) {
    const theProducts =  products.category.products
    const product=theProducts.filter((p)=>(p.id===id))
    
    return {
     product:product[0]      
    };
  }