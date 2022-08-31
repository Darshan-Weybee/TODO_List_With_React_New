import React, { Component } from "react";

class StatusBtn extends Component{
    render(){
        const {btnClickHandler, actionHandler, sortHandler, completeFlag, activeFlag} = this.props;
        return(
            <div className="navBar">
                <select name="Actions" className="action" onClick={actionHandler}>
                    <option value="Actions">Actions</option>
                    <option value="Delete-Selected">Delete Selected</option>
                    <option value="SelectAll"> SelectAll</option>
                    <option value="UnselectAll"> UnselectAll</option>
                </select>
                <div className="StatusBtn" onClick={btnClickHandler}>
                    <button className={`allbtn stateButton ${(!activeFlag && !completeFlag) ? "active" : "default"}`} >All</button>
                    <button className={`activebtn stateButton ${activeFlag ? "active" : "default"}`} >Active</button>
                    <button className={`completedbtn stateButton ${completeFlag ? "active" : "default"}`}>Completed</button>
                </div>
                <select name="Sort" className="sort" onClick={sortHandler}>
                    <option value="sort">Sort</option>
                    <option value="A-to-Z" className="drop-down-sort">A to Z</option>
                    <option value="Z-to-A" className="drop-down-sort"> Z to A</option>
                    <option value="Oldest" className="drop-down-sort"> Oldest</option>
                    <option value="Newest" className="drop-down-sort"> Newest</option>
                </select>
            </div>
        )
    }
}

export default StatusBtn