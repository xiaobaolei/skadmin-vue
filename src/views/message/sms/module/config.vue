<template>
  <el-form ref="form" :model="form" :rules="rules" style="margin-top: 6px;" size="small" label-width="100px">
    <el-form-item label="KeyId" prop="accessKeyId">
      <el-input v-model="form.accessKeyId" style="width: 35%;"/>
      <span style="color: #C0C0C0;margin-left: 10px;">accessKeyId</span>
    </el-form-item>
    <el-form-item label="Secret" prop="accessSecret">
      <el-input v-model="form.accessSecret" style="width: 35%;"/>
      <span style="color: #C0C0C0;margin-left: 10px;">accessSecret</span>
    </el-form-item>
    <el-form-item label="短信签名" prop="signName">
      <el-input v-model="form.signName" style="width: 35%;"/>
      <span style="color: #C0C0C0;margin-left: 10px;">SignName</span>
    </el-form-item>
    <el-form-item label="短信模版" prop="templateCode">
      <el-input v-model="form.templateCode" style="width: 35%;"/>
      <span style="color: #C0C0C0;margin-left: 10px;">TemplateCode</span>
    </el-form-item>
    <el-button :loading="loading" style="margin-left:5%;" size="medium" type="success" @click="doSubmit">保存配置</el-button>
  </el-form>
</template>

<script>
import { get, update } from '@/api/sms'
export default {
  name: 'Config',
  data() {
    return {
      loading: false, form: { id: 1, accessKeyId: '', accessSecret: '', signName: '', templateCode: '' },
      rules: {
        accessKeyId: [
          { required: true, message: 'accessKeyId不能为空', trigger: 'blur' }
        ],
        accessSecret: [
          { required: true, message: 'accessSecret不能为空', trigger: 'blur' }
        ],
        signName: [
          { required: true, message: 'SignName不能为空', trigger: 'blur' }
        ],
        templateCode: [
          { required: true, message: 'TemplateCode不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      get().then(res => {
        this.form = res
      })
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          update(this.form).then(res => {
            this.$notify({
              title: '修改成功',
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

<style scoped>

</style>
