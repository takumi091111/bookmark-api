import uuidv4 from 'uuid/v4'
import { getConnection, createConnection, Connection, ConnectionOptions, ObjectType } from 'typeorm'
import { DB_HOST, DB_PORT, DB_USER, DB_PW, DB_NAME } from '~/utils/env'
import { Tag, Bookmark } from '~/models/Entity'

const options: ConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PW,
  database: DB_NAME,
  entities: [
    Tag,
    Bookmark
  ],
  synchronize: true,
  logging: false
}

export class Service {
  public async connect(): Promise<Connection> {
    let connection: Connection

    try {
      connection = getConnection()
    } catch(err) {
      connection = await createConnection(options)
    }

    return connection
  }

  public async getCustomRepository<T>(repository: ObjectType<T>) {
    const connection = await this.connect()
    return connection.getCustomRepository(repository)
  }

  public generateId() {
    return uuidv4().replace(/\-/g, '')
  }
}
