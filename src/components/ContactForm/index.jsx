import { Component } from "react";
import PropTypes from "prop-types";
import { nanoid } from 'nanoid'
import scss from "./ContactForm.module.scss"

export default class ContactForm extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            number: "",
        };
    }

    handleChange = (ev) => {
        const { name, value } = ev.currentTarget;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        const newContact = {
            id: nanoid(),
            name: this.state.name,
            number: this.state.number,
        };

        const contactExists = this.props.contacts.some(
            (contact) =>
                contact.name === newContact.name ||
                contact.number === newContact.number,
        );

        if (contactExists) {
            window.alert(`${newContact.name} is already in contacts`);
            return;
        }

        this.props.addContact(newContact);
        this.setState({ name: "", number: "" });
    };

    render() {
        const nameId = nanoid();
        const numId = nanoid();
        return (
            <>
                <form className={scss.form} onSubmit={this.handleSubmit}>
                    <label htmlFor={nameId}>Name</label>
                    <input
                        id={nameId}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Z]+((['\u0020-\u002D][a-zA-Z])?[a-zA-Z]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <label htmlFor={numId}>Phone number</label>
                    <input
                        id={numId}
                        type="tel"
                        name="number"
                        // pattern="((\+|00)?[1-9]{2}|0)[1-9]( ?[0-9]){8}"
                        placeholder="567-215-453"
                        pattern="\d\d\d-\d\d\d-\d\d\d"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with + Example: 567-216-456"
                        required
                        value={this.state.number}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Add contact</button>
                </form>
            </>
        );
    }
}

ContactForm.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
    addContact: PropTypes.func.isRequired,
};