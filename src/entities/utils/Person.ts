import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';


Entity()
export class Person extends BaseEntity{
    @PrimaryColumn({ type: 'uuid' })
    id: string;
  
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column({
      unique: true,
    })
    email: string;
  
    @Column({
      length: 10,
      unique: true,
    })
    card_number: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}