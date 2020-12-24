<template>
  <div class="lt-20">
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true" label-width="80px">
      <el-form-item label="学员姓名">
        <el-input v-model="searchForm.name" placeholder="请输入学员姓名" size="mini" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
        <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
        <span class="student">
          <input ref="file-zk" type="file" class="excel" @change="handleStudents">
          <el-button class="btn" type="primary" size="mini">批量导入学员</el-button>
        </span>
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
            prop="name"
            width="120px"
            label="姓名"
          />
          <el-table-column
            prop="Gender"
            width="80px"
            label="性别"
          />
          <el-table-column
            prop="province"
            width="80px"
            label="省份"
          />
          <el-table-column
            prop="mobileNu"
            width="200px"
            label="手机号码"
          />
          <!-- <el-table-column
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
          </el-table-column> -->
          <el-table-column
            label="报名"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleSelectForm(scope.row)">选择班级</el-button>
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
    <el-dialog title="选择课程" width="80%" :visible.sync="selectClassVisiable">
      <el-form ref="searchForm" class="search-form" :model="classForm" label-width="120px">
        <el-form-item label="请选择课程">
          <el-select v-model="classForm.classID" size="mini" placeholder="请选择课程" clearable>
            <el-option v-for="item in classList" :key="item.classID" :label="item.name" :value="item.classID" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑课程" width="80%" :visible.sync="dialogEdit">
      <zh-edit
        :is-edit="isEdit"
        :edit-form="editForm"
        :is-loading="isLoading"
        :province-list="provinceList"
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
import XLSX from 'xlsx'
import {
  reqMemberesList,
  reqMemberByID,
  reqMemberAdd,
  reqMemberUpload,
  reqMemberDetele
} from '@/api/member'
import {
  reqClassInfoesList,
  reqClassMembersAdd
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
      courseLists: [],
      dialogEdit: false,
      editForm: {},
      isEdit: {},
      isLoading: false,
      tableLoading: false,
      provinceList: [],
      selectClassVisiable: false,
      classForm: {},
      classList: []
      // lecturerLists: [],
      // courseTypeList: []
    }
  },
  computed: {
    isEmpty() {
      return true
    }
  },
  created() {
    this._getLists()
    this.getRegionList()
    this.getClassList()
    // this.getCourseTypes()
    // this.getTeacherList()
  },
  methods: {
    getRegionList() {
      reqRegionals({ limit: 35, page: 1, ParentID: 0 }).then(res => {
        this.provinceList = res.gridlist
      })
    },
    getClassList() {
      reqClassInfoesList({ page: 1, limit: 99999 }).then(res => {
        this.classList = res.gridlist
      })
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
      reqMemberesList(this.searchForm).then(res => {
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
    handleSelectClassVisiable() {
      this.selectClassVisiable = !this.selectClassVisiable
    },
    handleSelectForm(item) {
      reqMemberByID(item.memberID).then(res => {
        this.classForm = res
        this.handleSelectClassVisiable()
      })
    },
    handleSubmit() {
      if (!this.classForm.classID) {
        this.$message({
          type: 'warning',
          message: '请选择班级'
        })
        return false
      }
      const { memberID, classID, name } = this.classForm
      const temp = {
        memberID,
        classID,
        name,
        registrationTime: new Date()
      }
      reqClassMembersAdd(temp).then(res => {
        this.handleSelectClassVisiable()
        this.$message({
          type: 'success',
          message: '报名成功'
        })
      })
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
        reqMemberUpload(form, form.memberID).then(res => {
          tips('修改成功')
        })
      } else {
        form.createTime = new Date()
        reqMemberAdd(form).then(res => {
          tips('添加成功')
        })
      }
    },
    handleEdit(item) {
      this.tableLoading = true
      reqMemberByID(item.memberID).then(res => {
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
      this.$confirm('此操作将永久删除学员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reqMemberDetele(item.memberID).then(res => {
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
              CertificateIdentifier: item['性别'],
              classCertificateID: item['出生日期'],
              assessmentScore: item['民族'],
              assessmentLevel: item['政治面貌'],
              province: item['省份'],
              workUnit: item['所在单位'],
              education: item['文化程度'],
              post: item['职务'],
              mobileNu: item['手机号'],
              email: item['email'],
              newLiteraryGroup: item['是否新文艺群体'],
              membership: item['协会会员资格'],
              professionalField: item['专业领域'],
              height: item['身高'],
              nativePlace: item['籍贯'],
              wechatNumber: item['微信号'],
              IDCard: item['身份证号'],
              graduate: item['毕业院校'],
              address: item['通讯地址'],
              experience: item['求学与工作经历'],
              achievements: item['主要成果'],
              photoUrl: item['照片地址']
            }
            const p = () => {
              return new Promise((resolve, reject) => {
                reqMemberAdd(temp).then(res => {
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
    }
    // getCourseTypes() {
    //   reqCourseTypesList().then(res => {
    //     this.courseTypeList = res.gridlist
    //   })
    // },
    // getTeacherList() {
    //   reqLecturerList().then(res => {
    //     this.lecturerLists = res.gridlist
    //   })
    // }
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

