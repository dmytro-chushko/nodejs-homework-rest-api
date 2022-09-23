const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');
const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contactById = contacts.find(item => item.id === contactId);
  if (!contactById) {
    console.log(`There is no item with id: ${contactId}`);
    return null;
  }
  return contactById;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    console.log(`There is no item with id: ${contactId}`);
    return null;
  }
  const updatedContacts = contacts.filter(item => item.id !== contactId);
  updateContacts(updatedContacts);
  return contacts[idx];
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  const updatedContacts = [...contacts, newContact];
  updateContacts(updatedContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, ...body };
  updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
