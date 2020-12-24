<template>
  <div>
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="searchForm.name" size="mini" clearable />
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="searchForm.region" size="mini" placeholder="请选择活动区域" clearable>
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <pagination
      :total="total"
      :limit="limit"
      :page="page"
      @currentChange="currentChange"
    >
      <template v-slot:content>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            :index="customIndex"
            label="序号"
          />
          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

      </template>
    </pagination>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      total: 1000,
      limit: 10,
      page: 1,
      tableData: [],
      searchForm: {}
    }
  },
  methods: {
    handleClick() {},
    currentChange() {},
    customIndex(index) {
      return (this.page - 1) * this.limit + index + 1
    },
    handleSearch() {
      this.page = 1
    }
  }
}
</script>

<style scoped lang="scss">
  .search-form {
    margin-top: 20px;
  }
</style>
