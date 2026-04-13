import {Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity( { name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name:string;

    @ManyToMany(()=> ProductEntity, product => product.categories)
    products: ProductEntity[];
}