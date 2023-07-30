<template>
  <a-form
    class="wrapper"
    name="login-form"
    autocomplete="off"
    :model="formModel"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    @submit="onSubmit"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '请输入用户名！' }]"
    >
      <a-input v-model:value="formModel.username" />
    </a-form-item>
    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '请输入密码' }]"
    >
      <a-input-password v-model:value="formModel.password" />
    </a-form-item>
    <a-form-item
      label="验证码"
      name="verificationCode"
      :rules="[{ required: true, message: '验证码' }]"
    >
      <a-input v-model:value="formModel.verificationCode">
        <template #addonAfter>
          <img :src="verifacationUrl" @click="changeRandomNum" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formModel.remember">记住密码</a-checkbox>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
export default {
  name: "Login",
};
</script>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
const randomNum = ref("");
const verifacationUrl = computed(() => {
  return `/api/user/verification/code?num_random=${randomNum.value}`;
});
const changeRandomNum = () => {
  randomNum.value = `${Math.floor(Math.random() * 1e5)}`;
};
const formModel = reactive({
  username: "",
  password: "",
  verificationCode: "",
  remember: false,
});
const onSubmit = async () => {
  const url = "/api/user/login";
  const { username, password, remember, verificationCode } = formModel;
  const results = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      username,
      password,
      remember: +remember,
      verificationCode,
    }),
  }).then(function (res) {
    if (res.status === 200 || res.status === 201) {
      return res.json();
    } else {
      return Promise.reject(res.json());
    }
  });
  console.log(results);
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 500px;
  margin: 0 auto;
}

:deep {
  .ant-input-group-addon {
    padding: 0;
  }
}
</style>
