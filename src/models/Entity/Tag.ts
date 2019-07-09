import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Tag {
  @PrimaryColumn({ readonly: true, length: 32 })
  public readonly id: string

  @Column({ length: 50, unique: true })
  public name: string

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

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
