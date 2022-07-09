import ProblemType from "App/Models/ProblemType";

export default class ProblemTypeQuery{
    public async getTypeId(typeName){
        let type = await ProblemType.findBy('title',typeName);
        if(type == null){
            type = await ProblemType.create({title:typeName});
        }
        return type.id;
    }
}