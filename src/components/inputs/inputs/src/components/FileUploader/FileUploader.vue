<template>
  <div class="file-uploader" :class="`file-uploader--${size}`" :style="getStyleVars">
    <span class="label" v-if="label">{{ label }}</span>
    <file-upload
      :accept="accept.length ? accept.join() : ''"
      :multiple="multiple"
      :disabled="disabled"
      class="upload-zone"
      :maximum="maxFiles"
      :size="maxSize"
      v-model="newFiles"
      @input-file="fileHandler"
      v-show="multiple || !newFiles.length"
    >
      <icon icon="upload" />
      <span class="drop-label">Drop file here or</span>
      <span class="browse-label">Browse file</span>
    </file-upload>
    <div class="file-preview" v-show="newFiles.length">
      <div class="file" v-for="file in newFiles" :key="file.id">
        <div class="file-icon">
          <icon icon="file-earmark" />
        </div>
        <div class="file-name">{{ file.name }}</div>
        <div class="file-size">{{ file.size }}</div>
        <div class="file-delete">
          <icon icon="x-lg" />
        </div>
      </div>
    </div>
    <span class="helper-text" v-if="helperText">{{ helperText }}</span>
  </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'FileUploader',
  components: {
    FileUpload: VueUploadComponent,
    Icon: BootstrapIcon,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    helperText: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'sm',
    },
    validators: {
      type: Array,
      default: [],
    },
    accept: {
      type: Array,
      default: [],
    },
    maxFiles: {
      type: Number,
      default: 1,
    },
    maxSize: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
    domain: {
      type: String,
      default: 'http://192.168.1.244',
    },
    microservice: {
      type: String,
      default: 'core',
    },
    model: {
      type: String,
      default: 'Document',
    },
  },
  data() {
    return {
      newFiles: [],
    }
  },
  computed: {
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || variables.openSans,
        '--value-color': this.styleConfig?.valueColor || variables.gray500,
        '--value-font-weight': this.styleConfig?.valueFontWeight || variables.mediumFontWeight,
        '--label-color': this.styleConfig?.labelColor || variables.gray700,
        '--label-font-weight': this.styleConfig?.labelFontWeight || variables.mediumFontWeight,
        '--label-font-size': this.styleConfig?.labelFontSize || variables.p5FontSize,
        '--helper-text-color': this.styleConfig?.helperTextColor || variables.gray500,
        '--helper-text-font-weight':
          this.styleConfig?.helperTextFontWeight || variables.mediumFontWeight,
        '--helper-text-font-size': this.styleConfig?.helperTextFontSize || variables.p6FontSize,
        '--border-color': this.styleConfig?.borderColor || variables.gray400,
        '--border-radius': this.styleConfig?.borderRadius || variables.allSidesSmall,
        '--icon-color': this.styleConfig?.iconColor || variables.gray600,
        '--drop-label-color': this.styleConfig?.dropLabelColor || variables.gray600,
        '--browse-label-color': this.styleConfig?.browseLabelColor || variables.info,
        '--uploader-labels-font-weight':
          this.styleConfig?.uploaderLabelsFontWeight || variables.mediumFontWeight,
        '--uploader-labels-font-size':
          this.styleConfig?.uploderLabelsFontSize || variables.p5FontSize,
      }
    },
  },
  mounted() {},
  methods: {
    createUploadPath(fileName) {
      return new Promise((resolve, reject) => {
        fetch(`${this.domain}/${this.microservice}/${this.model}/createMultipartUpload`, {
          method: 'POST',
          body: JSON.stringify({
            file_basename: fileName,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => {
            resolve(data.action_result.data)
          })

          .catch((error) => {
            reject(this.$emit('error', error))
          })
      })
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    createChunks(file) {
      return new Promise((resolve) => {
        this.getBase64(file.file).then((resp) => {
          const base64 = resp.replace(resp.substring(0, resp.search(',') + 1), '')
          if (resp.length < 5000000) {
            resolve([base64])
          }
          const chunkSize = 5000000 // 5mb
          let chunkStart = 0
          let chunkEnd = 0
          let chunkArray = []
          while (chunkStart + chunkSize < base64.length) {
            chunkEnd = chunkStart + chunkSize
            chunkArray.push(base64.slice(chunkStart, chunkEnd))
            chunkStart += chunkSize
          }
          chunkArray.push(base64.slice(chunkStart, base64.length))
          resolve(chunkArray)
        })
      })
    },

    uploadChunk(chunks, uploadId, path) {
      return new Promise((resolve, reject) => {
        upload(this)

        let counter = 0

        function upload(self) {
          fetch(`${self.domain}/${self.microservice}/${self.model}/uploadPart`, {
            method: 'POST',
            body: JSON.stringify({
              upload_id: uploadId,
              path,
              part_number: counter,
              contents: chunks[counter],
            }),
            headers: { 'Content-Type': 'application/json' },
          })
            .then(() => {
              if (counter < chunks.length - 1) {
                counter++
                upload()
              }
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        }

        // chunks.forEach((chunk, partNumber) => {
        //   fetch(`${this.domain}/${this.microservice}/${this.model}/uploadPart`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       upload_id: uploadId,
        //       path,
        //       part_number: partNumber,
        //       contents: chunk,
        //     }),
        //     headers: { 'Content-Type': 'application/json' },
        //   })
        //     .then(() => {
        //       counter++
        //       if (counter === chunks.length) {
        //         resolve()
        //       }
        //     })
        //     .catch((error) => {
        //       this.$emit('error', error)
        //     })
        // })
      })
    },
    completeChunksUpload(uploadId, path) {
      return new Promise((resolve, reject) => {
        fetch(`${this.domain}/${this.microservice}/${this.model}/completeMultipartUpload`, {
          method: 'POST',
          body: JSON.stringify({
            upload_id: uploadId,
            path,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => resolve(data.action_result.data.path))
          .catch((error) => {
            reject(this.$emit('error', error))
          })
      })
    },
    createFile(path) {
      return new Promise((resolve, reject) => {
        fetch(`${this.domain}/${this.microservice}/${this.model}/create`, {
          method: 'POST',
          body: JSON.stringify({
            attributes: {
              file_path: path,
            },
          }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => {
            resolve(data.action_result.data.id)
          })
          .catch((error) => {
            reject(this.$emit('error', error))
          })
      })
    },
    getFile(id) {
      fetch(`${this.domain}/${this.microservice}/${this.model}/getItem`, {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.action_result.data.file_url)
        })
    },
    fileHandler(file) {
      this.createUploadPath(file.name).then((createPathResponse) => {
        this.createChunks(file).then((chunks) => {
          this.uploadChunk(chunks, createPathResponse.upload_id, createPathResponse.path).then(
            () => {
              this.completeChunksUpload(createPathResponse.upload_id, createPathResponse.path).then(
                (path) => {
                  this.createFile(path).then((id) => {
                    this.getFile(id)
                  })
                },
              )
            },
          )
        })
      })
    },
  },
  watch: {},
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

.file-uploader {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: var(--font-family);

  .helper-text {
    margin-top: 8px;
    color: var(--helper-text-color);
    font-weight: var(--helper-text-font-weight);
    font-size: var(--helper-text-font-size);
  }
  .label {
    margin-bottom: 8px;
    color: var(--label-color);
    font-weight: var(--label-font-weight);
    font-size: var(--label-font-size);
  }
  .upload-zone {
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 1px dashed var(--border-color);
    border-radius: var(--border-radius);
    padding: 12px 24px;

    .bi {
      color: var(--icon-color);
      margin-bottom: 8px;
    }

    span {
      font-weight: var(--uploader-labels-font-weight);
      font-size: var(--uploader-labels-font-size);
    }

    .drop-label {
      color: var(--drop-label-color);
    }

    .browse-label {
      color: var(--browse-label-color);
    }

    /deep/ label {
      cursor: pointer;
    }
  }

  &--lg {
    .upload-zone {
      padding: 25px 32px;
    }
  }
}

.file-preview {
  .file {
    background-color: $gray-100;
    border-radius: $all-sides-small;
    padding: 10px 12px;

    display: grid;
    grid-template-columns: 12px 1fr auto 8px;
    grid-column-gap: 6px;
  }
}
</style>
