import { Component } from 'react';

import ContactsForm from './ContactsForm/ContactsForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import Section from './UI/Section';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

class App extends Component {
  state = { ...INITIAL_STATE };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  handleAddContact = contact => {
    const { contacts } = this.state;
    if (contacts.filter(({ name }) => name === contact.name).length !== 0) {
      alert(contact.name + ' is already in contacts!');
      return;
    }

    this.setState(prevState => ({
      ...INITIAL_STATE,
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handleDeleteContact = id => {
    this.setState(({ contacts }) => {
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      return { ...INITIAL_STATE, contacts: updatedContacts };
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const lowFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <>
        <Section title="Phonebook">
          <ContactsForm onAddContact={this.handleAddContact} />
        </Section>

        <Section title="Contacts">
          <Filter filter={filter} onFilterChange={this.handleFilterChange} />
          <ContactsList
            contacts={filteredContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </Section>
      </>
    );
  }
}

export default App;
