import React, { Component } from "react";

export default class PopUp extends Component {
    state={
        active:"active"
    }

    setActive=()=>{
     this.setState({active:"false"})
    }

  render() {
    const {title,body}=this.props
    return (

        <>
      <div className={`model ${this.state.active}`}>
        <div className="model-header">
          <div className="title"> {title}</div>
          <button  onClick={()=>this.setActive()} className="close-button">&times; </button>
        </div>

        <div className="model-body">
          {body}
        </div>
      </div>
    <div className={`${this.state.active}`} id='overlay'>
    </div>
    </>
    );
  }
}
