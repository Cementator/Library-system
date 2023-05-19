import { Author } from 'src/authors/entities/author.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'integer', nullable: false })
  hardCopies: number;

  @Column({ type: 'integer', nullable: false })
  availableCopies: number;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Set available number of copies
  @BeforeInsert()
  async assignAvailableBooks(): Promise<void> {
    if (this.hardCopies) {
      this.availableCopies = this.hardCopies;
    }
  }
}
