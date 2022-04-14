<template>
  <div
    class="toast"
    :class="[`toast--${variant}--${type}`, { 'toast--flat': flat }]"
    :id="id"
    :style="{
      paddingBottom: paddingBottom,
    }"
    @mouseenter="timer.pause()"
    @mouseleave="timer.resume()"
    @click="close"
  >
    <BootstrapIcon class="toast__icon" :icon="icon" />
    <div class="toast__content-container">
      <span class="toast__title" :style="styleConfig?.title">{{ title }}</span>
      <span class="toast__message" :style="styleConfig?.message">{{ message }}</span>
      <span
        class="toast__text"
        v-html="rawHtml"
        v-if="rawHtml"
        :style="styleConfig?.rawHtml"
      ></span>
      <button
        class="toast__button toast__button--primary"
        @click="emitActionEvent('primary')"
        v-if="primaryAction"
      >
        {{ primaryAction }}
      </button>
      <button
        class="toast__button toast__button--secondary"
        @click="emitActionEvent('secondary')"
        v-if="secondaryAction && !flat"
      >
        {{ secondaryAction }}
      </button>
    </div>
    <BootstrapIcon class="toast__close-icon" icon="x" @click="close" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import Timer from '@/helpers/timer.js'
import eventBus from '@/helpers/eventBus.js'

export default defineComponent({
  name: 'ToasterMessage',
  components: { BootstrapIcon },
  props: {
    id: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    primaryAction: {
      type: String,
    },
    secondaryAction: {
      type: String,
    },
    flat: {
      type: Boolean,
    },
    icon: {
      type: String,
    },
    rawHtml: {
      type: String,
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['close'],
  data() {
    return {
      active: false,
      timer: new Timer(this.duration),
    }
  },
  computed: {
    /**
     * Нижний паддинг у тоста.
     * Если тост "плоский", то паддинг устанавливается классом .toast--flat
     * @return string
     */
    paddingBottom(): string {
      if (this.flat) {
        return ''
      }

      return this.primaryAction || this.secondaryAction ? '16px' : '24px'
    },
  },
  mounted() {
    if (this.primaryAction || this.secondaryAction) {
      eventBus.$emit('toast-added', this.id)
    }

    this.timer.onTimerEnd = this.close
    this.timer.start()
  },
  methods: {
    /**
     * Закрывает тост.
     * Эмитит событие "toast-closed" в класс Toaster. Это необходимо,
     * чтобы отписаться от слушателей кнопок.
     */
    close(): void {
      this.timer.stop()
      this.$emit('close', this.id)

      if (this.primaryAction || this.secondaryAction) {
        eventBus.$emit('toast-closed', this.id)
      }
    },

    /**
     * При клике на кнопку формирует событие и эмитит его в класс Toaster.
     * @param button - Тип кнопки (primary\secondary)
     */
    emitActionEvent(button: string): void {
      eventBus.$emit(`${this.id}-${button}-action-event`)
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/assets/variables';
@import 'src/assets/toaster/toastMixin.scss';

.toast {
  $ctx: &;

  &--light {
    &--info {
      @include toast($variant: 'light', $type: 'info', $ctx: $ctx);
    }
    &--danger {
      @include toast($variant: 'light', $type: 'danger', $ctx: $ctx);
    }
  }
  &--dark {
    &--info {
      @include toast($variant: 'dark', $type: 'info', $ctx: $ctx);
    }
    &--danger {
      @include toast($variant: 'dark', $type: 'danger', $ctx: $ctx);
    }
  }
  &--flat {
    @include toast-flat($ctx: $ctx);
  }
}
</style>
