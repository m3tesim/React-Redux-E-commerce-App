import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _getProductsById } from '../assets/API'

 class ProductThumbnail extends Component {
 bar = "dscs"
  render() {
const{product,currencies}=this.props

//console.log(currencies)
const currency =product.prices.filter((c)=>(
  c.currency.label===currencies.label
))

console.log("the new cuurency"+JSON.stringify(currency))

    return (

      <div  className='thubnail'>
          <img  src={product.gallery[0]} alt={`${product.name} image`}/>
          
         <div>{product.name}</div>  
         <div>
           
           
           {currency[0].currency.symbol} {currency[0].amount} </div>  

           </div>

    )
  }
}


export default connect(mapStateToProps)(ProductThumbnail)


function mapStateToProps({ products,currencies },{id}) {
    const theProducts =  products.category.products
    const product=theProducts.filter((p)=>(p.id===id))
    
    return {
     product:product[0]     ,
     currencies 
    };
  }