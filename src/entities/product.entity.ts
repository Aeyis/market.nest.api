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

    @Column({ type: "numeric", precision: 9, scale: 2 })//precision c'est le nombre de chiffres et scale c'est le nombre apres la virgule
    price: number;
    @ManyToMany(()=> CategoryEntity, category=>category.products)
    @JoinTable({name:'product_category'})
    categories: CategoryEntity[];
}