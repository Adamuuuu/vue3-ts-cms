<template>
  <div class="login">
    <div class="header">
      <h1 style="color: aqua">后台管理系统</h1>
    </div>
    <div class="main">
      <!-- 表单验证主体 -->
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account" label="账号登录">
          <template #label>
            <el-icon><UserFilled /></el-icon>
            <span class="text">账号登陆</span>
          </template>

          <!-- 账号密码表单 -->
          <el-form
            :model="account"
            :rules="accountRules"
            ref="fromRef"
            status-icon
          >
            <el-form-item label="账号" prop="name">
              <el-input v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="account.password" show-password />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 手机验证码表单 -->
        <el-tab-pane name="phone" label="手机登录">
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </template>

          <el-form>
            <el-form-item label="手机" label-width="55px">
              <el-input v-model="phone" />
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="verify" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 记住密码和忘记密码 -->
    <div class="checkout">
      <el-checkbox v-model="isremember" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <!-- 立即登录按钮 -->
    <div class="footer">
      <el-button
        type="primary"
        class="login-btn"
        size="large"
        @click="loginAction"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { type FormRules, type ElForm, ElMessage } from "element-plus";
import { ref, reactive, watch } from "vue";
import useLoginStore from "@/stores/login/login";
import { localCache } from "@/utils/cache";

const loginStore = useLoginStore();
const isremember = ref<boolean>(localCache.getCache("isremember") ?? false);
watch(isremember, (newValue) => {
  console.log(isremember.value);
  localCache.setCache("isremember", newValue);
});
const account = reactive({
  name: localCache.getCache("name") ?? "",
  password: localCache.getCache("password") ?? "",
});
const accountRules: FormRules = {
  name: [
    { required: true, message: "请输入账号", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "请输入6~12数字",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "请输入6~12数字",
      trigger: "blur",
    },
  ],
};

const fromRef = ref<InstanceType<typeof ElForm>>();
function loginAction() {
  fromRef.value?.validate((vaild) => {
    if (vaild) {
      console.log("输出正确，登陆成功");
      const name = account.name;
      const password = account.password;
      loginStore.loginAccountAction({ name, password }).then((res) => {
        if (isremember.value) {
          localCache.setCache("name", name);
          localCache.setCache("password", password);
        } else {
          localCache.removeCache("name");
          localCache.removeCache("password");
        }
      });
    } else {
      ElMessage.error("输入错误，请按照规则检查后重新输入");
    }
  });
}
const phone = ref();
const verify = ref();
const activeName = ref("account");
// function handle() {
//   if (activeName.value == "account") {
//     console.log("用户在用账号登录");
//   } else {
//     console.log("用户在用手机登录");
//   }
// }
</script>

<style scoped lang="less">
.login {
  background: url(@/assets/imges/背景图.jpg);
}
.checkout {
  width: 333px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footer {
  width: 333px;
  margin-top: 10px;
}
.login-btn {
  width: 100%;
}
.text {
  margin-left: 8px;
}
.el-input {
  width: 300px;
}
</style>
