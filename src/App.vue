<template>
  <NavbarVertical :links="links" />
  <div>
    <NavbarHorizontal :links="links" />
    <Pagination :number-of-pages="10" v-model="currentPage" />
    <Breadcrumbs />
    <router-view />
  </div>
  <FileUploader />
  <avatar
      darken
      shape="square"
      size="xxl"
      name="Jonh Doe"
      img-url="https://picsum.photos/200/300"
  />
  <tag icon="star" cross-icon>Badge</tag>
  <tooltip>Some text here</tooltip>
  <div class="container">
    <button @click="showToaster">show toaster</button>
    <button @click="showDanger">show danger</button>
    <ToasterContainer />
  </div>
  <div class="container">
    <e-button class="test" rounded left-icon="chat" right-icon="chat"
    >Button</e-button
    >
    <e-checkbox size="md" @change="test" checkbox-right>Checkbox</e-checkbox>
    <div class="radio-container">
      <e-radio
          class="radio"
          name="default"
          @change="showRadio"
          value="1"
          :input-style="{ hover: { borderColor: 'black' } }"
          radio-right
          disabled
      >Radio 2</e-radio
      >
      <e-radio
          class="radio"
          name="default"
          @change="showRadio"
          value="2"
          size="sm"
      >Radio 1</e-radio
      >
      <e-radio
          class="radio"
          name="default"
          @change="showRadio"
          value="3"
          size="lg"
      >Radio 3</e-radio
      >
    </div>
    <e-toggle
        class="toggle"
        size="lg"
        :input-style="{ backgroundColor: 'green' }"
    >Toggle</e-toggle
    >
    <e-toggle class="toggle" disabled>Toggle</e-toggle>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileUploader from '@/components/FileUploader/FileUploader.vue'
import Pagination from "@/components/navigation/Pagination.vue";
import Breadcrumbs from "@/components/navigation/Breadcrumbs.vue";
import NavbarVertical from "@/components/navigation/NavbarVertical.vue";
import NavbarHorizontal from "@/components/navigation/NavbarHorizontal.vue";
import ToasterContainer from "@/components/toaster/ToasterContainer.vue";
import Avatar from "@/components/personality/Avatar.vue";
import Tag from "@/components/personality/Tag.vue";
import Tooltip from "@/components/personality/Tooltip.vue";
import EButton from "@/components/EButton";
import ECheckbox from "@/components/ECheckbox";
import ERadio from "@/components/ERadio";
import EToggle from "@/components/EToggle";
export default defineComponent({
  name: 'App',
  components: { FileUploader, ToasterContainer,     EButton,
    ECheckbox,
    ERadio,
    EToggle },
  data() {
    return {
      checked: false,
      options: [
        {
          name: 'Second option',
          key: 0,
        },
        {
          name: 'Kjhkjh',
          key: 1,
        },
        {
          name: 'Ouowidjw',
          key: 2,
        },
        {
          name: 'Jwdkjbkdjw',
          key: 3,
        },
        {
          name: 'Lkwjd',
          key: 4,
        },
        {
          name: 'Ooiwue',
          key: 5,
        },
      ],
      groupedOptions: [
        {
          groupName: 'Group 1',
          options: [
            {
              name: 'Second option',
              key: 0,
            },
            {
              name: 'Kjhkjh',
              key: 1,
            },
            {
              name: 'Ouowidjw',
              key: 2,
            },
            {
              name: 'Jwdkjbkdjw',
              key: 3,
            },
            {
              name: 'Lkwjd',
              key: 4,
            },
            {
              name: 'Ooiwue',
              key: 5,
            },
          ],
        },
        {
          groupName: 'Group 2',
          options: [
            {
              name: 'Lksdje',
              key: 6,
            },
            {
              name: 'Oiuoeun',
              key: 7,
            },
            {
              name: 'Poiwepor',
              key: 8,
            },
            {
              name: 'Gwojpjf',
              key: 9,
            },
            {
              name: 'Oiulasoeun',
              key: 7,
            },
            {
              name: 'Poiwdsepor',
              key: 8,
            },
            {
              name: 'Gwsdojpjf',
              key: 9,
            },
          ],
        },
      ],
    }
  },

  methods: {
    showToaster(): void {
      this.$toaster.info({
        message: "message",
        primaryAction: "action",
      });
    },
    showDanger(): void {
      this.$toaster.danger({
        message: "message",
        variant: "dark",
        flat: true,
        primaryAction: "action",
        primaryActionCallback: () => {
          console.log("action danger primary");
        },
      });
    },
    test(ev) {
      console.log(ev);
    },
    showRadio(ev) {
      console.log(ev);
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
