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
        type: 'real',
        default: 0.00
    })
    amount: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(
        () => Client,
        client => client.transactions,{onDelete: 'CASCADE'}
    )
    @JoinColumn({
        name: 'client_id'
    })
    client: Client;
}