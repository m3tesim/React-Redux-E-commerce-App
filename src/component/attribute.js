import React, { Component } from "react";

export default class Attribute extends Component {
  render() {


    const{atr,changeAttribute,id}=this.props

    return (
      <div>
        <h5>{atr.name}</h5>

        <div className="atributes">
          {atr.items.map((i, index) => (
            <>
              <input
                key={index}
                type="radio"
                id={id}
                name={atr.name}
                value={i.value}
                onChange={(e) => changeAttribute(e, atr.name)}
                required
              />
              <label htmlFor={id}> {i.value}</label>
            </>
          ))}
        </div>
      </div>
    );
  }
}
