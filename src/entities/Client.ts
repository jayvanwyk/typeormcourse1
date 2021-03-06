import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Person } from './utils/Person';

@Entity('client')
export class Client extends Person {

  @Column({
    type: 'real',
    default: 0
  })
  balance: number;

  @Column({
    default: true,
    name: 'active',
  })
  isActive: boolean;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  additional_info: {
    age: number;
    hair_color: string;
  };

  @OneToMany(
      ()=> Transaction,
      transaction => transaction.client
  )
  transactions: Transaction[]

  @ManyToMany(
      (type) => Banker, {cascade: true}
  )
  bankers: Banker[]

}
