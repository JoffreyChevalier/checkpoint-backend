import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Country {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  @Field()
  code: string
  
  @Column()
  @Field()
  name: string
  
  @Column()
  @Field()
  emoji: string
  
  @Column()
  @Field()
  continent: string
}
