import { users } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shopping_malls')
@Unique(['code'])
export class Malls {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    length: 10, // Matches the 'VARCHAR(10)' constraint from your SQL
    nullable: false,
    unique: true, // Additional safety to ensure uniqueness at the DB level
    default: () => "'MALL' || TO_CHAR(NEXTVAL('cred_seq'), 'FM0000')", // SQL default generation
    insert: false,
  })
  @OneToMany(() => users, (user) => user.mall_code)
  code: string;

  @Column({
    type: 'varchar',
    length: 95,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  address_street_1: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  address_street_2?: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  city: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  state: string;
  @Column({
    type: 'varchar',
    length: 6,
    nullable: false,
  })
  postal_code: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) // Timestamp column for creation
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' }) // Timestamp column for updates
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true }) // Nullable for soft deletes
  deletedAt?: Date;
}
