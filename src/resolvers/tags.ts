import { Tag } from '~/models/Entity'
import { TagService } from '~/models/Service'
import { AddTagInput, UpdateTagInput } from '~/interfaces'

const service = new TagService()

const tag = async (_parent: any, args: { id: string }, _ctx: any, _info: any) => {
  return await service.findById(args.id)
}

const tags = async () => {
  return await service.findAll()
}

const searchTag = async (_parent: any, args: { input: Partial<Tag>[] }, _ctx: any, _info: any) => {
  return await service.search(args.input)
}

const addTag = async (_parent: any, args: { input: AddTagInput }, _ctx: any, _info: any) => {
  return await service.insert(args.input)
}

const updateTag = async (_parent: any, args: { input: UpdateTagInput }, _ctx: any, _info: any) => {
  return await service.update(args.input)
}

const deleteTag = async (_parent: any, args: { id: string }, _ctx: any, _info: any) => {
  return await service.delete(args.id)
}

export const tagQuery = {
  tag,
  tags,
  searchTag
}

export const tagMutation = {
  addTag,
  updateTag,
  deleteTag
}
