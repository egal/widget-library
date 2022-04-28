<template>
  <div class="modal-backdrop" v-if="isShowing">
    <div class="modal-content-container">
      <slot name="modal-content">
        <div class="modal-content">
          <div class="modal-content__header">{{title}}</div>
          <div class="modal-content__message">{{message}}</div>
        </div>
      </slot>
        <div class="modal-controls">
          <EButton @click="confirmAction">{{confirmActionName}}</EButton>
          <EButton :data="{ softColors: true }" @click="close(false)">{{rejectActionName}}</EButton>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EButton from "@/components/togglers/EButton.vue";
type ModalOptions = {
  title?: string
  message?: string
  confirmActionName?: string
  rejectActionName?: string
  closeOnConfirm?: boolean
  displayConfirmButton?: boolean
}
export default defineComponent({
  name: 'TableModal',
  components: {EButton},
  props: {
    // confirmActionName: {
    //   type: String,
    //   default: 'Сохранить'
    // },
    // rejectActionName: {
    //   type: String,
    //   default: 'Отменить'
    // }
  },
  data(){
    return {
      title: '',
      message: '',
      confirmActionName: '',
      rejectActionName: '',
      isShowing: false,
      closeOnConfirm: false,
      displayConfirmButton: true,
      resolvePromise: undefined as unknown as (resolveValue: boolean) => void,
    }
  },
  methods: {
    showModal(options: ModalOptions): Promise<boolean> {
      this.title = options.title || ''
      this.message = options.message || ''
      this.confirmActionName = options.confirmActionName || 'Сохранить'
      this.rejectActionName = options.rejectActionName || 'Отменить'
      this.closeOnConfirm = options?.closeOnConfirm ?? true
      this.displayConfirmButton = options?.displayConfirmButton ?? true
      return new Promise((resolve) => {
        this.isShowing = true
        this.resolvePromise = resolve
      })
    },
    close(resolveValue?: boolean): void {
      this.isShowing = false

      if (resolveValue !== undefined) {
        this.resolvePromise(resolveValue)
      }
    },
    confirmAction(): void {
      this.isShowing = !this.closeOnConfirm
      this.$emit('confirm')
      this.resolvePromise(true)
    },
  }
})
</script>

<style scoped lang="scss">
@import './tableStyles';
</style>
