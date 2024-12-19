import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { gender } from './enums/gender';
import { Malls } from 'src/mall/mall.entity';
import { Creds } from 'src/auth/auth.entity';

@Entity()
@Unique(['code'])
export class users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10, // Matches the 'VARCHAR(10)' constraint from your SQL
    nullable: false,
    unique: true, // Additional safety to ensure uniqueness at the DB level
    default: () => "'CRED' || TO_CHAR(NEXTVAL('cred_seq'), 'FM0000')", // SQL default generation
    insert: false,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 95,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  profile_pic?: string;

  @ManyToOne(() => Malls, (mall) => mall.code, { nullable: false })
  @JoinColumn({ name: 'mall_code', referencedColumnName: 'code' })
  mall_code: string;

  // @OneToOne(() => Creds, (cred) => cred.code)
  // @JoinColumn({ name: 'cred_code', referencedColumnName: 'code' })
  // cred_code: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  dob: Date;

  @Column({
    type: 'enum',
    enum: gender,
    nullable: false,
  })
  gender: gender;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) // Timestamp column for creation
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' }) // Timestamp column for updates
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true }) // Nullable for soft deletes
  deletedAt?: Date;
}
