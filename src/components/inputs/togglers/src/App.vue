<template>
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

<script>
import EButton from "@/components/EButton";
import ECheckbox from "@/components/ECheckbox";
import ERadio from "@/components/ERadio";
import EToggle from "@/components/EToggle";

export default {
  name: "App",
  components: {
    EButton,
    ECheckbox,
    ERadio,
    EToggle,
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    test(ev) {
      console.log(ev);
    },
    showRadio(ev) {
      console.log(ev);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-flow: column nowrap;

  .test {
    width: fit-content;
    margin-bottom: 20px;
  }

  .radio-container {
    display: flex;
    flex-flow: column nowrap;
    margin-top: 20px;

    .radio {
      margin-bottom: 10px;
    }
  }
}
</style>
