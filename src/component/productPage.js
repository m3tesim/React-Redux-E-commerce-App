import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './nav'

 class ProductPage extends Component {
  render() {
      const{product}=this.props
    return (
        <div>
        <Nav />

        <div className="container">
<     div className='productContainer'>
    <div className='product'>

    </div>

        <div className='product-info'>
            this is the product naem :{product.name}
            </div>

            

        </div>
        </div>
      </div>

    )
  }
}


export default connect (mapStateToProps) (ProductPage)



function mapStateToProps({products},props){
    const { id } = props.match.params;
    const product =products.category.products.filter((p)=>(p.id===id))

    return{
        id,
       product:product[0]
    }


}
