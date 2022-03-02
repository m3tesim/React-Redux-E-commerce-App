import React, { Component } from "react";

export default class Gallery extends Component {
  state = {
    value: 0,
  };

  toglleImg = (index) => {

    this.setState(() => ({
      value: index,
    }));
  };
  render() {
    const { product } = this.props;
    return (
      <div>
        <div className="images-container ">

          <img src={product.gallery[this.state.value]} />


          <div className="img-nav">
            {product.gallery.map((img, index) => (
              <img
                onClick={() => this.toglleImg(index)}
                key={index}
                src={img}
              
              />
            ))}
          </div>

        </div>

      </div>
    );
  }
}

/*


 {product.gallery.map((img, index) => {

                
              if (index !== this.state.value) return <img  onClick={()=>this.toglleImg(index)} key={index} src={img} />;
              else return "";
            })}
*/
