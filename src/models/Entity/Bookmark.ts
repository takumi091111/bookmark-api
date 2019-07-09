import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { Tag } from '~/models/Entity'

@Entity()
export class Bookmark {
  @PrimaryColumn({ readonly: true, length: 32 })
  public readonly id: string

  @Column({ length: 255, unique: true })
  public title: string

  @Column({ length: 255 })
  public description: string

  @Column({ length: 2083 })
  public url: string

  @ManyToMany(type => Tag, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinTable()
  public tags?: Tag[]

  @CreateDateColumn({ name: 'createdAt', readonly: true })
  private readonly _createdAt?: Date

  @UpdateDateColumn({ name: 'updatedAt', readonly: true })
  private readonly _updatedAt?: Date

  public get createdAt() {
    const createdAt = this._createdAt
    return (createdAt) ? createdAt.toLocaleString() : void 0
  }

  public get updatedAt() {
    const updatedAt = this._updatedAt
    return (updatedAt) ? updatedAt.toLocaleString() : void 0
  }

  constructor(id: string, title: string, description: string, url: string) {
    this.id = id
    this.title = title
    this.description = description
    this.url = url
  }
}
