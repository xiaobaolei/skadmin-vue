<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" style="margin-top: 6px;" size="small" label-width="100px">
      <el-form-item
        v-for="(domain, index) in tos"
        :label="'手机号' + (index === 0 ? '': index)"
        :key="domain.key">
        <el-input v-model="domain.value" style="width: 31%"/>
        <el-button icon="el-icon-plus" @click="addDomain" />
        <el-button style="margin-left:0px;" icon="el-icon-minus" @click.prevent="removeDomain(domain)"/>
      </el-form-item>
      <el-form-item label="短信内容" prop="content">
        <el-input v-model="form.content" style="width: 40%" placeholder="如：{&quot;code&quot;:&quot;123456&quot;}"/>
      </el-form-item>
      <el-button :loading="loading" style="margin-left:2%;" size="medium" type="success" @click="doSubmit">发送短信</el-button>
    </el-form>
  </div>
</template>·

<script>
import { getToken } from '@/utils/auth'
import { send } from '@/api/sms'
import { validateSms } from '@/utils/validate'
export default {
  name: 'Index',
  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      loading: false, form: { tos: [], content: '' },
      tos: [{
        value: ''
      }],
      rules: {
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    removeDomain(item) {
      var index = this.tos.indexOf(item)
      if (index !== -1 && this.tos.length !== 1) {
        this.tos.splice(index, 1)
      } else {
        this.$message({
          message: '请至少保留一位联系人',
          type: 'warning'
        })
      }
    },
    addDomain() {
      this.tos.push({
        value: '',
        key: Date.now()
      })
    },
    doSubmit() {
      const _this = this
      this.$refs['form'].validate((valid) => {
        this.form.tos = []
        if (valid) {
          let sub = false
          this.tos.forEach(function(data, index) {
            if (data.value === '') {
              _this.$message({
                message: '手机号不能为空',
                type: 'warning'
              })
              sub = true
            } else if (validateSms(data.value)) {
              _this.form.tos.push(data.value)
            } else {
              _this.$message({
                message: '手机号格式错误',
                type: 'warning'
              })
              sub = true
            }
          })
          if (sub) { return false }
          this.loading = true
          send(this.form).then(res => {
            this.$notify({
              title: '发送成功',
              type: 'success',
              duration: 2500
            })
            this.loading = false
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

