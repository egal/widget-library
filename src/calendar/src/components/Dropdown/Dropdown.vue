<template>
  <div class="dropdown" :class="`dropdown--${size}`" :style="getStyleVars">
    <div class="dropdown-items">
      <Input
        class="dropdown-search"
        type="search"
        placeholder="Search"
        icon-left="search"
        @update:modelValue="filterOptions"
        :size="size"
        v-if="searchable && !grouped"
        :style-config="inputSearchStyleConfig"
      />
      <div class="dropdown-groups" v-if="grouped">
        <div class="group" v-for="(group, i) in options" :key="i">
          <span>{{ group.groupName }}</span>
          <div
            class="dropdown-item"
            :class="{ active: isActive(option) }"
            v-for="(option, i) in group.options"
            :key="i"
            @click.stop="$emit('select', option)"
          >
            {{ option[shownKey] }}
          </div>
        </div>
      </div>
      <div
        class="dropdown-item"
        v-else
        :class="{ active: isActive(option) }"
        v-for="(option, i) in filteredOptions"
        :key="i"
        @click.stop="$emit('select', option)"
      >
        {{ option[shownKey] }}
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input/Input";
import variables from "../../assets/scss/variables.scss";

export default {
  name: "Dropdown",
  components: { Input },
  props: {
    size: {
      type: String,
      default: "md",
    },
    options: {
      type: Array,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      default: () => [],
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Object, Array],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    shownKey: {
      type: String,
      default: "name",
    },
    grouped: {
      type: Boolean,
      default: false,
    },
    styleConfig: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    inputSearchStyleConfig: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  data() {
    return {
      filteredOptions: this.options,
    };
  },
  computed: {
    getStyleVars() {
      return {
        "--font-family": this.styleConfig?.fontFamily || variables.openSans,
        "--option-color": this.styleConfig?.optionColor || variables.gray800,
        "--option-hover-background-color":
          this.styleConfig?.optionHoverBackgroundColor || variables.gray200,
        "--option-font-weight":
          this.styleConfig?.optionFontWeight || variables.regularFontWeight,
        "--active-background-color":
          this.styleConfig?.activeBackgroundColor || variables.info,
        "--active-option-color":
          this.styleConfig?.activeOptionColor || variables.baseWhite,
        "--group-name-color":
          this.styleConfig?.groupNameColor || variables.gray500,
        "--group-name-font-weight":
          this.styleConfig?.groupNameFontWeight || variables.boldFontWeight,
        "--background-color":
          this.styleConfig?.backgroundColor || variables.baseWhite,
        "--border-color": this.styleConfig?.borderColor || variables.gray200,
        "--border-radius": this.styleConfig?.borderRadius || "6px",
        "--box-shadow": this.styleConfig?.boxShadow || variables.shadowSm,
      };
    },
  },
  //mounted() {},
  methods: {
    /**
     * Return true if option is selected
     * @param option
     */
    isActive(option) {
      if (Array.isArray(this.value)) {
        return (
          this.value.findIndex(
            (item) => item[this.shownKey] === option[this.shownKey]
          ) !== -1
        );
      }
      return this.value[this.shownKey] === option[this.shownKey];
    },
    /**
     * Filer options by search value
     * @param value
     */
    filterOptions(value) {
      if (!value) {
        this.filteredOptions = this.options;
        return;
      }
      this.filteredOptions = this.options.filter(
        (option) =>
          option[this.shownKey].toLowerCase().indexOf(value.toLowerCase()) !==
          -1
      );
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background-color: $gray-100;
}
::-webkit-scrollbar-thumb {
  background-color: $gray-300;
  border-radius: 8px;
}
.dropdown {
  font-family: var(--font-family);
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  max-height: 450px;
  overflow-y: auto;
  width: max-content;
  &-search {
    margin-bottom: 10px;
  }
  &-item {
    padding: 8px 12px;
    display: flex;
    cursor: pointer;
    border-radius: 6px;
    transition: 0.2s;
    color: var(--option-color);
    width: 100%;
    box-sizing: border-box;
    font-weight: var(--option-font-weight);
    &:hover {
      background-color: var(--option-hover-background-color);
    }
  }
  &-groups {
    .group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span {
        color: var(--group-name-color);
        margin-bottom: 4px;
        margin-top: 4px;
        font-weight: var(--group-name-font-weight);
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .active {
    background-color: var(--active-background-color);
    color: var(--active-option-color);
  }
  &--lg {
    .dropdown-items {
      padding: 14px 12px;
    }
    .dropdown-item {
      font-size: 14px;
      margin-bottom: 6px;
    }
    .group {
      margin-bottom: 16px;
      span {
        font-size: 14px;
      }
    }
  }
  &--md {
    .dropdown-items {
      padding: 12px 10px;
    }
    .dropdown-item {
      font-size: 12px;
      margin-bottom: 2px;
    }
    .group {
      margin-bottom: 12px;
      span {
        font-size: 14px;
      }
    }
  }
  &--sm {
    .dropdown-items {
      padding: 10px 8px;
    }
    .dropdown-item {
      font-size: 10px;
    }
    .group {
      margin-bottom: 10px;
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
