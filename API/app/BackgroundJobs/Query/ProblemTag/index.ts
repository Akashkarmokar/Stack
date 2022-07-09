import ProblemTag from "App/Models/ProblemTag";

export default class ProblemTagQuery{
    public async getTagsIds(listOfTags){
        const tagIds: number[] = [];
        for(let idx =0;idx<listOfTags.length;idx++){
            let tag = await ProblemTag.findBy('title',listOfTags[idx]);
            if(tag == null){
                tag = await ProblemTag.create({title:listOfTags[idx]});
            }
            tagIds.push(tag.id);
        }
        return tagIds;
    }
}