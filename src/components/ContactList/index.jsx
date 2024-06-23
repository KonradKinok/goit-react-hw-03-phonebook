import { Component } from "react";
import PropTypes from "prop-types";
import SeparateContact from "../SeparateContact"

export default class ContactList extends Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
        filter: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired,
    };

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value });
    };

    handleDelete = () => {
        const { contact, onDelete } = this.props;
        onDelete(contact.id);
    };
    render() {
        const { contacts, filter, onDelete } = this.props;

        const filteredContacts = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
        return (
            <div>
                <ul>
                    {filteredContacts.map((contact) => (
                        <SeparateContact
                            key={contact.id}
                            contact={contact}
                            onDelete={onDelete}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}