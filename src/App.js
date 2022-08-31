import React, { Component } from "react"
import './App.css';
import TodoItem from "./TodoItem";
import Control from "./Control";
import StatusBtn from "./StatusBtn";
import NumberOfItems from "./NumberOfItems";

class Main extends Component {

    constructor(){
        super();
        this.inputRef = React.createRef();
        this.state = {
            data : [],
            temp : [],
            activeFlag : false,
            completeFlag : false,
            addFlag : false,
            searchFlag : false,
            editClick : false,
            index: 0
        }
    }

    addBtnClickHandler = (e) => {
        this.inputRef.current.classList.remove("hidden")
        this.inputRef.current.focus();
        this.setState((pst) => ({...pst, addFlag : true, searchFlag : false}))
        this.tempUpdater();
        // Element.nextElementSibling
    }

    searchBtnClickHandler = (e) => {
        this.inputRef.current.classList.remove("hidden")
        this.inputRef.current.focus();
        this.setState((pst) => ({...pst, addFlag : false, searchFlag : true}))
        // Element.previousElementSibling 
    }

    searchText = (e) => {
        console.log(e);
        if(!this.state.searchFlag) return;
        let searchValue1 = this.inputRef.current.value;

        if(searchValue1 === ""){
            this.tempUpdater();
            return;
        }
        this.setState((pst) => ({
            ...pst,
            temp : pst.data.filter(ele => 
                {
                    if(pst.activeFlag && ele.title === searchValue1) return ( ele.checked ? null : ele);
                    else if(pst.completeFlag && ele.title === searchValue1) return ( ele.checked ? ele : null);
                    else if(ele.title === searchValue1) return ele;
                    return null;
                })
        }))
    }

    changeCheckBox = (e) => {
        let id = e.target.id.split("-")[1]
        this.setState((prevState) => ({
                ...prevState,
            data : prevState.data.map(el => {
                if(el.id === Number(id)){
                    return {...el,checked:!el.checked}
                }
                return el
            })
        }), () => this.tempUpdater())
    }

    tempUpdater() {
        this.setState((pst) => {
            if(pst.activeFlag) return {...pst, temp : pst.data.filter(el => el.checked === false)};
            else if(pst.completeFlag) return {...pst, temp : pst.data.filter(el => el.checked === true)}
            return {...pst, temp : pst.data}
        })
    }

    deleteBtnHandler = (e) => {
        let id = e.target.id.split("-")[1]
        this.setState((prevState) => ({...prevState,
            data : prevState.data.filter(ele => ele.id !== Number(id)),
            temp : prevState.temp.filter(ele => ele.id !== Number(id))
        }))
    }

    editBtnHandler = (e) => {
        let id = Number(e.target.id.split("-")[1]);
        this.setState(pst => ({...pst, editClick : true, index : id}))
    }

    saveBtnHandler= (e) => {
        this.setState(pst => ({...pst, editClick : false}))
    }

    changeTitle = (e) => { 
        if(e.key === "Escape") this.saveBtnHandler();
        if(e.key!=="Enter") return
        
        this.setState((prevState) => ({...prevState,
                
            data : prevState.data.map(el => {
                if(el.id === prevState.index){
                    el.title = (e.target.value !== "" ? e.target.value: el.title);
                }
                return el
            }),
            temp : prevState.temp.map(el => {
                if(el.id === prevState.index){
                    el.title = (e.target.value !== "" ? e.target.value: el.title);
                }
                return el
            }),
            editClick : false
        }))
    }

    inputKeyPressEventHandler = (e) => {
        if(!this.state.addFlag) return
        if(e.key!=="Enter" || e.target.value==="") return
        let tempid = this.state.data.length === 0 ? 1 : Math.max(...this.state.data.map(ele => ele.id))
        // let tempid = this.state.data.length === 0 ? 1 : this.state.data[this.state.data.length-1].id;
        let addItem = {
            id: (tempid + 1),
            title: this.inputRef.current.value,
            checked : false
        }
    
        this.setState(ps=>({...ps, data : [...ps.data,addItem] }), 
        () => (this.setState( (pst) => ({...pst, temp : this.state.data}))))
        this.inputRef.current.value = "";
    }

    btnClickHandler = (e) => {
        if(e.target.classList.contains("activebtn")){
            this.setState(pst => ({...pst,
                activeFlag : true,
                completeFlag : false,
                temp : pst.data.filter(ele => ele.checked===false)
            }))

        }
        else if(e.target.classList.contains("completedbtn")){
            this.setState(pst => ({...pst,
                completeFlag : true,
                activeFlag : false,
                temp : pst.data.filter((ele) => ele.checked===true)
            }))
        }
        else{
            this.setState(pst => ({...pst,
                completeFlag : false,
                activeFlag : false,
                temp : pst.data
            }))
        }
    }

    actionHandler = (e) => {
        let value = e.target.value;
        if(value === "SelectAll"){
            this.setState((prevState) => ({...prevState,
                temp : prevState.temp.map(ele => ({...ele,checked : true}))
                
        }), () => this.dataUpdater())}

        if(value === "Delete-Selected"){
            this.setState((prevState) => ({...prevState,
                data : prevState.data.filter(ele => ele.checked === false)
        }), () => this.tempUpdater())}

        if(value === "UnselectAll"){
            this.setState((prevState) => ({...prevState,
                temp : prevState.temp.map(ele =>  ({...ele,checked : false}))
        }), () => this.dataUpdater())}
        e.target.value = "Actions";
    }

    dataUpdater(){
        this.setState(pst => ({
            ...pst,
            data : [...new Map([...pst.data, ...pst.temp].map(uel => [uel.id, uel])).values()]
        }),() => this.tempUpdater())
    }

    sortHandler = (e) => { 
        if(e.target.value === "A-to-Z"){
            this.setState((prevState) => ({...prevState,temp: prevState.temp.sort((a,b) => a.title > b.title ? 1 : -1)}))
        }
        if(e.target.value === "Z-to-A"){
            this.setState((prevState) => ({...prevState,temp: prevState.temp.sort((a,b) => a.title > b.title ? -1 : 1)}))
        }
        if(e.target.value === "Oldest"){
            this.setState((prevState) => ({...prevState,temp: prevState.temp.sort((a,b) => a.id - b.id)}))
        }
        if(e.target.value === "Newest"){
            this.setState((prevState) => ({...prevState,temp: prevState.temp.sort((a,b) => b.id - a.id)}))
        }
        e.target.value = "sort";
    }

    render() {
        return (
            <div className="App">
                <h1>TODO LIST</h1>

                <StatusBtn btnClickHandler = {this.btnClickHandler} actionHandler = {this.actionHandler} sortHandler = {this.sortHandler} activeFlag={this.state.activeFlag} completeFlag={this.state.completeFlag}/>

                <input type="text" className="inputElement hidden" onKeyDown={this.inputKeyPressEventHandler} onInput={this.searchText} ref={this.inputRef} placeholder={this.state.addFlag ?  "Add a task..." : "Search a task..."}/>

                <Control  addBtnClickHandler = {this.addBtnClickHandler} searchBtnClickHandler = {this.searchBtnClickHandler} addFlag={this.state.addFlag} searchFlag={this.state.searchFlag}/>

                <NumberOfItems arr = {this.state.temp}/>
                 
                {
                    (this.state.temp.map((ele) => {
                       return <TodoItem  key = {ele.id} ele = {ele} changeCheckBox={this.changeCheckBox} editBtnHandler={this.editBtnHandler} deleteBtnHandler={this.deleteBtnHandler} editClick = {this.state.editClick} index = {this.state.index} saveBtnHandler={this.saveBtnHandler} changeTitle={this.changeTitle}/>

                }))}
            </div>
        )
    }
}

export default Main