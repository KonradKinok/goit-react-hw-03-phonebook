import { Component } from "react";
import PropTypes from "prop-types";
import scss from "./SeparateContact.module.scss"

export default class SeparateContact extends Component {
    static propTypes = {
        contact: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }).isRequired,
        onDelete: PropTypes.func.isRequired,
    };

    handleDelete = () => {
        const { contact, onDelete } = this.props;
        onDelete(contact.id);
    };

    render() {
        const { contact } = this.props;
        return (
            <li className={scss.containerContact} key={contact.id} >
                <span > {contact.name}: {contact.number}</span>
                <button
                    type="button"
                    onClick={this.handleDelete}>
                    Delete
                </button>
            </li>
        );
    }
}