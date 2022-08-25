import React, {Component} from "react";

class Control extends Component{
    render(){
        const {addBtnClickHandler, searchBtnClickHandler, actionHandler, sortHandler, btnClickHandler, arr} = this.props
        return(
            <div className="control">
                    <button className="addbtn" onClick={addBtnClickHandler}><i className="fa-solid fa-plus"></i></button>
                    <button className="searchbtn" onClick={searchBtnClickHandler}><i className="fa-solid fa-magnifying-glass"></i></button>
                    <span className="verticalline">|</span>
                    <span>{arr.length} items left</span>
                    <select name="Actions" className="action" onClick={actionHandler}>
                        <option value="Actions">Actions</option>
                        <option value="Delete-Selected">Delete Selected</option>
                        <option value="SelectAll"> SelectAll</option>
                        <option value="UnselectAll"> UnselectAll</option>
                    </select>
                    <select name="Sort" className="sort" onClick={sortHandler}>
                        <option value="sort">Sort</option>
                        <option value="A-to-Z" className="drop-down-sort">A to Z</option>
                        <option value="Z-to-A" className="drop-down-sort"> Z to A</option>
                        <option value="Oldest" className="drop-down-sort"> Oldest</option>
                        <option value="Newest" className="drop-down-sort"> Newest</option>
                    </select>
                    <div className="state" onClick={btnClickHandler}>
                        <button className="allbtn stateButton" >All</button>
                        <button className="activebtn stateButton" >Active</button>
                        <button className="completedbtn stateButton">Completed</button>
                    </div>
                </div>
        )
    }
}

export default Control