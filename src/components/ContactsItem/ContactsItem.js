import { Item } from './ContactsItem.styled';

const ContactsItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <Item>
      {name}: {number}
      <button type="button" onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </Item>
  );
};

export default ContactsItem;
