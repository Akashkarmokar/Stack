import ContestType from "App/Models/ContestType";

export default class ContestTypeQuery{
    public async getTypeId(title){
        let type = await ContestType.findBy('title',title);
        if(type == null){
            type = await ContestType.create({title});
        }
        return type.id;
    }
}