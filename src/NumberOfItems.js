import React, { Component } from "react";

class NumberOfItems extends Component{
    render(){
        const {arr} = this.props
        return(
            <div className="numberOfItems">{arr.length}  Task available</div>
        )
    }
}

export default NumberOfItems