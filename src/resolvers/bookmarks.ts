import { Bookmark } from '~/models/Entity'
import { BookmarkService } from '~/models/Service'
import { AddBookmarkInput, UpdateBookmarkInput } from '~/interfaces'

const service = new BookmarkService()

const bookmark = async (
  _parent: any,
  args: { id: string },
  _ctx: any,
  _info: any
) => {
  const bookmark = await service.findById(args.id)
  return bookmark
}

const bookmarks = async () => {
  const bookmarks = await service.findAll()
  return bookmarks
}

const searchBookmark = async (
  _parent: any,
  args: { input: Partial<Bookmark>[] },
  _ctx: any,
  _info: any
) => {
  const bookmarks = await service.search(args.input)
  return bookmarks
}

const addBookmark = async (
  _parent: any,
  args: { input: AddBookmarkInput },
  _ctx: any,
  _info: any
) => {
  const { tags } = args.input
  args.input.tags = [...new Set(tags)]
  const bookmark = await service.insert(args.input)
  return bookmark
}

const updateBookmark = async (
  _parent: any,
  args: { input: UpdateBookmarkInput },
  _ctx: any,
  _info: any
) => {
  return service.update(args.input)
}

const deleteBookmark = async (
  _parent: any,
  args: { id: string },
  _ctx: any,
  _info: any
) => {
  return service.delete(args.id)
}

export const bookmarkQuery = {
  bookmark,
  bookmarks,
  searchBookmark
}

export const bookmarkMutation = {
  addBookmark,
  updateBookmark,
  deleteBookmark
}
