<template>
  <teleport to="body">
    <transition-group class="toaster" :class="`toaster--${position}`" name="toaster" tag="div">
      <ToasterMessage
        class="toaster__toast"
        v-for="toast in toasts"
        :key="toast.id"
        v-bind="toast"
        :style-config="styleConfig"
        @close="closeToast"
      ></ToasterMessage>
    </transition-group>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import eventBus from '@/helpers/eventBus'
import { Toast, ToastParams } from './index'

import ToasterMessage from './ToasterMessage.vue'

export default defineComponent({
  name: 'ToasterContainer',
  components: {
    ToasterMessage,
  },
  props: {
    position: {
      type: String,
      default: 'top-right',
      validator: (value: string): boolean => {
        return (
          value === 'top-right' ||
          value === 'top-left' ||
          value === 'bottom-right' ||
          value === 'bottom-left'
        )
      },
    },
    reversed: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: [Number, String],
      default: 3000,
    },
    globalVariant: {
      type: String,
      default: 'light',
      validator: (value: string): boolean => {
        return value === 'light' || value === 'dark'
      },
    },
    globalInfoTitle: {
      type: String,
      default: 'Information',
    },
    globalInfoIcon: {
      type: String,
      default: 'info-circle',
      validator: (value: string) => !!value,
    },
    globalDangerTitle: {
      type: String,
      default: 'Danger',
    },
    globalDangerIcon: {
      type: String,
      default: 'exclamation-triangle',
      validator: (value: string) => !!value,
    },
    globalFlat: {
      type: Boolean,
      default: false,
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      toasts: [] as Toast[],
      toastsCounter: 0, // нужно для установки уникально ID
    }
  },
  mounted() {
    eventBus.$on('show', this.addToast)
  },
  beforeUnmount() {
    eventBus.$off('show')
  },
  methods: {
    /**
     * Добавляет тост в массив с тостами.
     * В зависимости от пропа "reversed" вставляет тосты либо в начале
     * массива, либо в конце.
     * @param params - Параметры тоста, установленные при его вызове.
     */
    addToast(params: ToastParams): void {
      const toast = this.formToast(params)
      this.reversed ? this.toasts.unshift(toast) : this.toasts.push(toast)
      this.toastsCounter++
    },

    /**
     * Формирует тост.
     * Устанавливает параметры по приоритету: параметры, полученные
     * при вызове тоста => глобальные параметры, полученные через пропы.
     * @param params - Параметры тоста, установленные при его вызове.
     * @return {Toast}
     */
    formToast(params: ToastParams): Toast {
      return {
        id: `toast-${this.toastsCounter}`,
        rawHtml: params.rawHtml ?? '',
        title:
          params.title ?? (params.type === 'info' ? this.globalInfoTitle : this.globalDangerTitle),
        icon: params.icon ?? (params.type === 'info' ? this.globalInfoIcon : this.globalDangerIcon),
        variant: params.variant || this.globalVariant,
        message: params.message ?? '',
        type: params.type,
        primaryAction: params.primaryAction,
        secondaryAction: params.secondaryAction,
        flat: params.flat ?? this.globalFlat,
        duration: Number(this.duration),
      }
    },

    /**
     * Обработчик события "close", пойманного из тоста.
     * Удаляет тост из массива тостов и эмитит событие в класс "Toaster".
     * Дополнительно очищает счётчик тостов, если массив пустой.
     * @param toastId - ID тоста.
     */
    closeToast(toastId: string): void {
      const toastIndex = this.toasts.findIndex((toast) => toast.id === toastId)
      this.toasts.splice(toastIndex, 1)
      eventBus.$emit('toast-closed', toastId)

      if (!this.toasts.length) {
        this.toastsCounter = 0
      }
    },
  },
})
</script>

<style scoped lang="scss">
/*Анимация тостов*/
.toaster {
  &__toast {
    transition: all 0.6s ease;
    margin-bottom: 8px;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }

  &-leave-active {
    position: fixed;
  }
}
/**/

.toaster {
  display: flex;
  flex-flow: column nowrap;
  position: fixed;

  &--top-right {
    top: 0;
    right: 10px;
    align-items: flex-end;
  }
  &--top-left {
    top: 0;
    left: 10px;
    align-items: flex-start;
  }
  &--bottom-right {
    bottom: 0;
    right: 10px;
    align-items: flex-end;
  }
  &--bottom-left {
    bottom: 0;
    left: 10px;
    align-items: flex-start;
  }
}
</style>
