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
import { VehicleType } from './enums/Vehicle-type.enum';
import { Customers } from 'src/customers/customers.entity';

@Entity('vehicle_info')
@Unique(['code'])
export class Vehicles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10, // Matches the 'VARCHAR(10)' constraint from your SQL
    nullable: false,
    unique: true, // Additional safety to ensure uniqueness at the DB level
    default: () => "'VEH' || TO_CHAR(NEXTVAL('vehicle_seq'), 'FM0000')", // SQL default generation
    insert: false,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 95,
    nullable: false,
  })
  registration: string;

  @Column({
    type: 'enum',
    enum: VehicleType,
    nullable: false,
  })
  type: VehicleType;

  @ManyToOne(() => Customers, (customer) => customer.code, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_code', referencedColumnName: 'code' }) // Foreign key relationship
  customer_code: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' }) // Timestamp column for creation
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' }) // Timestamp column for updates
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true }) // Nullable for soft deletes
  deletedAt?: Date;
}
