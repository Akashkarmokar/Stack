import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Problem from './Problem'

export default class ProblemTag extends BaseModel {
  /**
   * Relational Columns
   */
  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  /**
   * Model Relationships
   */
  @manyToMany(()=>Problem,{
    pivotTable:'problems_problems_tags'
  })
  public problems: ManyToMany<typeof Problem>
}
