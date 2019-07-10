import { Service } from '~/models/Service'
import { Tag } from '~/models/Entity'
import { TagRepository } from '~/models/Repository'
import { AddTagInput, UpdateTagInput } from '~/interfaces'

export class TagService extends Service {
  async findAll() {
    const tagRepo = await this.getCustomRepository(TagRepository)
    return tagRepo.findAll()
  }

  async findById(id: string) {
    const tagRepo = await this.getCustomRepository(TagRepository)
    return tagRepo.findById(id)
  }

  async findByName(name: string) {
    const tagRepo = await this.getCustomRepository(TagRepository)
    return tagRepo.find({
      where: { name }
    })
  }

  async insert(input: AddTagInput) {
    const { name } = input
    const tagRepo = await this.getCustomRepository(TagRepository)

    const duplicates = await tagRepo.find({ name })

    if (duplicates.length > 0) return

    const tag = tagRepo.create({
      id: this.generateId(),
      name
    })

    return tagRepo.save(tag)
  }

  async update(input: UpdateTagInput) {
    const { id } = input
    const tagRepo = await this.getCustomRepository(TagRepository)

    const tag = await tagRepo.findById(id)
    if (!tag) return

    const updateValue = { ...input }
    delete updateValue.id

    await tagRepo.update({ id }, updateValue)
    return tagRepo.findById(id)
  }

  async delete(id: string) {
    const tagRepo = await this.getCustomRepository(TagRepository)

    const tag = await tagRepo.findById(id)
    if (!tag) return false

    await tagRepo.delete({ id })
    return true
  }

  async search(input: Partial<Tag> | Partial<Tag>[]) {
    const tagRepo = await this.getCustomRepository(TagRepository)
    return tagRepo.search(input)
  }
}
