import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
    Route.get('/all','SynchronizationInfo/SynchronizationInfoController.all')
    Route.get('/most-recent','SynchronizationInfo/SynchronizationInfoController.mostRecent')
}).prefix('syncInfo')