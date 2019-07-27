import React from 'react';
import NavbarComponent from './NavbarComponent.js';

class ListViewer extends React.Component {
    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent>
                <h1>List Viewer</h1>
            </div>
        )
    }
}
export default ListViewer;