<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="8"><img src="../../assets/images/logo.png" alt=""></el-col>
        <el-col :span="8"><h2>电商后台管理系统</h2></el-col>
        <el-col :span="8"><a href="#" @click.prevent="logout">退出</a></el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- default-active默认高亮显示哪个菜单，根据index属性确定 -->
        <el-menu :router="true" default-active="2" @open="handleOpen" @close="handleClose" background-color="#000" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">角色列表</el-menu-item>
            <el-menu-item index="/rights">权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    // 退出功能
    logout () {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '成功退出!'
        })
        this.$router.back()
      }).catch(() => {
        // 点击取消
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    handleOpen (key, keyPath) {

    },
    handleClose (key, keyPath) {

    }
  }
}
</script>

<style scoped lang="less">
.el-container
{
  height: 100%;
}
.el-header
{
  padding: 0;
  background-color: #000;
  .el-col:nth-child(2) h2
  {
    color: #fff;
    line-height: 61px;
    text-align: center;
  }
  .el-col:nth-child(3) a
  {
    float: right;
    line-height: 61px;
    padding-right: 15px;
    text-decoration: none;
    color: orange;
  }
}
.el-aside
{
  background-color: #000;
}
/* .el-main
{

} */
</style>
