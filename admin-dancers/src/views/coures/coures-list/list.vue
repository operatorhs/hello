<template>
  <div>
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true" label-width="80px">
      <el-form-item label="课程名">
        <el-input v-model="searchForm.courseName" placeholder="请输入课程名" size="mini" clearable />
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
          :data="courseLists"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            :index="customIndex"
            label="序号"
          />
          <el-table-column
            prop="courseName"
            width="300px"
            label="课程名"
          />
          <el-table-column
            prop="courseDuration"
            label="总时长"
          >
            <template slot-scope="scoped">
              <span>{{ scoped.row.courseDuration | filterDuration }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="courseLecturerID"
            label="讲师"
          >
            <template slot-scope="scoped">
              <span
                v-for="item in lecturerLists"
                v-show="scoped.row.courseLecturerID === item.courseLecturerID"
                :key="item.courseLecturerID"
              >
                {{ item.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="courseTypeID"
            label="课程类型"
          >
            <template slot-scope="scoped">
              <span
                v-for="item in courseTypeList"
                v-show="scoped.row.courseTypeID === item.courseTypeID"
                :key="item.courseTypeID"
              >
                {{ item.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="videoTime"
            label="录制日期"
          >
            <template slot-scope="scoped">
              <span>{{ scoped.row.videoTime | filterDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="生成时间"
          >
            <template slot-scope="scoped">
              <span>{{ scoped.row.createTime | filterDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleCourseware(scope.row)">课件管理</el-button>
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </pagination>
    <el-dialog title="编辑课程" width="80%" :visible.sync="dialogEdit">
      <zh-edit
        :is-edit="isEdit"
        :edit-form="editForm"
        :is-loading="isLoading"
        :course-type-list="courseTypeList"
        :lecturer-lists="lecturerLists"
        @handleIsLoading="handleIsLoading"
        @changeEditForm="changeEditForm"
        @sumbmitForm="sumbmitForm"
      />
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
import zhEdit from './components/edit'

import {
  reqCourseList,
  reqCourseByID,
  reqCourseAdd,
  reqCourseUpload,
  reqCourseDetele,
  reqCourseTypesList,
  reqLecturerList
} from '@/api/courese'
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
      courseLists: [],
      dialogEdit: false,
      editForm: {},
      isEdit: {},
      isLoading: false,
      tableLoading: false,
      lecturerLists: [],
      courseTypeList: []
    }
  },
  computed: {
    isEmpty() {
      return true
    }
  },
  created() {
    this._getLists()
    this.getCourseTypes()
    this.getTeacherList()
  },
  methods: {
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
      reqCourseList(this.searchForm).then(res => {
        this.courseLists = res.gridlist
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
        reqCourseUpload(form, form.courseID).then(res => {
          tips('修改成功')
        })
      } else {
        form.createTime = new Date()
        reqCourseAdd(form).then(res => {
          tips('添加成功')
        })
      }
    },
    handleCourseware(item) {
      const courseID = item.courseID
      this.$router.push({
        // path: `/cou/coures/courseware`,
        name: 'courseware',
        params: {
          courseID
        }
      })
    },
    handleEdit(item) {
      this.tableLoading = true
      reqCourseByID(item.courseID).then(res => {
        this.tableLoading = false
        this.editForm = res
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
        reqCourseDetele(item.courseID).then(res => {
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
    getCourseTypes() {
      reqCourseTypesList().then(res => {
        this.courseTypeList = res.gridlist
      })
    },
    getTeacherList() {
      reqLecturerList().then(res => {
        this.lecturerLists = res.gridlist
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .search-form {
    margin-top: 20px;
  }
</style>
