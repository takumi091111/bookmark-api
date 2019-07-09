import { EntityRepository, Repository } from 'typeorm'
import { Tag } from '~/models/Entity'

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  findAll() {
    return this.find()
  }
  
  findById(id: string) {
    return this.findOne({ id })
  }

  search(conditions: Partial<Tag> | Partial<Tag>[]) {
    return this.find({
      where: conditions
    })
  }
}
