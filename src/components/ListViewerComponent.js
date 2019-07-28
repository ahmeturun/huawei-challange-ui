import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Table } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent.js';
import ToDoItemComponent from './TodoItemComponent.js';
import Authentication from './../common/authentication.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import Enumerable from 'linq';

class EditListFormatter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }
    handleEditList = () => {
        
    }
    render() {
      return (
        <Button><FontAwesomeIcon icon={faEdit} /></Button>
      );
    }
}

function editListFormatter (cell, row){
    return (
      <EditListFormatter active={ cell } />
    );
}

class CustomInsertModal extends React.Component {

    constructor(props, context) {
        super(props, context);
    
        this.state = {
            listName: '',
            numOfListItems:0,
            listItems: [],
            listItemValues: {
                items: []
            }
        };
    }

    handleListNameChange = (e) => {
        this.setState({ listName: e.target.value });
    }

    handleAddItem = () => {
        this.setState({
            numOfListItems: this.state.numOfListItems + 1
        });
    }

    handleRemoveItem = () => {
        for (let i = this.state.listItemValues.items.length-1; i >= 0; i--) {
            if (this.state.listItemValues.items[i].selected) {
                this.state.listItemValues.items.splice(i, 1);
                this.state.listItems.splice(i,1);
                this.setState({
                    numOfListItems: this.state.numOfListItems - 1
                });
                i--;
            }
        }
    }

    handleSaveBtnClick = () => {
        const { columns, onSave } = this.props;
        const newRow = {};
        columns.forEach((column, i) => {
            switch (column.field) {
                case 'name':
                    newRow[column.field] = this.state.listName;
                    break;
                case 'edit':
                    newRow[column.field] = this.state.listItems;

            }
        }, this);
        
        let data = {
            name: newRow.name,
            toDoItems: Enumerable.from(this.state.listItemValues.items).select(el => {
                return {
                    name: el.name,
                    description: el.description,
                    deadline: el.deadline   
                }
            }).toArray()
        }
        fetch(`http://localhost:8090/SaveList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'sessionId': Authentication.getSessionId(),
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((res) => {
                    console.log(res);
                    newRow.id = res.id;
                    onSave(newRow);
                });
            }
            else {
                response.text().then((res) => {
                    alert(JSON.parse(res).error);
                });
            }
        });
    }

    handleListItemValueChanges = (listItemValues) => {
        this.setState({
            listItemValues: listItemValues
        });
        this.setState({
            numOfListItems: listItemValues.items.length
        });
    }
  
    render() {
      const {
        onModalClose,
        onSave,
        columns,
        validateState,
        ignoreEditable
      } = this.props;

      this.state.listItems = [];
      for (var i = 0; i < this.state.numOfListItems; i++) {
          if(!this.state.listItemValues || !this.state.listItemValues.items[i]){
              this.state.listItemValues.items[i] = {
                  name:'',
                  description:'',
                  deadline:'',
                  dependents:''
              }
          }
          this.state.listItems.push(<ToDoItemComponent key={i} itemKey={i} 
            listItemValues={this.state.listItemValues}
            updateListItemValues={this.handleListItemValueChanges}></ToDoItemComponent>);
      };

      return (
        <FormGroup
                controlId="formBasicText" style={{padding:'10px'}} className="modal-content">
                <ControlLabel>List Name:</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.listName}
                    onChange={this.handleListNameChange}
                />
                <br />
                <Button onClick={this.handleAddItem}>Add Item</Button>
                <Button onClick={this.handleRemoveItem}>Remove Item</Button>
                <br />
                <ControlLabel>List Items:</ControlLabel>
                <Table striped bordered condensed hover responsive={false}>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.listItems}</tbody>
                </Table>
                <div className="pullRightBtns">
                    <Button onClick={ onModalClose }>Close</Button>
                    <Button bsStyle="primary" className="pullRightSave" onClick={ () => this.handleSaveBtnClick(columns, onSave) }>Save</Button>
                </div>
            </FormGroup>
      );
    }
  }

class ListViewer extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
            listName: '',
            numLists: 0,
            listsRetrieved: false,
            listItems: []
        };
        this.handleListNameChange = this.handleListNameChange.bind(this);
    }

    handleListNameChange = (e) => {
        this.setState({ listName: e.target.value });
    }

    handleSaveBtnClick = () => {
        const { columns, onSave } = this.props;
        const newRow = {};
        columns.forEach((column, i) => {
          newRow[column.field] = this.refs[column.field].value;
        }, this);
        // You should call onSave function and give the new row
        onSave(newRow);
    }

    createCustomModalForAddList = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const attr = {
          onModalClose, onSave, columns, validateState, ignoreEditable
        };
        
        return (
            <CustomInsertModal { ... attr } />
        );
    }

    componentDidMount() {
        // retrieve todo list
        fetch(`http://localhost:8090/GetToDoList?userName=${Authentication.getUserName()}`, {
            method: 'GET'
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((res) => {
                        console.log(res);
                        this.setState({listItems: res.map((el, ind)  => {
                            let obj = {
                                id: el.id,
                                name: el.name,
                                items: el.toDoItems
                            }
                            return obj;
                        })})
                        this.setState({listsRetrieved: true});
                    });
                }
                else {
                    response.text().then((res) => {
                        alert(JSON.parse(res).error);
                    });
                }
            });
    }

    render() {
        // const items = [];

        const onAfterInsertRow = (row) => {
        }

        const onAfterDeleteRow = (rowKeys) => {
            fetch(`http://localhost:8090/DeleteList?id=${rowKeys}`, {
                method: 'DELETE',
                headers: {
                    'sessionId': Authentication.getSessionId(),
                },
            })
            .then((response) => {
                if (response.ok) {
                    response.json().then((res) => {
                        console.log(res);
                    });
                }
                else {
                    response.text().then((res) => {
                        alert(JSON.parse(res).error);
                    });
                }
            });
        }

        const options = {
            afterInsertRow: onAfterInsertRow,
            insertModal: this.createCustomModalForAddList,
            afterDeleteRow: onAfterDeleteRow 
        };

        const selectRowProp = {
            mode: 'checkbox'
        };

        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <br/>
                <div className="listTable">
                    {this.state.listsRetrieved 
                        ? 
                        (<BootstrapTable data={this.state.listItems} striped={true} hover={true} selectRow={ selectRowProp }
                            insertRow={ true } deleteRow={ true } options={ options }>
                            <TableHeaderColumn dataField="id" hidden isKey={true} dataSort={true}></TableHeaderColumn>
                            <TableHeaderColumn dataField="name" dataSort={true}>List Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="edit" dataSort={false} dataFormat={ editListFormatter } width="90">Edit</TableHeaderColumn>
                        </BootstrapTable>)
                        : null}
                </div>
            </div>
        )
    }
}
export default ListViewer;