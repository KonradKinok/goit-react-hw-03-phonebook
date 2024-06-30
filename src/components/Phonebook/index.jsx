import { Component } from "react";
import PropTypes from "prop-types";
import scss from "./Phonebook.module.scss";
import ContactForm from "../ContactForm";
import Filter from "../Filter";
import ContactList from "../ContactList";

export class Contacts extends Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                number: PropTypes.string.isRequired,
            })
        ),
        filter: PropTypes.string,
        addContact: PropTypes.func,
        handleDelete: PropTypes.func,
    };

    constructor() {
        super();
        this.state = {
            contacts: this.loadLocalStorage(this.localStorageKey) ? this.loadLocalStorage(this.localStorageKey) : [],
            filter: "",
        };
    }

    //Load LocalStorage Data
    localStorageKey = 'Phonebook-local-storage';
    loadLocalStorage(key) {
        try {
            const serializedState = localStorage.getItem(key);
            return serializedState === null ? undefined : JSON.parse(serializedState);
        } catch (error) {
            console.error('Get state error: ', error.message);
        }
    }
    //Save LocalStorage Data
    saveLocalStorage(key, value) {
        try {
            const serializedState = JSON.stringify(value);
            localStorage.setItem(key, serializedState);
        } catch (error) {
            console.error('Set state error: ', error.message);
        }
    }

    addContact = (contact) => {
        this.setState((prevState) => {
            const updatedContacts = [...prevState.contacts, contact];
            this.saveLocalStorage(this.localStorageKey, updatedContacts);
            return { contacts: updatedContacts };

        });

    };

    handleDelete = (contactId) => {
        this.setState((prevState) => {
            const updatedContacts = prevState.contacts.filter(
                (contact) => contact.id !== contactId,
            );
            this.saveLocalStorage(this.localStorageKey, updatedContacts);
            return { contacts: updatedContacts };
        });
    };
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value });
    };
    render() {
        const { filter, contacts } = this.state;
        return (
            <div className={scss.phonebookContainer}>
                <h1>Phonebook</h1>
                <ContactForm addContact={this.addContact} contacts={contacts} />

                <h2>Contacts</h2>
                <Filter filter={filter} onFilterChange={this.handleFilterChange} />
                <ContactList contacts={contacts}
                    filter={filter}
                    onDelete={this.handleDelete}
                />
            </div>
        )
    }
}