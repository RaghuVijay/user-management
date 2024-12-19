import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { AuthType } from './enums/authType';
import { users } from 'src/users/users.entity';

@Entity({ name: 'creds' }) // Explicit table name mapping
@Unique(['code']) // Ensures the 'code' column is unique
export class Creds {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10, // Matches the 'VARCHAR(10)' constraint from your SQL
    nullable: false,
    // unique: true, // Additional safety to ensure uniqueness at the DB level
    // default: () => "'CRED' || TO_CHAR(NEXTVAL('cred_seq'), 'FM0000')", // SQL default generation
    // insert: false,
  })
  // @OneToOne(() => users, (user) => user.cred_code)
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
  @Exclude() // Excludes the password from responses when serialized
  password: string;

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
