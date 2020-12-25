<template>
  <div class="lt-20">
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" placeholder="请输入学员名称" size="mini" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
        <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
        <span class="student">
          <input ref="file-zk" type="file" class="excel" @change="handleStudents">
          <el-button class="btn" type="primary" size="mini">批量导入学员</el-button>
        </span>
        <el-button type="primary" size="mini" @click="handleCreated">批量生成证书</el-button>
        <el-button type="info" size="mini" @click="$router.go(-1)">返回</el-button>
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
            label="学员姓名"
          />
          <el-table-column
            prop="registrationTime"
            label="报名时间"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.registrationTime | filterDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="assessmentScore"
            label="考核分数"
          />
          <el-table-column
            label="生成证书"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleCreated(scope.row)">{{ scope.row.classCertificateUrl ? '已生成' : '生成证书' }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </pagination>
    <el-dialog title="证书编辑" width="90%" style="min-width: 1200px" :visible.sync="dialogEdit">
      <zh-edit
        v-if="dialogEdit"
        :is-edit="isEdit"
        :edit-form="editForm"
        :is-loading="isLoading"
        :provinces="provinces"
        :citys="citys"
        :county="county"
        :class-i-d="classID"
        :code-url="codeUrl"
        @handleIsLoading="handleIsLoading"
        @changeEditForm="changeEditForm"
        @sumbmitForm="sumbmitForm"
        @toggleIsLoading="toggleIsLoading"
      />
    </el-dialog>
    <!-- <img :src="codeUrl" style="width: 260px; height: 260px" alt=""> -->
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
import zhEdit from './components/edit'
import XLSX from 'xlsx'
import {
  reqClassMembersList,
  reqClassMembersByID,
  reqClassMembersAdd,
  reqClassMembersUpload,
  reqClassMembersDetele
} from '@/api/class'
export default {
  components: {
    pagination,
    zhEdit
  },
  data() {
    return {
      classID: null,
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
      county: [],
      codeUrl: '',
      zk_code: null,
      classMemberID: ''
    }
  },
  computed: {
    isEmpty() {
      return true
    }
  },
  created() {
    this.classID = this.$route.params.classID
    this._getLists()
  },
  mounted() {
  },
  methods: {
    handleStudents() {
      console.log('改变了', this.$refs['file-zk'])
      const file = this.$refs['file-zk'].files[0]
      const types = file.name.split('.')[1]
      const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
      if (!fileType) {
        this.$message('格式错误！请重新选择')
        return
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson
          console.log('数据', this.xlsxJson[0].sheet)
          const students = this.xlsxJson[0].sheet
          const promises = []
          students.forEach(item => {
            const temp = {
              classID: this.classID,
              name: item['姓名'],
              CertificateIdentifier: item['证书编号'],
              classCertificateID: item['证书ID'],
              assessmentScore: item['考核分数'],
              assessmentLevel: item['考核级别']
            }
            const p = () => {
              return new Promise((resolve, reject) => {
                reqClassMembersAdd(temp).then(res => {
                  resolve(res)
                })
              })
            }
            promises.push(p())
          })
          Promise.all(promises).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: `成功导入学员${res.length}名`
            })
            this._getLists()
          })
        }
      })
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function(e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          const result = []
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            })
          })
          resolve(result)
        }
        // reader.readAsBinaryString(file.raw)
        reader.readAsBinaryString(file) // 传统input方法
      })
    },
    handleCreated(item) {
      if (item && item.classMemberID) {
        this.$router.push({
          path: '/class/created-certificate',
          query: {
            classMemberID: item.classMemberID
          }
        })
      } else {
        this.$router.push({
          path: '/class/created-certificate',
          query: {
            classID: this.classID
          }
        })
      }
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
      this.searchForm.classID = this.classID
      reqClassMembersList(this.searchForm).then(res => {
        this.ClassLists = res.gridlist
        this.total = res.total
        this.tableLoading = false
      })
    },
    toggleIsLoading() {
      this.isLoading = !this.isLoading
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
      form.classID = this.classID
      if (this.isEdit) {
        form.updateTime = new Date()
        reqClassMembersUpload(form, form.classMemberID).then(res => {
          tips('修改成功')
        })
      } else {
        form.createTime = new Date()
        reqClassMembersAdd(form).then(res => {
          tips('添加成功')
        })
      }
    },
    handleCertificate(item) {
      const classID = item.classID
      this.$router.push({
        // path: '/certificate',
        name: 'certificate',
        params: {
          classID
        }
      })
    },
    handleEdit(item) {
      this.tableLoading = true
      // this.zk_code.clear()
      // this.zk_code.makeCode('http://www.baidu.com?classMemberID=' + item.classMemberID)
      // this.initCode()
      this.classMemberID = item.classMemberID
      reqClassMembersByID(item.classMemberID).then(res => {
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
        reqClassMembersDetele(item.classMemberID).then(res => {
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
  .student {
    display: inline-block;
    width: 104px;
    height: 28px;
    position: relative;
    top: 10px;
    margin-left: 10px;
    margin-right: 100px;
    .excel {
      display: inline-block;
      width: 104px;
      height: 28px;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 1;
      opacity: 0;
    }
    .btn {
      position: absolute;
      top: 0px;
      left: 0px;
    }
  }
</style>

