import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
    Route.get('/all','Contest/ContestController.all')
    Route.get('/types','Contest/ContestController.types')
    Route.get('/categories','Contest/ContestController.categories')
    Route.get('/:typeId/:categoryId?','Contest/ContestController.problemList')
}).prefix('contest')