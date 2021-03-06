import React from 'react';
import { Checkbox, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default class ToDoItemComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
            itemKey: this.props.itemKey,
            listItemValues: this.props.listItemValues,
            name: '',
            description: '',
            deadline: '',
            dependents: '',
            selectedStatus: {
                title: "not complete",
                key: '2'
            }
        };
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
        this.state.listItemValues.items[this.state.itemKey].name = e.target.value
        this.props.updateListItemValues(this.state.listItemValues);
    }

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
        this.state.listItemValues.items[this.state.itemKey].description = e.target.value
        this.props.updateListItemValues(this.state.listItemValues);
    }

    handleDeadlineChange = (e) => {
        this.setState({ deadline: e.target.value });
        this.state.listItemValues.items[this.state.itemKey].deadline = e.target.value
        this.props.updateListItemValues(this.state.listItemValues);
    }

    handleDependentsChange = (e) => {
        this.setState({ dependents: e.target.value });
        // this.state.listItemValues.items[this.state.itemKey].dependents = e.target.value
        // this.props.updateListItemValues(this.state.listItemValues);
    }

    handleStatusDropdown = (eventKey, event) => {
        switch (eventKey){
            case '0':
                this.setState({
                    selectedStatus: {
                        key: '0',
                        title: "complete"
                    }
                })
                break;
            case '1':
                this.setState({
                    selectedStatus: {
                        key: '1',
                        title: "not complete"
                    }
                });
                break;
            case '2':
                this.setState({
                    selectedStatus: {
                        key: '2',
                        title: "expired"
                    }
                });
                break;
            default:
        }
        this.state.listItemValues.items[this.state.itemKey].status = eventKey;
        this.props.updateListItemValues(this.state.listItemValues);
    }

    handleItemSelected = (e) => {
        this.state.listItemValues.items[this.state.itemKey].selected = e.target.checked
        this.props.updateListItemValues(this.state.listItemValues);
    }

    render() {
        return (
            <tr>
                <td><Checkbox inline onClick={this.handleItemSelected}></Checkbox></td>
                <td><FormControl
                    type="text"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                /></td>
                <td><FormControl
                    type="text"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                /></td>
                <td><FormControl
                    type="text"
                    value={this.state.deadline}
                    onChange={this.handleDeadlineChange}
                /></td>
                <td><DropdownButton
                    title={this.state.selectedStatus.title}
                    key={this.state.selectedStatus.key}
                    id={`dropdown-basic-1`}
                    onSelect={this.handleStatusDropdown}
                    >
                        <MenuItem eventKey="0">complete</MenuItem>
                        <MenuItem eventKey="1">not complete</MenuItem>
                        <MenuItem eventKey="2">expired</MenuItem>
                    </DropdownButton>
                </td>
            </tr>
        )
    }
}