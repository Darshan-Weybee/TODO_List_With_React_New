import React, {Component} from "react";

class Control extends Component{
    render(){
        const {addBtnClickHandler, searchBtnClickHandler, addFlag, searchFlag} = this.props
        return(
            <div className="control">
                    <button className={`addbtn ${addFlag ? "active" : "default"}`} onClick={addBtnClickHandler}>Add Task</button>
                    <button className={`searchbtn ${searchFlag ? "active" : "default"}`} onClick={searchBtnClickHandler}>Search Task</button>
                </div>
        )
    }
}

export default Control