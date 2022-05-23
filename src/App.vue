<template>
  <div>
    <button @click="toggle">fsdf</button>

    <div :style="{ marginLeft: '350px' }">
      <EDotMenu
        :data="{
          items: [
            {
              label: 'Удалить',
              icon: 'trash',
              onClickHandler: openDeleteModal,
              checked: true, // this prop for what ?
            },
            {
              label: 'divider',
            },
            {
              label: 'Редактировать',
              onClickHandler: setEditMode,
            },
          ],
          vertical: false,
          disabled: false,
          isOpen: isOpen,
          size: 'sm',
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EDotMenu from '@/components/navigation/EDotMenu.vue'
export default defineComponent({
  name: 'App',
  components: { EDotMenu },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    openDeleteModal() {
      console.log('openDeleteModal')
    },
    setEditMode() {
      console.log('setEditMode')
    },
    toggle() {
      setInterval(() => {
        this.isOpen = !this.isOpen
      }, 1000)
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
