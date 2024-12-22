import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { AuthType } from './enums/authType';

@Entity({ name: 'creds' }) // Explicit table name mapping
@Unique(['code']) // Ensures the 'code' column is unique
export class Creds {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10, // Matches the 'VARCHAR(10)' constraint from your SQL
    nullable: false,
  })
  code: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string; // Only one @Column decorator for the password field

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) // Timestamp column for creation
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' }) // Timestamp column for updates
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true }) // Nullable for soft deletes
  deletedAt?: Date;

  @Column({
    type: 'enum',
    enum: AuthType,
    nullable: false,
  })
  type: AuthType;
}
