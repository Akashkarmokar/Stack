export function getContestCategories(contestName: string){
    const tempCategory = ['Div. 1','Div. 2','Div. 3','Div. 4','Educational Codeforces Round','Codeforces Global Round','Codeforces Beta Round'];
    let finalOutput:string[] = [];
    tempCategory.forEach(element => {
        if(contestName.includes(element)){
            finalOutput.push(element);
        }
    });
    // console.log('fromm helper :',finalOutput);
    if(!finalOutput.length){
        finalOutput = ['Miscellaneous'];
    }
    return finalOutput;
}