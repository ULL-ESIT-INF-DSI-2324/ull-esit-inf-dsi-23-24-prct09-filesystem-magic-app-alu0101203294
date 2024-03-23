/* eslint-disable @typescript-eslint/no-explicit-any */
import yargs from 'yargs';
import { Card } from '../Magic/interfaces/card.js';
import { hideBin } from 'yargs/helpers';
import { CardCollection } from '../Magic/cardmanager.js'; 

yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Add a new user to the collection',
    handler: (argv) => handleCommand('add', argv)
  })
  .command({
    command: 'list',
    describe: 'List all cards of a user in the collection',
    handler: (argv) => handleCommand('list', argv)
  })
  .command({
    command: 'update',
    describe: 'Update card of a user in the collection',
    handler: (argv) => handleCommand('update', argv)
  })
  .command({
    command: 'read',
    describe: 'Read a card of a user in the collection',
    handler: (argv) => handleCommand('read', argv)
  })
  .command({
    command: 'remove',
    describe: 'Remove a card of a user in the collection',
    handler: (argv) => handleCommand('remove', argv)
  })
  .help()
  .parse();

function handleCommand(action: string, argv: any) {
  const collection = new CardCollection(argv.user);
  switch (action) {
    case 'add':{
      const newCard: Card = { ...argv };
      collection.addCard(newCard);
      break;}
    case 'list':
      collection.listCards();
      break;
    case 'update':{
      const updatedCard: Card = { ...argv };
      collection.updateCard(updatedCard);
      break;}
    case 'read':
      collection.readCard(argv.id);
      break;
    case 'remove':
      collection.removeCard(argv.id);
      break;
    default:
      console.log('Invalid command');
  }
}
