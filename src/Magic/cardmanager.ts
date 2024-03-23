import * as fs from 'fs';
import chalk from 'chalk';
import { Card } from '../Magic/interfaces/card.js';
import { FileManager } from '../Magic/files.js';

export class CardCollection {

    private collection: Card[] = [];
    private user: string;
    private file: FileManager;

    constructor(user: string) {
        this.user = user;
        this.file = new FileManager(user);
        this.loadc();
    }

    getColor(color: string): string {
        switch (color.toLowerCase()) {
            case 'blanco':
                return '#FFFFFF';
            case 'azul':
                return '#0000FF';
            case 'negro':
                return '#000000';
            case 'rojo':
                return '#FF0000';
            case 'verde':
                return '#00FF00';
            case 'incoloro':
                return '#999999';
            case 'multicolor':
                return '#ee82ee';
            default:
                return '#000000';
        }
    }

    private loadc(): void {
        this.collection = Array.from(this.file.load().values());
    }

    public addCard(newCard: Card): void {
        if (!newCard.color) {
            console.log(chalk.yellow('The card color is missing.'));
            return;
        }

        if (this.collection.some(card => card.id === newCard.id)) {
            console.log(chalk.yellow('The card with this ID already exists in the collection.'));
            return;
        }
        this.collection.push(newCard);
    
        this.file.save(new Map(this.collection.map(card => [card.id, card])));
    
        console.log(chalk.green('Card added successfully.'));
    }

    public updateCard(updatedCard: Card): void {
        const index = this.collection.findIndex(card => card.id === updatedCard.id);
        if (index !== -1) {
            this.collection[index] = updatedCard;
            this.file.save(new Map(this.collection.map(card => [card.id, card])));
            console.log(chalk.green('Card updated successfully.'));
        } else {
            console.log(chalk.yellow('Card not found in the collection.'));
        }
    }
     
    public removeCard(cardId: number): void {
        const filePath = this.file.getFilePath(cardId);
        try {
            fs.unlinkSync(filePath);
            console.log(`The card file with ID ${cardId} has been deleted.`);
        } catch (err) {
            console.error(`Error deleting card file with ID ${cardId}: ${err}`);
        }
        const collection = this.file.load();
        if (collection.has(cardId)) {
            collection.delete(cardId);
            this.file.save(collection);
        }
    }

    public listCards(): void {
        console.log(chalk.blue('Listing cards in the collection:'));
    
        this.collection.forEach(card => {
            const colorCode = this.getColor(card.color);
            console.log(chalk.yellow.bold(`ID: ${chalk.white(card.id)}`));
            console.log(chalk.green.bold(`Name: ${chalk.white(card.name)}`));
            console.log(chalk.green.bold(`Mana Cost: ${chalk.white(card.manaCost)}`));
            console.log(chalk.green.bold(`Color: ${chalk.hex(colorCode)(card.color)}`));
            console.log(chalk.green.bold(`Card Type: ${chalk.white(card.cardType)}`));
            console.log(chalk.green.bold(`Rarity: ${chalk.white(card.rarity)}`));
            console.log(chalk.green.bold(`Rules Text: ${chalk.white(card.rulesText)}`));
            console.log(chalk.green.bold(`Market Price: ${chalk.white(card.marketPrice)}`));
            if (card.cardType === 'Criatura') {
                console.log(chalk.green.bold(`Strength: ${chalk.white(card.strength)}`));
                console.log(chalk.green.bold(`Resistance: ${chalk.white(card.resistance)}`));
            } else if (card.cardType === 'Planeswalker') {
                console.log(chalk.green.bold(`Loyalty: ${chalk.white(card.loyalty)}`));
            }
    
            console.log('\n');
        });
    }
    
    
    public readCard(cardId: number): void {
        const card = this.collection.find(card => card.id === cardId);
        
        if (card) {
            const colorCode = this.getColor(card.color);
            console.log(chalk.blue('Card details:'));
            console.log(chalk.green.bold(`ID: ${chalk.white(card.id)}`));
            console.log(chalk.green.bold(`Name: ${chalk.white(card.name)}`));
            console.log(chalk.green.bold(`Mana Cost: ${chalk.white(card.manaCost)}`));
            console.log(chalk.green.bold(`Color: ${chalk.hex(colorCode)(card.color)}`));
            console.log(chalk.green.bold(`Card Type: ${chalk.white(card.cardType)}`));
            console.log(chalk.green.bold(`Rarity: ${chalk.white(card.rarity)}`));
            console.log(chalk.green.bold(`Rules Text: ${chalk.white(card.rulesText)}`));
            console.log(chalk.green.bold(`Market Price: ${chalk.white(card.marketPrice)}`));
            if (card.cardType === 'Criatura') {
                console.log(chalk.green.bold(`Strength: ${chalk.white(card.strength)}`));
                console.log(chalk.green.bold(`Resistance: ${chalk.white(card.resistance)}`));
            } else if (card.cardType === 'Planeswalker') {
                console.log(chalk.green.bold(`Loyalty: ${chalk.white(card.loyalty)}`));
            }
        } else {
            console.log(chalk.yellow('Card not found in the collection.'));
        }
    }

    
}