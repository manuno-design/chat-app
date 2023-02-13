<template>
  <v-card class="ma-auto" width="30%">
    <v-card-title class="login-title">Login</v-card-title>
    <v-card-subtitle class="login-title">ユーザ情報を入力してください</v-card-subtitle>
    <v-card-text>
      <form @submit.prevent="submit">
        <v-text-field name="email" v-model="email" :error-messages="errors.email" label="Email" />
        <v-text-field name="password" v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="errors.password" :type="show ? 'text' : 'password'" label="Password"
          hint="At least 8 characters" counter @click:append="show = !show" />
        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" type="submit" :disabled="!meta.valid">LOGIN</v-btn>
          <v-btn class="mt-4" @click="handleReset">CLEAR</v-btn>
        </div>
      </form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'

const Auth = toFormValidator(
  zod.object({
    email: zod.string()
      .min(1, { message: '必須項目です' })
      .email({ message: "メールアドレスが不正です" }),
    password: zod.string()
      .min(8, { message: '8文字以上入力してください' })
  })
)
const show = ref(false)

const { handleSubmit, handleReset, errors, meta } = useForm({
  validationSchema: Auth,
  initialValues: {
    email: '',
    password: ''
  }
});

const { value: email } = useField('email')
const { value: password } = useField('password')

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})

</script>
<style scoped>
.login-title {
  text-align: center;
}
</style>