<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="requestIp" label="IP" align="center"/>
      <el-table-column prop="operation" label="操作类型" align="center"/>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.logType === 'INFO'" type="success">成功</el-tag>
            <el-tag v-if="scope.row.logType === 'ERROR'" type="danger">失败</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="userAgent" label="User-Agent" align="center"/>
      <el-table-column prop="time" label="请求耗时" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>
          <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>
          <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import initData from '@/mixins/initData'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
export default {
  components: { eHeader },
  mixins: [initData],
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    beforeInit() {
      this.url = 'api/logs/login'
      const sort = 'id,desc'
      const query = this.query
      const username = query.username
      this.params = { page: this.page, size: this.size, sort: sort }
      if (username && username) { this.params['username'] = username }
      return true
    }
  }
}
</script>

<style scoped>

</style>
