<template>
<!--  <main>-->
    <div class="container">
      <EInput
        :data="{
          id: 'test-input',

        }"
      />
    </div>
<!--    <div class='container'>-->
<!--      <ECalendar />-->
<!--    </div>-->
<!--  </main>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import ECalendar from '@/components/calendar/Calendar.vue'
// //inputs
import EInput from '@/components/inputs/Input/EInput.vue'
// import ClearButton from '@/components/inputs/ClearButton/ClearButton.vue'
// import ECounter from '@/components/inputs/Counter/ECounter.vue'
// import EDropdown from '@/components/inputs/Dropdown/EDropdown.vue'
// import EFileUploader from '@/components/inputs/FileUploader/EFileUploader.vue'
// import ESelect from '@/components/inputs/Select/ESelect.vue'
// import ETextArea from '@/components/inputs/TextArea/ETextArea.vue'
// // navigation
// import EBreadcrumbs from '@/components/navigation/EBreadcrumbs.vue'
// import ENavbarLeft from '@/components/navigation/ENavbarLeft.vue'
// import ENavbarLeftItem from '@/components/navigation/ENavbarLeftItem.vue'
// import ENavbarTop from '@/components/navigation/ENavbarTop.vue'
// import EPagination from '@/components/navigation/EPagination.vue'
// // personality
// import EAvatar from '@/components/personality/EAvatar.vue'
// import ETag from '@/components/personality/ETag.vue'
// import ETooltip from '@/components/personality/ETooltip.vue'
// // toaster
// // ?
// // togglers
// import EButton from '@/components/togglers/EButton.vue'
// import ECheckbox from '@/components/togglers/ECheckbox.vue'
// import ERadio from '@/components/togglers/ERadio.vue'
// import EToggle from '@/components/togglers/EToggle.vue'
// // widget
// // ??
export default defineComponent({
  name: 'App',
  components: {
    EInput,
    // ECalendar, ECounter, EDropdown, EFileUploader, ESelect,ETextArea, ClearButton,
    // EBreadcrumbs, ENavbarLeft, ENavbarLeftItem, ENavbarTop, EPagination, EAvatar, ETag, ETooltip,
    // EButton, ECheckbox, ERadio, EToggle
  },
  data() {
    return {}
  },
  methods: {},
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}

.container {
  width: 350px;
  margin-top: 30px;
}
</style>