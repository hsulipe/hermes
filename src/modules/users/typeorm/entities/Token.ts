import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  UpdateDateColumn
} from 'typeorm';

@Entity(`hermes-users-tokens-${process.env.ENVIRONMENT_NAME}`)
export default class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
