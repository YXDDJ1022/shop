import axios from 'axios'
export default {
  data () {
    return {
      usersData: [],
      total: 0,
      currPage: 1,
      searchText: '',
      dialogAddUserVisible: false,
      addUserForm: { username: '', password: '', email: '', mobile: '' },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度应在3-5内', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度应在5-10内', trigger: 'blur' }
        ],
        email: [
          { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    axios.get('http://localhost:8888/api/private/v1/users', {
      headers: { Authorization: localStorage.getItem('token') },
      params: {
        pagenum: this.currPage,
        pagesize: 3
      }
    }).then((res) => {
      this.usersData = res.data.data.users
      this.total = res.data.data.total
      this.currPage = res.data.data.pagenum
    })
  },
  methods: {
    changeCurPage (currPage) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        headers: { Authorization: localStorage.getItem('token') },
        params: {
          query: this.searchText,
          pagenum: currPage,
          pagesize: 3
        }
      }).then((res) => {
        this.usersData = res.data.data.users
        this.total = res.data.data.total
        this.currPage = res.data.data.pagenum
      })
    },
    query () {
      axios.get('http://localhost:8888/api/private/v1/users', {
        headers: { Authorization: localStorage.getItem('token') },
        params: {
          query: this.searchText,
          pagenum: this.currPage,
          pagesize: 3
        }
      }).then((res) => {
        this.usersData = res.data.data.users
        this.total = res.data.data.total
        this.currPage = res.data.data.pagenum
      })
    },
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    addUser () {
      axios.post('http://localhost:8888/api/private/v1/users', this.addUserForm, { headers: { Authorization: localStorage.getItem('token') } }).then((res) => {
        if (res.data.meta.status === 201) {
          this.dialogAddUserVisible = false
        }
        this.$message({
          message: '成功添加用户',
          type: 'success',
          duration: 1200
        })
      })
    }
  }
}
