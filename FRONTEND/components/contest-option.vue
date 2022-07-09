<template>
    <div class="container my-5">
        <!-- Categories -->
        <div class="row mt-5 px-5">
          <div class="col-md-7">
            <div class="row">
              <select v-model="selected.contestCategory" :disabled="selected.contestType.title !='CF'"  class="form-select form-select-sm mt-2 " aria-label="Disabled select example">
                <option value="" disabled>Choose Category</option>
                <option v-for="(category,index) in contestCategoris" :key="index" :value="{id:category.id,title:category.title}">{{category.title}}</option>
              </select>
              <p class="notes">* (Div 1 + Div 2) is not possible.You will get it individually. </p>
              <!-- <p>{{selected.contestType}}</p>
              <p>{{selected.contestCategory}}</p> -->
            </div>
            <div class="row">
              <div class="contest-types">
                <p class="contest-types-item">Contest Type :</p>
                <div v-for="(type,index) in contestTypes" :key="index" class="form-check contest-types-item">
                  <input  :id="`contestType-${type.title}`" v-model="selected.contestType" :value="{id: type.id, title:type.title}"  class="form-check-input"  type="radio"  name="`contestType">
                  <label class="form-check-label" :for="`contestType-${type.title}`">
                    {{ type.title}}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="row mt-2 ms-5">
              <div class="form-check form-switch ">
                <input id="showPoints" v-model="selected.additionalViewOption" class="form-check-input" type="checkbox" value="point" name="additionalViewOption">
                <label class="form-check-label" for="showPoints">Show Points</label>
              </div>
              <div class="form-check form-switch ">
                <input id="showTotalSolved" v-model="selected.additionalViewOption" class="form-check-input" type="checkbox" value="rating"  name="additionalViewOption">
                <label class="form-check-label" for="showTotalSolved">Show Rating</label>
              </div>
              <!-- <div class="form-check form-switch ">
                <input  id="showColor" v-model="selected.additionalViewOption" class="form-check-input" type="checkbox" value="color" name="additionalViewOption">
                <label class="form-check-label" for="showColor">Show Color</label>
              </div> -->
            </div>
          </div>
        </div>
        <!-- Categories -->
        <div class="row text-center mt-5">
          <h3>Codeforces {{selected.contestCategory.title}}'s Problems</h3>
        </div>
        
        <ContestTable v-if="selected.contestType.id !== -1" :tableDetails="{ viewOption:selected.additionalViewOption,contestType: selected.contestType,contestCategory: selected.contestCategory}"/>
      </div>
</template>
<script>
import ContestTable from './contest-table.vue'
export default {
    components: { ContestTable },
    data(){
        return {
          loading: false,
          selected:{
            contestType:{id:-1,title:''},
            contestCategory:{id:-1,title:''},
            additionalViewOption:['point']
          },
          contestTypes:[],
          contestCategoris:[],
        }
    },
    // watch:{
    //   selected:{
    //     async handler(){
    //       await this.loadContestAndProblems();
    //     },
    //     deep:true,
    //   }
    // },
    async created(){
      await this.loadData();
    },

    methods:{
      /**
       * Component Data Driver
       */
      async loadData(){
        this.loading = true;
        await Promise.all([
          this.loadContestCategories(),
          this.loadContestType(),
        ]);
        this.loading = false;
      },

      
      async loadContestType(){
        const {data} = await this.CallApi('GET','contest/types');

        // Define Component Data Object
        this.contestTypes = data;
        if(data.length){
          this.selected.contestType = data[0];
        }
      },
      async loadContestCategories(){
        // Call API
        const {data} = await this.CallApi('GET','/contest/categories')

        // Define Component Data Object
        this.contestCategoris = data;
        if(data.length){
          this.selected.contestCategory = data[0];
        }
      },
    },
}
</script>