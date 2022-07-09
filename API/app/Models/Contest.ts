import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ContestCategory from './ContestCategory'
import ContestType from './ContestType'
import Problem from './Problem'

export default class Contest extends BaseModel {
  /**
   * Relational Columns
   */
  @column({ isPrimary: true })
  public id: number
  @column()
  public typeId: number

  /**
   * Non Relational Columns
   */
  @column()
  public contestId: number
  @column()
  public name: string
  @column()
  public phase: string
  @column()
  public frozen: boolean
  @column()
  public durationSeconds: number

  /**
   * Can be Null
   */
  @column()
  public startTimeSeconds: number
  @column()
  public relativeTimeSeconds: number
  @column()
  public preparedBy: string
  @column()
  public websiteUrl: string
  @column()
  public description: string
  @column()
  public difficulty: number
  @column()
  public kind: string
  @column()
  public icpcRegion: string
  @column()
  public country: string
  @column()
  public city: string
  @column()
  public season: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Relationships
   */
  @manyToMany(()=>ContestCategory,{
    pivotTable:'contest_categories_contests'
  })
  public categories: ManyToMany<typeof ContestCategory>

  @belongsTo(()=>ContestType,{
    localKey: 'typeId'
  })
  public type: BelongsTo<typeof ContestType>

  @hasMany(()=>Problem,{
    foreignKey:'prefixContestId'
  })
  public problems: HasMany<typeof Problem>
}
