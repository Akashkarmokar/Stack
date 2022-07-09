<template>
    <div>
        <div class="container">
        <div class="row mt-5">
          <!-- {{tableDetails.viewOption}} -->
        <div class="table-responsive">
          <table class="table table-sm table-borderless table-striped">
            <thead>
              <tr>
                <th class="text-center">Contest</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
                <th class="text-center">Problem</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData" :key="index">
                <th scope="row" class="text-center">{{item.name}}</th>
                <td v-for="(problemItem,problemIndex) in item.problems" :key="problemIndex">
                  <div class="tb-data mb-0">
                    <p class="mb-0"><a :href="`https://codeforces.com/contest/${item.contest_id}/problem/${problemItem.index}`" target="_blank">{{problemItem.index}}. {{problemItem.name}}</a></p>
                    <div v-if="tableDetails.viewOption.length > 0" class="tb-data-details">
                      <p v-if="tableDetails.viewOption.indexOf('point') != -1 && problemItem.points != null" class="mb-0">*P {{problemItem.points}}</p>
                      <p v-if="tableDetails.viewOption.indexOf('rating') != -1 && problemItem.points != null" class="mb-0">*R {{problemItem.rating}}</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
      <div class="container">
        <!-- {{paginationInfo}} -->
        <!-- Pagination -->
        <div class="row mt-5">
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled" :class="{ disabled: selected.pageNumber === 1}">
                <a class="page-link" @click.stop="loadPrevContestAndProblems">Previous</a>
              </li>
              <li v-for="(item,index) in paginationInfo.last_page" :key="index" class="page-item"><a class="page-link" @click.stop="loadContestAndProblemsByPageNumber(item)">{{item}}</a></li>
              <li class="page-item">
                <a class="page-link" @click.stop="loadNextContestAndProblems">Next</a>
              </li>
            </ul>
          </nav>
        </div>
        <!-- Pagination -->
      </div>
    </div>    
</template>
<script>
  export default{
    props:{
      tableDetails: Object
    },
    data(){
      return{
        selected:{
          pageNumber:1
        },
        tableData:[],
        paginationInfo:{}
        
      }
    },
    watch:{
      async 'tableDetails.contestType'(){
        await this.loadContestAndProblemsByPageNumber(1);
      },
      async 'tableDetails.contestCategory'(){
        await this.loadContestAndProblemsByPageNumber(1);
      }
    },
    async created(){
      await this.loadContestAndProblemsByPageNumber(1);
    },
    methods:{
      async loadNextContestAndProblems(){
        this.selected.pageNumber++;
        await this.loadContestAndProblemsByPageNumber(this.selected.pageNumber);
      },
      async loadPrevContestAndProblems(){
        this.selected.pageNumber--;
        await this.loadContestAndProblemsByPageNumber(this.selected.pageNumber);
      },
      async loadContestAndProblemsByPageNumber(pageNumber){
        let apiEndpoint = `contest/${this.tableDetails.contestType.id}`;
        apiEndpoint += this.tableDetails.contestType.title === 'CF' ? `/${this.tableDetails.contestCategory.id}` : '';
        apiEndpoint+=`/?page=${pageNumber}`;
        const {data} = await this.CallApi('GET',apiEndpoint);
        this.tableData = data.data;
        this.paginationInfo = data.meta;
      }
    },
    
  }
</script>