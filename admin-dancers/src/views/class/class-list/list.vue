<template>
  <div class="lt-20">
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true" label-width="80px">
      <el-form-item label="课程名">
        <el-input v-model="searchForm.name" placeholder="请输入课程名" size="mini" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
        <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
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
          v-loading="tableLoading"
          :data="ClassLists"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            :index="customIndex"
            label="序号"
          />
          <el-table-column
            prop="name"
            width="200px"
            label="班级名称"
          />
          <el-table-column
            width="300px"
            label="时间"
          >
            <template slot-scope="scoped">
              <span>{{ scoped.row.openingTime | filterDate }}-{{ scoped.row.closingTime | filterDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
          />
          <el-table-column
            label="考核等级"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleLevel(scope.row)">管理</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="证书管理"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleCertificate(scope.row)">添加证书模版</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="学员管理"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleStudent(scope.row)">学员管理</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small" @click="handleClassware(scope.row)">课件管理</el-button> -->
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </pagination>
    <el-dialog title="编辑班级" width="80%" :visible.sync="dialogEdit">
      <zh-edit
        :is-edit="isEdit"
        :edit-form="editForm"
        :is-loading="isLoading"
        :provinces="provinces"
        :citys="citys"
        :county="county"
        @handleIsLoading="handleIsLoading"
        @changeEditForm="changeEditForm"
        @changProvince="changProvince"
        @changCity="changCity"
        @sumbmitForm="sumbmitForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
import zhEdit from './components/edit'

import {
  reqClassInfoesList,
  reqClassInfoesByID,
  reqClassInfoesAdd,
  reqClassInfoesUpload,
  reqClassInfoesDetele
  // reqClassTypesList,
  // reqLecturerList
} from '@/api/class'
import { reqRegionals } from '@/api/constants'
export default {
  components: {
    pagination,
    zhEdit
  },
  data() {
    return {
      total: 0,
      limit: 10,
      page: 1,
      searchForm: {},
      ClassLists: [],
      dialogEdit: false,
      editForm: {},
      isEdit: {},
      isLoading: false,
      tableLoading: false,
      lecturerLists: [],
      ClassTypeList: [],
      provinces: [],
      citys: [],
      county: []
    }
  },
  computed: {
    isEmpty() {
      return true
    }
  },
  created() {
    this._getLists()
    // this.getClassTypes()
    // this.getTeacherList()
    this.getProvinces()
  },
  methods: {
    handleLevel(item) {
      const classID = item.classID
      this.$router.push({
        name: 'level',
        params: {
          classID
        }
      })
    },
    getProvinces() {
      reqRegionals({ limit: 35, page: 1, ParentID: 0 }).then(res => {
        this.provinces = res.gridlist
      })
    },
    getCitys(e) {
      reqRegionals({ limit: 99999, page: 1, ParentID: e }).then(res => {
        this.citys = res.gridlist
      })
    },
    getCounty(e) {
      reqRegionals({ limit: 999, page: 1, ParentID: e }).then(res => {
        this.county = res.gridlist
      })
    },
    changProvince(e) {
      this.getCitys(e)
    },
    changCity(e) {
      this.getCounty(e)
    },
    currentChange(p) {
      this.page = p
      this._getLists()
    },
    customIndex(index) {
      return (this.page - 1) * this.limit + index + 1
    },
    handleSearch() {
      this.page = 1
      this._getLists()
    },
    _getLists() {
      if (!this.tableLoading) {
        this.tableLoading = true
      }
      this.searchForm.limit = this.limit
      this.searchForm.page = this.page
      reqClassInfoesList(this.searchForm).then(res => {
        console.log(res)
        this.ClassLists = res.gridlist
        this.total = res.total
        this.tableLoading = false
      })
    },
    handlEdialogEdit() {
      this.dialogEdit = !this.dialogEdit
    },
    handleIsLoading() {
      this.isLoading = true
    },
    sumbmitForm(form) {
      const tips = (text) => {
        this.$message({
          type: 'success',
          message: text
        })
        this.isLoading = false
        this.handlEdialogEdit()
        this._getLists()
      }
      if (this.isEdit) {
        form.updateTime = new Date()
        reqClassInfoesUpload(form, form.classID).then(res => {
          tips('修改成功')
        })
      } else {
        form.createTime = new Date()
        reqClassInfoesAdd(form).then(res => {
          tips('添加成功')
        })
      }
    },
    handleCertificate(item) {
      const classID = item.classID
      this.$router.push({
        name: 'certificate',
        params: {
          classID
        }
      })
    },
    handleStudent(item) {
      const classID = item.classID
      this.$router.push({
        name: 'student',
        params: {
          classID
        }
      })
    },
    handleClassware(item) {
      const classID = item.classID
      this.$router.push({
        // path: `/cou/coures/Classware`,
        name: 'Classware',
        params: {
          classID
        }
      })
    },
    handleEdit(item) {
      this.tableLoading = true
      reqClassInfoesByID(item.classID).then(res => {
        this.tableLoading = false
        this.editForm = res
        this.getCitys(res.province)
        this.getCounty(res.city)
        this.isEdit = true
        this.handlEdialogEdit()
      })
    },
    handleAdd() {
      this.editForm = {}
      this.isEdit = false
      this.handlEdialogEdit()
    },
    handleDelete(item) {
      this.tableLoading = true
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reqClassInfoesDetele(item.classID).then(res => {
          this._getLists()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        this.tableLoading = false
      })
    },
    changeEditForm(form) {
      this.editForm = form
    },
    getClassTypes() {
      // reqClassTypesList().then(res => {
      //   this.ClassTypeList = res.gridlist
      // })
    },
    getTeacherList() {
      // reqLecturerList().then(res => {
      //   this.lecturerLists = res.gridlist
      // })
    }
  }
}
</script>

<style scoped lang="scss">
  .search-form {
    margin-top: 20px;
  }
</style>
