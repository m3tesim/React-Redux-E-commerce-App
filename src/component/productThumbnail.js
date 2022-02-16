import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _getProductsById } from '../assets/API'

 class ProductThumbnail extends Component {

  render() {
const{product}=this.props

    return (

      <div  className='thubnail'>
          <img  src={product.gallery[0]} alt={`${product.name} image`}/>
          
         <div>{product.name}</div>  
         <div>{product.prices[0].currency.symbol} {product.prices[0].amount} </div>  

           </div>

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