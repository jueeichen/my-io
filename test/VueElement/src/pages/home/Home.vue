<template>
  <div class="home">
    <p class="fontspecil"> Jueei的后台</p>
    <el-container style="height: 500px; border: 1px solid #eee">
      <!--Aside:-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>服务器数据</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>脑残</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>神经病</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右边内容区和头部-->
      <el-container>
        <!--头部-->
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <!--下拉框-->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--用户名-->
          <span>玩伟峰</span>
        </el-header>
        <el-header style="text-align: left; font-size: 12px">
          <el-input style="width: 200px" v-model="showWebsocketMessage" placeholder="请输入内容"></el-input>
          <el-button style="margin-left: 10px" @click="sendWebSocketMsg(showWebsocketMessage)">点击</el-button>
          <el-button style="margin-left: 10px" @click="dialogFormVisible = true,addFormData=addNullData">新增</el-button>
          <p></p>
        </el-header>
        <!--内容区列表-->
        <el-table
          :data="tableData"
          border
          style="width: 100%;overflow: auto">
          <el-table-column
            fixed
            prop="date"
            label="日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="300">
          </el-table-column>
          <el-table-column
            prop="postcode"
            label="邮编"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small"
                         @click="dialogFormVisible1=true ,addFormData=scope.row,preName=scope.row.name">编辑
              </el-button>
              <el-button type="text" size="small" @click="removeUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
    </el-container>
    <!--弹窗:-->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="addFormData" label-width="80px" size="mini">
        <el-form-item label="日期">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="addFormData.date"
                            style="width: 100%;"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addFormData.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addFormData.postcode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible1">
      <el-form ref="form1" :model="addFormData" label-width="80px" size="mini">
        <el-form-item label="日期">
          <el-col>
            <el-date-picker type="date" placeholder="选择日期" v-model="addFormData.date"
                            style="width: 100%;"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addFormData.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addFormData.postcode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {mapState, mapActions} from 'vuex'
  import {Button} from 'element-ui';
  import '../../assets/font/ldzs/ldzs.css'
  import "../../assets/font/SourceHanSansCN-Normal/SourceHanSansCN-Normal.css"

  export default {
    data() {
      return {
        tableData: [],
        showWebsocketMessage: '',
        dialogFormVisible: false,
        dialogFormVisible1: false,
        addFormData: {
          date: '',
          name: '',
          address: '',
          postcode: ''
        },
        preName: '',
        addNullData: {
          date: '',
          name: '',
          address: '',
          postcode: ''
        }
      }
    },
    name: "home",
    computed: {
      ...mapState(['UserMessageData', 'addState', 'allUserMessageData']),
      // ...mapActions(['deleteUserMessage', 'updateUserMessage'])
    },
    mounted() {
      this.$store.dispatch('getUserMessageById', {
        cb: () => {
          this.$nextTick(
            () => {
              // console.log(this.UserMessageData);
            }
          )
        }, id: 1
      })
      this.$store.dispatch('getShowUserMessage', {
        cb: () => {
          this.$nextTick(
            () => {
              console.log(this.allUserMessageData);
              this.tableData = this.allUserMessageData
            }
          )
        }, id: 1
      })
    },
    methods: {
      sendWebSocketMsg(msg) {
        let ws = new WebSocket("ws://localhost:4002");
        ws.onopen = () => {
          ws.send(msg); // send a message
        };
        ws.onmessage = e => {
          // a message was received
          const result = e.data;
          if (result) {// 成功
            const wsMsg = result;
            console.log(wsMsg);

          }
        }
      },
      handleClick(msg) {
        console.log(msg);
      },
      dialogFormsubmit() {
        // console.log(this.addFormData);
        this.$store.dispatch('getAddUserMessage', {
          cb: () => {
            this.$nextTick(
              () => {
                console.log(this.addState);
                this.tableData = [...(this.tableData), this.addFormData]
                this.dialogFormVisible = false

              }
            )
          }, addFormData: this.addFormData
        })

      },
      removeUser(msg) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteUserMessage', {
            data: msg.name, cb: () => {
              this.tableData.forEach((item, index) => {
                item.name == msg.name && (
                  this.tableData.splice(index, 1)
                )
              })
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          console.log(msg);
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      updateUser() {

        this.$store.dispatch('updateUserMessage', {
          data: {...this.addFormData, preName: this.preName}, cb: () => {
            this.dialogFormVisible1 = false
          }
        })
      },

    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/stylus/mixins.styl"
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .fontspecil
    font-family ldzs
    font-size 60px
</style>
<style lang="stylus">


</style>