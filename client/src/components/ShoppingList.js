import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    render() {
        const {items} = this.props.item;
        return (
            <section className="shopping-list">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <ListGroup className='shopping-items-list'>
                                {items.map(({_id, name}) => (
                                    <ListGroupItem key={_id}><span>{name}</span>
                                    <Button 
                                        onClick={
                                            this.onDeleteClick.bind(this, _id)
                                        }
                                        color="danger">Delete</Button>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);