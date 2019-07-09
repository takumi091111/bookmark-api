import { Service } from '~/models/Service'
import { Bookmark } from '~/models/Entity'
import { TagRepository, BookmarkRepository } from '~/models/Repository'
import { AddBookmarkInput, UpdateBookmarkInput } from '~/interfaces'

export class BookmarkService extends Service {
  async findAll () {
    const bookmarkRepo = await this.getCustomRepository(BookmarkRepository)
    return bookmarkRepo.findAll()
  }

  async findById (id: string) {
    const bookmarkRepo = await this.getCustomRepository(BookmarkRepository)
    return bookmarkRepo.findById(id)
  }

  async insert (input: AddBookmarkInput) {
    const { title, description, url, tags } = input

    const bookmarkRepo = await this.getCustomRepository(BookmarkRepository)
    const tagRepo = await this.getCustomRepository(TagRepository)

    const bookmark = bookmarkRepo.create({
      id: this.generateId(),
      title,
      description,
      url
    })

    if (!tags) return bookmarkRepo.save(bookmark)

    // 登録済みのタグを取得
    const registeredTags = await tagRepo.find({
      where: tags
    })

    // タグ名を抽出
    const names = registeredTags.map(tag => tag.name)

    // 登録済みタグと入力値タグの差分を取得して、インスタンスを生成
    const missingTags = tags.filter(tag => names.indexOf(tag.name) === -1)
    const missingTagInstaces = missingTags.map(tag => tagRepo.create({
      id: this.generateId(),
      name: tag.name
    }))

    return bookmarkRepo.saveWithTags(bookmark, registeredTags, missingTagInstaces)
  }

  async update (input: UpdateBookmarkInput) {
    const { id } = input
    const bookmarkRepo = await this.getCustomRepository(BookmarkRepository)
    
    const bookmark = await bookmarkRepo.findById(id)
    if (!bookmark) return

    const updateValue = { ...input }
    delete updateValue.id

    await bookmarkRepo.update({ id }, updateValue)
    return bookmarkRepo.findById(id)
  }

  async delete (id: string) {
    const bookmarkRepo = await this.getCustomRepository(BookmarkRepository)

    const bookmark = await bookmarkRepo.findById(id)
    if (!bookmark) return false

    await bookmarkRepo.delete({ id })
    return true
  }

  async search (input: Partial<Bookmark> | Partial<Bookmark>[]) {
    const bookmarkRepo = await this.getCustomRepository(BookmarkRepository)
    return bookmarkRepo.search(input)
  }
}
