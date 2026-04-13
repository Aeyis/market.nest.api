import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity( { name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name:string;
}