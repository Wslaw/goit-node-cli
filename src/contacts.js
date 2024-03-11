import fs from "fs/promises";
import path from "path";
// import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language"

const contactsPath = path.resolve( "src","db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.error("Error reading contacts file:", error.message);
    throw error;
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact || null);
    return contact || null;
  } catch (error) {
    console.error("Error reading contacts file:", error.message);
    throw error;
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    const removedContact = contacts.find((c) => c.id === contactId);
    contacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(removedContact || null);
    return removedContact || null;
  } catch (error) {
    console.error("Error reading or writing contacts file:", error.message);
    throw error;
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(newContact);
    return newContact;
  } catch (error) {
    console.error("Error reading or writing contacts file:", error.message);
    throw error;
  }
}

// module.exports = { listContacts, getContactById, removeContact, addContact };
