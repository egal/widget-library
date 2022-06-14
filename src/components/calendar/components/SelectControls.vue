<template>
  <div class='select'  @click="isOpen = !isOpen"
       v-click-outside="close">
    <div class='select-container'>
      <div class='select-container__values'>
        <div class='selected'>
          <span>{{value}}</span>
        </div>
      </div>
      <div class="select-container__arrow">
        <b-icon icon="chevron-down" :style="isOpen ? 'transform: rotate(180deg)' : ''" />
      </div>
    </div>
    <div class='select-dropdown'>
<!--      todo add scroll to selected -->
      <EDropdown class='dropdown-component'
                 v-show="isOpen"
                 :value='[{name: value}]'
                 :options="options"
                 :style-config="{ }"
                 @select="sel => $emit('select-control', sel)"
                 @click.native.stop
                 @touchstart.native.stop />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import vClickOutside from 'click-outside-vue3'
import EDropdown from '@/components/inputs/Dropdown/EDropdown.vue'

export default defineComponent({
  name: 'SelectControls',
  components: {BIcon: BootstrapIcon, EDropdown },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select-control'],
  data() {
    return {
      isOpen: false
    }
  },
  computed: {},
  mounted() {

  },

  methods: {
    close() {
      this.isOpen = false
    },

  },
  watch: {},
})
</script>

<style scoped lang='scss'>
@import "src/assets/variables.scss";


.select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // todo check
  //font-family: var(--font-family);
  position: relative;

  &-container {
    display: grid;
    grid-template-columns: auto 16px;
    grid-column-gap: 6px;
    align-items: center;
    padding: 0 8px;
    box-sizing: border-box;

    &__values {
      display: flex;

      .selected {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 14px;
        color: $gray-800;
        span {
          margin-right: 2px;
          white-space: nowrap;
        }

      }
    }

    &__arrow {
      .bi {
        transition: 0.2s;
        color: $gray-500;
        //todo check size
        width: 12px;
      }
    }
  }

  &:hover {
    cursor: pointer;
  }


  &-dropdown {
    position: relative;
    z-index: 2;
    width: calc(100% + 14%);

    .dropdown-component {
      position: absolute;
      width: 100%;
      z-index: 10;
      top: 8px;
      height: 183px;
    }
  }
}
</style>