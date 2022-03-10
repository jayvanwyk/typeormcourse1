import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

export enum TransactionTypes{
    DEPOSIT = 'credit',
    WITHDRAW = 'debit'
}

@Entity('transaction')
export class Transaction extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: TransactionTypes
    })
    transaction_type: string;

    @Column({
        type: 'numeric'
    })
    amount: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(
        () => Client,
        client => client.transactions
    )
    @JoinColumn({
        name: 'client_id'
    })
    client: Client
}