<template>
  <div :style="{ width: '200px' }">
    <div>
      <h2 style="margin-bottom: 10px">Авторизация</h2>
      <div class="login-form">
        <EInput
          v-model="phone"
          class="login-form__input"
          :data="{ label: 'Телефон', modelValue: phone }"
        ></EInput>
        <EInput
          v-model="password"
          type="password"
          class="login-form__input"
          :data="{ label: 'Пароль', modelValue: password }"
        ></EInput>
        <EButton @click="authUser">Войти</EButton>
      </div>
    </div>

    <!--     todo delete cookies package -->
    <!--    todo add readme-->
    <!--    <div>-->

    <!--    <EFileUploader @on:upload='handle' :data="{-->
    <!--      label: 'Изображение',-->
    <!--      helperText: 'Формат png, jpeg, до 4Мб',-->
    <!--      maxFiles: 4,-->
    <!--      multiple: true,-->
    <!--      maxSize: 0,-->
    <!--errorText: error,-->
    <!--      accept: ['image/png', 'image/jpeg'],-->
    <!--      domain: 'http://testing-mr-243.ow-apcs.sputnikfund.ru/api',-->
    <!--      microservice: 'core',-->
    <!--      model: 'Image',-->

    <!--      modelValue: [-->

    <!-- ]-->
    <!--    }" />-->
    <!--    </div>-->
    <hr />

    <!--    18358  = 1 fox -->
    <EFileUploader
      @on:upload="handle"
      @error:upload="onError"
      :data="{
        label: 'Изображение',
        helperText: 'Формат png, jpeg, до 4Мб',
        maxFiles: 2,
        multiple: true,
        maxSize: 737200,
        size: 'lg',
        accept: ['image/png', 'image/jpeg'],
        domain: 'http://testing-mr-243.ow-apcs.sputnikfund.ru/api',
        microservice: 'core',
        model: 'Image',
        errorText: error,
        modelValue: files,
      }"
    />
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EFileUploader from '@/components/inputs/FileUploader/EFileUploader.vue'
import { EgalAuthConstructor } from '@egalteam/framework'
import EInput from '@/components/inputs/Input/EInput.vue'
import EButton from '@/components/togglers/EButton.vue'
export default defineComponent({
  name: 'App',
  components: { EFileUploader, EInput, EButton },
  data() {
    return {
      files: [],
      authModel: null as unknown as EgalAuthConstructor,
      // email: 'admin@mail.com',
      password: 'admin',
      phone: '81111111111',
      error: '',
    }
  },
  mounted() {
    const authInfo = {
      modelName: 'User',
      url: 'http://testing-mr-243.ow-apcs.sputnikfund.ru/api',
      connectionType: 'axios',
    }
    this.authModel = new EgalAuthConstructor(authInfo)
  },
  methods: {
    onError(er) {
      console.log('onError')
      console.log(er)
      this.error = er?.message || ''
    },
    handle(f) {
      // if (this.files.length > 1) {
      //   this.error = 'O hello Mark!'
      // }
      console.log('handle')
      this.files.push(f)
    },
    authUser(): void {
      let userData = {
        // email: this.email,
        password: this.password,
        phone: this.phone,
      }

      this.authModel.authUser(userData).then((data) => {
        this.loginToService(data)
      })
    },

    loginToService(data: any) {
      let loginData = {
        service_name: 'core',
        token: data[0].user_master_token,
      }
      this.authModel
        .loginToService(loginData)
        .then((data) => {
          this.$cookies.set('core', data[0])
          this.$router.push('/')
        })
        .catch((error) => {
          // console.log('AUTH_ERROR:', error)
        })
    },
  },
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
