import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import {CategoryEntity} from "./category.entity";

@Entity ({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable:true})
    description: string;

    @Column()
    price: number;
    @ManyToMany(()=> CategoryEntity, category=>category.products)
    @JoinTable()
    categories: CategoryEntity[];
}