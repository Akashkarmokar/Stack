import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ProblemTag from './ProblemTag'
import ProblemType from './ProblemType'
import Contest from './Contest'

export default class Problem extends BaseModel {
  /**
   * Relational Columns
   */
  @column({ isPrimary: true })
  public id: number
  @column()
  public prefixContestId: number
  @column()
  public typeId: number

  /**
   * Non Relational Columns
   */
  @column()
  public contestId: number
  @column()
  public index: string
  @column()
  public name: string

  /**
   * Nullable Columns
   */
  @column()
  public points: number
  @column()
  public rating: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Model Relationships
   */
  @manyToMany(()=>ProblemTag,{
    pivotTable:'problems_problems_tags'
  })
  public tags: ManyToMany<typeof ProblemTag>
  @belongsTo(()=>ProblemType,{
    localKey:'typeId'
  })
  public types: BelongsTo<typeof ProblemType>
  @belongsTo(()=>Contest)
  public contest:BelongsTo<typeof Contest>
}
