import Vue from 'vue'
import ViewUI from 'view-design'

Vue.use(ViewUI);

Vue.mixin({
    methods:{
        /**
         * These Functions for Common Methods over all of Pages/Components 
         */
        info(message,greeding = 'Hey !'){
            this.$Notice.info({ title: greeding, desc: message})
        },
        success(message,greeding='Great!'){
            this.$Notice.success({ title: greeding, desc:message});
        },
        warning(message,greeding='Hello !'){
            this.$Notice.warning({ title:greeding , desc: message})
        },
        erroR(message,greeding='Oops !'){
            this.$Notice.error({ title: greeding, desc: message})
        },
        SomethingWentWrong(){
            this.$Notice.error({ title: 'Oops!' , desc: 'Something went wrong,Please Try Again Later'})
        },
        validationError(response){
            for(let element of response.data.errors){
                this.info(element.message);
            }
        },
        /**
         * 
         * @param {String} method ex: Get | Put | ....
         * @param {String} apiEndPoint Ex:"www.example.com/api/bla/bla"
         * @param {Object} dataObj 
         * @returns Response of Api Call
         */
        async CallApi(method,apiEndPoint,dataObj){
            try {
                const data = await this.$axios({
                    config:{
                        withCredentials: false,
                    },
                    method:method,
                    url: apiEndPoint,
                    data: dataObj,
                });
                return data
            } catch (error) {
                let res = error.response;
                if(res.status == 403){
                    window.location = '/login'
                }else if(res.status == 422 || res.status == 401){
                    this.validationError(res);
                }else if(response.status == 404 || response.status == 401){
                    if(response.data.message){
                        this.info(response.data.message);
                    }
                }else{
                    this.SomethingWentWrong();
                }
                return error.response;
            }
        }
    }
})