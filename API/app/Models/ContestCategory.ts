import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Contest from './Contest'

export default class ContestCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Relationships
   */
  @manyToMany(()=>Contest,{
    pivotTable:'contest_categories_contests'
  })
  public contests: ManyToMany<typeof Contest>
}
