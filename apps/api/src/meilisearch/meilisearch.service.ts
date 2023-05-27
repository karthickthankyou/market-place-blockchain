// meilisearch.service.ts
import { Injectable } from '@nestjs/common'
import { MeiliSearch } from 'meilisearch'

export type Product = {
  id: string
  name: string
  description: string
}

export const INDEX_NAME = 'search'

@Injectable()
export class MeilisearchService {
  public client: MeiliSearch

  constructor() {
    this.client = new MeiliSearch({
      host: 'http://localhost:1200',
      apiKey: 'yourmasterkey',
    })

    this.createIndex(INDEX_NAME)
  }

  async createIndex(indexName: string): Promise<void> {
    await this.client.createIndex(indexName)
    this.setSearchableAttributes(indexName)
  }

  async deleteAllDocuments(indexName = INDEX_NAME): Promise<void> {
    const searchIndex = await this.client.getIndex(INDEX_NAME)

    await searchIndex.deleteAllDocuments()
  }

  async setSearchableAttributes(indexName: string): Promise<void> {
    const index = await this.client.getIndex(indexName)
    const settings = {
      searchableAttributes: ['name', 'description'],
    }
    const { taskUid } = await index.updateSettings(settings)
    await index.waitForTask(taskUid)
  }

  async search({
    query,
    offset = 0,
    limit = 20,
  }: {
    query: string
    offset: number
    limit: number
  }) {
    console.log(offset, limit)
    const searchIndex = await this.client.getIndex(INDEX_NAME)
    const result = await searchIndex.search(query, {
      limit,
      offset,
    })

    return result
  }

  async addToIndex(documents: Product[]): Promise<void> {
    const indexName = INDEX_NAME
    try {
      const index = await this.client.getIndex(indexName)
      const { taskUid } = await index.addDocuments(documents)
      await index.waitForTask(taskUid)
    } catch (e: any) {
      console.error('Error adding documents to index', e)
    }
  }
}
