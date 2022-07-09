import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContestValidator  from './ContestValidator'
import ContestService from './ContestService'


export default class ContestController{
    private contestValidator: ContestValidator
    private contestService: ContestService
    
    constructor(){
        this.contestValidator = new ContestValidator();
        this.contestService = new ContestService();
    }
    public async all(){
        return this.contestService.all();
    }
    public async types(){
        return this.contestService.types();
    }
    public async categories(){
        return this.contestService.categories();
    }
    public async problemList(ctx:HttpContextContract){
        try {
            const payload = await this.contestValidator.problemList(ctx);
            const pageNumber = parseInt(await ctx.request.input('page',1),10);
            const data = { ...payload.params,pageNumber:pageNumber};
            return await this.contestService.problemList(data);
        } catch (error) {
            return ctx.response.status(422).send(error.messages)
        }
    }
}