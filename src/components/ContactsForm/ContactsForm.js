import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Form, Input } from './ContactsForm.styled';

const INITIAL_STATE = { name: '', number: '' };

class ContactsForm extends Component {
  state = { ...INITIAL_STATE };

  handleFieldChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAddContant = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAddContact } = this.props;

    onAddContact({ name, number, id: nanoid() });
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleAddContant}>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleFieldChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number">Number</label>
        <Input
          type="tel"
          name="number"
          id="number"
          value={number}
          onChange={this.handleFieldChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit">Add Contact</button>
      </Form>
    );
  }
}

export default ContactsForm;

ContactsForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
