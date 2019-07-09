import { EntityRepository, Repository } from 'typeorm'
import { Bookmark, Tag } from '~/models/Entity'

@EntityRepository(Bookmark)
export class BookmarkRepository extends Repository<Bookmark> {
  findAll() {
    return this.find()
  }
  
  findById(id: string) {
    return this.findOne({ id })
  }

  saveWithTags(bookmark: Bookmark, registeredTags: Tag[], newTags: Tag[]) {
    return this.manager.transaction(async entityManager => {
      const missingTags = await entityManager.save(newTags)
      const tags = [...registeredTags, ...missingTags]
      bookmark.tags = tags
      return await entityManager.save(bookmark)
    })
  }

  search(conditions: Partial<Bookmark> | Partial<Bookmark>[]) {
    return this.find({
      where: conditions
    })
  }
}
