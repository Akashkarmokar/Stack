import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SynchronizationInfoValidator from './SynchronizationInfoValidator'
import SynchronizationInfoService from './SynchronizationInfoService'


export default class SynchronizationInfoController{
    private synchronizationInfoValidator : SynchronizationInfoValidator
    private synchronizationInfoService : SynchronizationInfoService

    constructor(){
        this.synchronizationInfoValidator = new SynchronizationInfoValidator();
        this.synchronizationInfoService = new SynchronizationInfoService();
    }

    public async all(){
        return this.synchronizationInfoService.all();
    }
    public async mostRecent(){
        return this.synchronizationInfoService.mostRecent();
    }
}