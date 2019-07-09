import { AddTagInput } from '~/interfaces'

export interface AddBookmarkInput {
  title: string
  description: string
  url: string
  tags: AddTagInput[]
}

export interface UpdateBookmarkInput {
  id: string
  title?: string
  description?: string
  url?: string
}

export interface DeleteBookmarkInput {
  id: string
}
