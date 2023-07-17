import { hashSync } from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { generateConfirmationCode } from '../utils/number';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    name: 'confirmation_code',
    select: false,
  })
  confirmationCode: string;

  @Column({
    name: 'is_confirmed',
    default: false,
  })
  isConfirmed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toJSON = () => {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      confirmationCode: this.confirmationCode,
      isConfirmed: this.isConfirmed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };

  @BeforeInsert()
  private setConfirmationCode = () => {
    this.confirmationCode = generateConfirmationCode();
  };

  @BeforeInsert()
  private hashPassword = () => {
    const salt = 10;
    this.password = hashSync(String(this.password), salt);
  };
}
