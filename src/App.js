import React, { Component } from 'react';
import ToDo from './components/toDo';
import List from './components/list';
import PopUp from './components/popUp';
import Count from './components/count';
import {Row,Col} from 'react-bootstrap';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'uuid';


class App extends Component {
    state={
        itemArray:[],
        id:0,
        item:'',
        selectedItem:0,
        editItem:false,
        showPopup: false,
        deleteId:1,
        completeCount:0
    };
    togglePopup= (id) => {
        this.setState({
            showPopup: !this.state.showPopup, deleteId:id
        });
    };
    componentDidUpdate(nextProps,nextState){
        localStorage.setItem('todo-list',JSON.stringify(this.state.itemArray));
        localStorage.setItem('completeCount',JSON.stringify(this.state.completeCount));
    }
    componentWillMount(){
        localStorage.getItem('todo-list') && this.setState({
            itemArray: JSON.parse(localStorage.getItem('todo-list'))
        })
        localStorage.getItem('completeCount') && this.setState({
            completeCount: JSON.parse(localStorage.getItem('completeCount'))
        })
    }
    handleChange = (e) =>{
        this.setState({
            item: e.target.value
        });
    };
    handleSubmit = (e) =>{
        e.preventDefault();
        let newItem = {
            id:this.state.id,
            title:this.state.item,
            complete:false
        };
        const update = [...this.state.itemArray,newItem];
        this.setState({
            itemArray:update,
            item:'',
            id:uuid()
        });
    };
    handleEdit = (id) =>{
        const filtered = this.state.itemArray.filter(item =>item.id !== id);

        const selected = this.state.itemArray.find(item =>item.id === id);
        this.setState({
            itemArray:filtered,
            item:selected.title,
            editItem:true,
            id:id
        });
    };
    clearList = (e) =>{
        localStorage.removeItem('todo-list');
        localStorage.removeItem('completeCount');
        this.setState({itemArray:[],completeCount:0});

    };
    completedList(item){
        if(item.complete === true){
            this.state.completeCount++;
        }
        else{
            this.state.completeCount--;
        }
    }
    handleComplete =(id) =>{

        const select = this.state.itemArray.find(item => item.id === id);
        select.complete = !select.complete;
        this.completedList(select);
    }
    handleDelete =(id)=>{
        this.togglePopup();
    };

    confirmDelete = () =>{
        if(this.state.deleteId !==1){
        const remainigItems = this.state.itemArray.filter(item =>item.id !== this.state.deleteId);
        this.setState({itemArray:remainigItems,deleteId:1});
            this.togglePopup();
        }
    }
    currentSelect = (id)=>{
        this.setState({selectedItem: id});
    }

  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-10 mx-auto col-md-8 mt-4">
                    <h3 className="text-center">To Do</h3>
                    <Row>
                        <Col xs={9}>
                            <ToDo item={this.state.item} handleChange={this.handleChange} handleSubmit={this.handleSubmit} editItem={this.state.editItem} />
                        </Col>
                        <Col> <Count completeCount={this.state.completeCount} itemArray={this.state.itemArray}/>
                        </Col>
                    </Row>
                   <List itemArray={this.state.itemArray} currentSelect={this.currentSelect} clearList={this.clearList} handleEdit={this.handleEdit}  togglePopup={this.togglePopup} handleComplete={this.handleComplete} handleDelete={this.handleDelete} selectedItem={this.state.selectedItem} />
                </div>
            </div>
            {this.state.showPopup ?
                <PopUp confirmDelete={this.confirmDelete} text='Close Me' closePopup={this.togglePopup.bind(this)} />
                : null
            }
        </div>

    );
  }
}

export default App;
