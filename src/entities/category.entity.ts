import {Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity( { name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    //Relations
    @ManyToMany(()=> ProductEntity, product => product.categories)
    @JoinTable({name: 'product_category'})
    products: ProductEntity[];
}