import {schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContestValidator{
    public async problemList(ctx: HttpContextContract){
        const contestSchema = schema.create({
            params: schema.object().members({
                typeId: schema.number(),
                categoryId: schema.number.optional(),
            })
        })

        return await ctx.request.validate({schema:contestSchema});
    }
}