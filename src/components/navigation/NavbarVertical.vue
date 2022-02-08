<template>
  <div
    class="navbar"
    :class="{ '--big': active }"
    :style="getVars"
    @mouseover="!isTransiring ? ((active = true), (isTransiring = true)) : ''"
    ref="navbar"
  >
    <div class="navbar__logo-group">
      <img
        :src="smallLogo"
        class="navbar__logo-group__big-logo"
        :class="{ '--hidden': active }"
        alt="logo"
      />
      <img
        :src="logo"
        class="navbar__logo-group__small-logo"
        :class="{ '--hidden': !active }"
        alt="logo"
      />
      <BootstrapIcon
        @click="(active = false), (isTransiring = true)"
        class="navbar__logo-group__chevron"
        :class="{ '--hidden': !active }"
        icon="chevron-left"
      />
    </div>
    <ul class="navbar__links">
      <router-link
        v-for="link in links"
        :to="link.to"
        v-slot="{ href, navigate, isActive, isExactActive }"
        custom
        :key="link.to"
      >
        <li
          :class="[
            isActive && 'router-link-active',
            isExactActive && 'router-link-exact-active',
          ]"
        >
          <a :href="href" @click="navigate"
            ><BootstrapIcon icon="circle" />
            <p>{{ link.name }}</p></a
          >
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {
  toRefs,
  defineProps,
  defineExpose,
  computed,
  ref,
  onMounted,
} from "vue";
//@ts-ignore
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
//@ts-ignore
import { variables, getFont, getFontWeight } from "@/helpers/config";

type Link = {
  name: string;
  to: string;
};

type Props = {
  logo: string;
  smallLogo: string;
  links: Link[];
  font?: "Inter" | "Open Sans" | "Raleway";
  weight?: "medium" | "regular" | "bold";
  color?: string;
  activeColor?: string;
  chevronColor?: string;
};

const props = defineProps<Props>();

const { font, weight, color, activeColor, chevronColor, links } = toRefs(props);

const active = ref(false);

const isTransiring = ref(false);

const navbar = ref<HTMLElement>(null as any);

defineExpose({ navbar });

onMounted(() => {
  navbar.value?.addEventListener("transitionend", () => {
    isTransiring.value = false;
  });
});

const getVars = computed(() => ({
  "--chevron-color": chevronColor?.value || variables.gray500,
  "--active-color": activeColor?.value || variables.primaryAccent,
  "--color": color?.value || variables.gray800,
  "--font": getFont(font?.value),
  "--font-weight": getFontWeight(weight?.value),
}));
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

.navbar {
  padding: 24px;
  box-sizing: border-box;
  font-family: var(--font);
  font-weight: var(--font-weight);
  transition: all 0.3s;
  width: 66px;

  &.--big {
    width: 250px;

    li a p {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &__logo-group {
    display: flex;
    justify-content: space-between;
    height: 40px;

    &__big-logo,
    &__small-logo {
      margin: 0;
      width: auto;
      height: 100%;
      object-fit: contain;
      object-position: left;
    }

    &__chevron {
      font-size: $p1-font-size;
      flex-shrink: 0;
      align-self: center;
      cursor: pointer;
    }

    .--hidden {
      display: none;
    }
  }

  &__links {
    list-style: none;
    margin-top: 30px;
    padding: 0;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 32px;
    font-size: $p4-font-size;
    color: black;

    li {
      display: block;
      position: relative;
      transition: 0.3s;

      &::after {
        position: absolute;
        display: block;
        content: "";
        left: -24px;
        top: 50%;
        width: 2px;
        height: 24px;
        transform: translate(10px, -50%);
        border-radius: 2px;
        background-color: var(--active-color);
        opacity: 0;
        transition: 0.3s;
      }

      a {
        position: relative;
        display: flex;
        align-items: center;
        color: inherit;
        text-decoration: none;
        font-size: $p4-font-size;

        svg {
          font-size: $p3-font-size;
          color: $gray-500;
          margin-right: 10px;
          transition: 0.3s;
        }

        p {
          color: var(--color);
          padding: 0;
          margin: 0;
          transform: translateX(-100%);
          opacity: 0;
          transition: 0.3s;
        }
      }

      &.router-link-exact-active,
      &:hover {
        p {
          color: var(--active-color);
        }

        svg {
          color: var(--active-color);
        }
      }

      &.router-link-exact-active::after {
        transform: translate(0, -50%);
        opacity: 1;
      }
    }
  }
}
</style>
