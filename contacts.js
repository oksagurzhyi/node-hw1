const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const listOfContacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(listOfContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const listOfContacts = await listContacts();
    const contact = listOfContacts.find((item) => item.id === contactId);
    return contact || null;
  } catch (error) {}
}

async function removeContact(contactId) {
  try {
    const listOfContacts = await listContacts();
    const index = listOfContacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [deletedContact] = listOfContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const listOfContacts = await listContacts();

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    listOfContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
