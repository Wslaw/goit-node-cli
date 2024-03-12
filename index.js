import { program } from "commander";
import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await listContacts();
      return console.table(data);

    case "get":
      const contacts = await getContactById(id);
      return console.log(contacts);

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deleteContact = await removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
