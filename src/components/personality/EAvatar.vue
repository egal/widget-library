<template>
  <EAvatarGroup
    v-if="mergedData?.multipleAvatars && mergedData?.multipleAvatars.length > 0"
    :data="mergedData"
    :avatars="mergedData?.multipleAvatars"
  />
  <EAvatarEditable v-else-if="mergedData.editable" :data="mergedData" />
  <EAvatarSingle v-else :data="mergedData" />
</template>

<script>
import EAvatarGroup from '@/components/personality/avatar/EAvatarGroup'
import EAvatarSingle from '@/components/personality/avatar/EAvatarSingle'
import EAvatarEditable from '@/components/personality/avatar/EAvatarEditable'
export default {
  name: 'EAvatar',
  components: { EAvatarEditable, EAvatarGroup, EAvatarSingle },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          font: 'Open Sans',
          weight: 'bold',
          color: '#ffffff',
          bgColor: '#A0AEC0',
          name: '',
          size: 'md',
          shape: 'circle',
          imgUrl: '',
          darken: false,
          borderColor: '#ffffff',
          isOnline: false,
          isNameRequired: false,
          editable: false,
          isLoading: false,
          loadingText: 'Loading...',
          isDropdownOpen: false,
          dropdownOptions: [],
          multipleAvatars: [],
        },
        this.data,
      )
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';
</style>
