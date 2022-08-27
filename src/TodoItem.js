import React, { Component } from "react";

class TodoItem extends Component{
    
    myStyle= {
        display: "flex",
        flexDirection: "row",
        justifyContent : "space-between",
        margin: "0.2rem"
    }

    render(){
        console.log(this.props.index, this.props.editClick)
        return(
            <div>
                <div style = {this.myStyle}>
                    <div>
                        <input type="checkbox"  className="checkbox" id={`check-${this.props.ele.id}`} style={{marginRight: "0.3rem"}} onChange={this.props.changeCheckBox} checked={this.props.ele.checked}/>
                        <span id={`span-${this.props.ele.id}`} className={`${(this.props.editClick && this.props.index === this.props.ele.id) ? "hidden" : ""} ${this.props.ele.checked ? "strike" : ""}`}>{this.props.ele.title}</span>
                        <input type="text" className={`editBox ${(this.props.editClick && this.props.index === this.props.ele.id) ? "" : "hidden"}`} id={`input-${this.props.ele.id}`} placeholder={this.props.ele.title} onKeyDown={this.props.changeTitle}/>
                    </div>
                    
                    <div>
                        <button className={`editbtn ${(this.props.editClick && this.props.index === this.props.ele.id) ? "hidden" : ""}`} id={`editBtn-${this.props.ele.id}`} style={{marginRight: "0.3rem"}} onClick={this.props.editBtnHandler}>Edit</button>
                        <button className={`savebtn ${(this.props.editClick && this.props.index === this.props.ele.id)? "" : "hidden"}`} id={`saveBtn-${this.props.ele.id}`} style={{marginRight: "0.3rem"}} onClick={this.props.saveBtnHandler}>Close</button>
                        <button className="deletebtn" id={`deletebtn-${this.props.ele.id}`} style={{marginRight: "0.3rem"}} onClick={this.props.deleteBtnHandler}>Delete</button>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}

export default TodoItem