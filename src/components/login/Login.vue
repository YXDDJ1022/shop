<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="success" @click="startLogin">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* 登录 */
    startLogin () {
      this.$refs.loginForm.validate((isOK) => {
        // 未通过校验，不可以登录
        if (!isOK) return
        // 通过校验
        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm).then((res) => {
          // 登录成功
          if (res.data.meta.status === 200) {
            // 这里是ElementUI提供的[消息提示]组件
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 1600 // 单位毫秒
            })
            // 保存登录标志token
            localStorage.setItem('token', res.data.data.token)
            // 跳转到主页
            this.$router.push('/home')
          } else {
            this.$message({
              message: `登录失败：${res.data.meta.msg}`,
              type: 'error',
              duration: 1600
            })
          }
        })
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
  .el-row
  {
    height: 100%;
    background-color: skyblue;
  }
  .el-col
  {
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 20px;
  }
  h1
  {
    color: red;
  }
</style>
