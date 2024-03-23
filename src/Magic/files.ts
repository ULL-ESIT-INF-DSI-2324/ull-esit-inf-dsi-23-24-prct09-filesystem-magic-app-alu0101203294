import fs from 'fs';
import { Card } from '../Magic/interfaces/card.js';
import * as path from 'path';

export class FileManager {
  private readonly userDir: string;

  constructor(private username: string) {
    this.userDir = `./src/Magic/users/${username}`;
  }

  public getUserDir(): string {
    return this.userDir;
  }

  public getFilePath(cardId: number): string {
    return path.join(this.userDir, `card_${cardId}.json`);
  }

  public load(): Map<number, Card> {
    const collection = new Map<number, Card>();
    if (fs.existsSync(this.userDir)) {
      const files = fs.readdirSync(this.userDir);
      for (const file of files) {
        const data = fs.readFileSync(path.resolve(this.userDir, file), 'utf-8');
        const card = JSON.parse(data) as Card;
        collection.set(card.id, card);
      }
    }
    return collection;
  }

  public save(collection: Map<number, Card>): void {
    this.createDirectoryIfNotExists();
    for (const [cardId, card] of collection) {
      const filePath = this.getFilePath(cardId);
      fs.writeFileSync(filePath, JSON.stringify(card, null, 2));
    }
  }

  private createDirectoryIfNotExists(): void {
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
  }
}