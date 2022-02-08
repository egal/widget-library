<template>
  <div :class="`breadcrumbs --size-${size || 'md'}`" :style="getVars">
    <template v-for="(link, i) in parsedLinks" :key="link.to">
      <router-link class="breadcrumbs__link" :to="link.to">{{
        link.name
      }}</router-link>
      <BootstrapIcon
        class="breadcrumbs__icon"
        icon="chevron-right"
        v-if="i < parsedLinks.length - 1"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watchEffect, toRefs, defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { variables, getFont, getFontWeight } from "../../helpers/configNavigation";

type Props = {
  size?: "sm" | "md" | "lg";
  font?: "Inter" | "Open Sans" | "Raleway";
  weight?: "medium" | "regular" | "bold";
  color?: string;
  chevronColor?: string;
  activeColor?: string;
};

const props = defineProps<Props>();

const { size, font, weight, color, chevronColor, activeColor } = toRefs(props);

const router = useRouter();

type ParsedLink = {
  to: string;
  name?: string;
};

const parsedLinks = reactive([] as ParsedLink[]);

watchEffect(() => {
  parsedLinks.splice(0, parsedLinks.length + 1);
  parsedLinks.push(
    ...router.currentRoute.value.fullPath
      .split("/")
      .reduce<Array<Array<string>>>(
        (acc, value, index) => (
          (acc[index] = index === 0 ? [value] : [...acc[index - 1], value]), acc
        ),
        []
      )
      .map((el) => el.join("/"))
      .map((el) => el)
      .filter((el) => !!el)
      .map((to) => ({
        to,
        name: router.getRoutes().filter(({ path }) => path === to)[0]
          .name as string,
      }))
  );
});

const getVars = computed(() => ({
  "--chevron-color": chevronColor?.value || variables.gray500,
  "--active-color": activeColor?.value || variables.gray800,
  "--color": color?.value || variables.primaryAccent,
  "--font": getFont(font?.value),
  "--font-weight": getFontWeight(weight?.value),
}));
</script>

<style scoped lang="scss">
@import "src/assets/navigation/variables";

.breadcrumbs {
  font-family: var(--font);
  font-weight: var(--font-weight);
  color: var(--color);
  display: flex;

  &__icon {
    color: var(--chevron-color);
  }

  &__link {
    position: relative;
    color: inherit !important;
    text-decoration: none;
    display: block;

    &.router-link-exact-active {
      color: var(--active-color) !important;
    }

    &:not(.router-link-exact-active)::after {
      position: absolute;
      content: "";
      opacity: 0;
      display: block;
      width: calc(100% + 6px);
      height: 1px;
      background: var(--color);
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      transition: opacity 0.1s;
    }

    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }

  &.--size {
    &-sm {
      font-size: $p6-font-size;

      .breadcrumbs__icon {
        margin: 0 12px;
      }
    }
    &-md {
      font-size: $p4-font-size;

      .breadcrumbs__icon {
        margin: 0 10px;
      }
    }
    &-sm {
      font-size: $p3-font-size;

      .breadcrumbs__icon {
        margin: 0 8px;
      }
    }
  }
}
</style>
