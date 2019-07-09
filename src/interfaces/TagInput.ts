export interface AddTagInput {
  name: string
}

export interface UpdateTagInput {
  id: string
  name?: string
}

export interface DeleteTagInput {
  id: string
}
