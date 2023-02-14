<template>
  <v-card class="ma-auto" width="30%">
    <v-card-title class="login-title">SignUp</v-card-title>
    <v-card-subtitle class="login-title">ユーザ情報を入力してください</v-card-subtitle>
    <v-row justify="center">
      <v-btn to="login" color="light-blue" variant="text" class="mt-4">ログインはこちら</v-btn>
    </v-row>
    <v-card-text>
      <form @submit.prevent="submit">
        <v-text-field name="name" v-model="name" :error-messages="errors.name" label="Name" />
        <v-text-field name="email" v-model="email" :error-messages="errors.email" label="Email" />
        <v-text-field name="password" v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="errors.password" :type="show ? 'text' : 'password'" label="Password"
          hint="At least 8 characters" counter @click:append="show = !show" />
        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" type="submit" :disabled="!meta.valid">SIGN UP</v-btn>
          <v-btn class="mt-4" @click="handleReset">CLEAR</v-btn>
          <v-alert v-if="errorMessage" type="error" variant="outlined" density="compact" class="mt-4">
            {{ errorMessage }}
          </v-alert>
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
import { auth } from '@/firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import router from '@/router/index'

const Auth = toFormValidator(
  zod.object({
    name: zod.string()
      .min(1, { message: '必須項目です' }),
    email: zod.string()
      .min(1, { message: '必須項目です' })
      .email({ message: "メールアドレスが不正です" }),
    password: zod.string()
      .min(8, { message: '8文字以上入力してください' })
  })
)
const show = ref(false)
const errorMessage = ref('')

const { handleSubmit, handleReset, errors, meta } = useForm({
  validationSchema: Auth,
  initialValues: {
    name: '',
    email: '',
    password: ''
  }
});

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')

const submit = handleSubmit(values => {
  createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredencial) => {
      const user = userCredencial.user
      updateProfile(user, {
        displayName: values.name
      })

      localStorage.message = "新規作成に成功しました"

      //topにリダイレクト
      router.push('/login')
    })
    .catch((error) => {
      console.log('fail', error)
      errorMessage.value = 'ユーザの新規作成に失敗しました'
    })
})

</script>
<style scoped>
.login-title {
  text-align: center;
}
</style>