<template>
  <Card title="登录" style="width: 480px; margin: 20px auto">
    <Form
      name="login-form"
      autocomplete="off"
      :model="formModel"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      @submit="onSubmit"
    >
      <FormItem
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名！' }]"
      >
        <a-input v-model:value="formModel.username" />
      </FormItem>
      <FormItem
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password v-model:value="formModel.password" />
      </FormItem>
      <FormItem
        label="验证码"
        name="verificationCode"
        :rules="[{ required: true, message: '验证码' }]"
      >
        <a-input v-model:value="formModel.verificationCode">
          <template #addonAfter>
            <img :src="verifacationUrl" @click="changeRandomNum" />
          </template>
        </a-input>
      </FormItem>
      <FormItem name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formModel.remember">记住密码</a-checkbox>
      </FormItem>
      <FormItem :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </FormItem>
    </Form>
    <!-- <a-button type="primary" @click="getUserInfo">获取用户数据</a-button> -->
  </Card>
</template>
<script lang="ts">
export default {
  name: "Login",
};
</script>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Card, Form, FormItem } from "ant-design-vue";
const $router = useRouter();
const randomNum = ref("");
const verifacationUrl = computed(() => {
  return `/api/user/public/verification/code?num_random=${randomNum.value}`;
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
  const url = "/api/user/public/login";
  const { username, password, remember, verificationCode } = formModel;
  return fetch(url, {
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
  })
    .then(function (res) {
      if (res.status === 200 || res.status === 201) {
        return res.json();
      } else {
        return Promise.reject(res.json());
      }
    })
    .then(() => {
      $router.replace("/");
      return {
        message: "登录成功",
      };
    })
    .finally(() => {
      changeRandomNum();
    });
};
const getUserInfo = async () => {
  const url = "/api/user";
  await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  }).then(function (res) {
    if (res.status === 200 || res.status === 201) {
      return res.json();
    } else {
      return Promise.reject(res.json());
    }
  });
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
