<template>
  <div class="file-uploader" :class="`file-uploader--${size}`" :style="getStyleVars">
    <span class="label" v-if="label">{{ label }}</span>
    <div class="upload-zone">
      <icon icon="upload" />
      <span class="drop-label">Drop file here or</span>
      <file-upload
          :accept="accept.length ? accept.join() : ''"
          :multiple="multiple"
          :disabled="disabled"
          ref="inputFile"
          :drop="true"
          :maximum="maxFiles"
          :size="maxSize"
          @input-file="fileHandler"
          v-show="multiple || !newFiles.length"
      >
        <span class="browse-label">Browse file</span>
      </file-upload>
    </div>
    <div class="file-preview" v-show="newFiles.length">
      <div class="file" v-for="file in newFiles" :key="file.id" @click="openFile(file.file_url)">
        <div class="file-icon">
          <icon icon="file-earmark" />
        </div>
        <div class="file-name">{{ file.name || 'No name' }}</div>
        <div class="file-size">{{ fileSize(file.size) }}</div>
        <div class="file-delete" @click.stop="deleteFile(file.id)" v-show="deletable">
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
import variables from '@/assets/inputs/variables.scss'
import { validate } from '@/helpers/validators'
export default {
  name: 'FileUploader',
  components: {
    FileUpload: VueUploadComponent,
    Icon: BootstrapIcon,
  },
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
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
    deletable: {
      type: Boolean,
      default: true,
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
    domain: {
      type: String,
      default: 'http://127.0.0.1:88',
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
      newFiles: this.modelValue,
    }
  },
  computed: {
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || variables.openSans,
        '--file-background-color': this.styleConfig?.fileBackgroundColor || variables.gray100,
        '--file-border-radius': this.styleConfig?.fileBorderRadius || variables.allSidesSmall,
        '--file-icon-color': this.styleConfig?.fileIconColor || variables.gray500,
        '--file-name-font-weight':
            this.styleConfig?.fileNameFontWeight || variables.mediumFontWeight,
        '--file-name-font-size': this.styleConfig?.fileNameFontSize || variables.p6FontSize,
        '--file-name-color': this.styleConfig?.fileNameColor || variables.gray800,
        '--file-size-font-weight':
            this.styleConfig?.fileSizeFontWeight || variables.mediumFontWeight,
        '--file-size-color': this.styleConfig?.fileSizeColor || variables.gray500,
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
    /**
     * Open file by link
     * @param fileUrl
     */
    openFile(fileUrl) {
      const link = document.createElement('a')
      link.href = fileUrl
      link.target = 'true'
      link.click()
    },
    /**
     * Delete file from data base and send emit
     * @param fileId
     */
    deleteFile(fileId) {
      fetch(`${this.domain}/${this.microservice}/${this.model}/delete/${fileId}`)
          .then(() => {
            this.$emit('on:delete', fileId)
          })
          .catch((error) => {
            this.$emit('error:delete', error)
          })
    },
    /**
     * Get file size in B, KB, MB or GB
     * @param bytes
     */
    fileSize(bytes) {
      if (bytes === 0) return '0 B'
      if (!bytes) return null
      const k = 1024
      const dm = 2
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    /**
     * Create upload path for file
     * @param fileName
     */
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
              reject(this.$emit('error:upload', error))
            })
      })
    },
    /**
     * Get binary string
     * @param file
     */
    getBinaryString(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsBinaryString(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    /**
     * Create chunks if file > 5 Mb, otherwise upload full file
     * @param file
     */
    createChunks(file) {
      return new Promise((resolve) => {
        this.getBinaryString(file.file).then((resp) => {
          if (resp.length < 5242880) {
            this.uploadFile(resp, file.name).then((path) => {
              this.createFile(path)
            })
            return
          }
          const chunkSize = 5242880 // 5mb
          let chunkStart = 0
          let chunkEnd = 0
          let chunkArray = []
          while (chunkStart + chunkSize < resp.length) {
            chunkEnd = chunkStart + chunkSize
            chunkArray.push(resp.slice(chunkStart, chunkEnd))
            chunkStart += chunkSize
          }
          chunkArray.push(resp.slice(chunkStart, resp.length))
          resolve(chunkArray)
        })
      })
    },
    /**
     * Upload full file (without chunks)
     * @param file
     * @param fileName
     */
    uploadFile(file, fileName) {
      return new Promise((resolve, reject) => {
        fetch(`${this.domain}/${this.microservice}/${this.model}/upload`, {
          method: 'POST',
          body: JSON.stringify({
            file_basename: fileName,
            contents: file,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
              resolve(data.action_result.data.path)
            })
            .catch((error) => {
              reject(error)
              this.$emit('error:upload', error)
            })
      })
    },
    /**
     * Upload array of chunks
     * @param chunks
     * @param uploadId
     * @param path
     */
    uploadChunk(chunks, uploadId, path) {
      return new Promise((resolve, reject) => {
        upload(this, 0)
        function upload(self, index) {
          fetch(`${self.domain}/${self.microservice}/${self.model}/uploadPart`, {
            method: 'POST',
            body: JSON.stringify({
              upload_id: uploadId,
              path,
              part_number: index,
              contents: chunks[index],
            }),
            headers: { 'Content-Type': 'application/json' },
          })
              .then((resp) => resp.json())
              .then((response) => {
                if (response.action_error || response.error_message) {
                  reject(response.action_error || response.error_message)
                  return
                }
                if (index < chunks.length - 1) {
                  index++
                  upload(self, index)
                  return
                }
                resolve()
              })
              .catch((error) => {
                this.$emit('error:upload', error)
                reject(error)
              })
        }
      })
    },
    /**
     * Complete upload file by chunks
     * @param uploadId
     * @param path
     */
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
              this.$emit('error:upload', error)
              reject(error)
            })
      })
    },
    /**
     * Create file in data base
     * @param path
     */
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
              this.$emit('on:upload', data.action_result.data.id)
              resolve(data.action_result.data.id)
            })
            .catch((error) => {
              this.$emit('error:upload', error)
              reject(error)
            })
      })
    },
    /**
     * Call all steps of loading
     * @param file
     */
    fileHandler(file) {
      if (this.validators.length) {
        const errorMessage = validate(this.validators, this.newValue)
        this.$emit('error', errorMessage)
        if (errorMessage) {
          return
        }
      }
      this.createUploadPath(file.name).then((createPathResponse) => {
        this.createChunks(file).then((chunks) => {
          this.uploadChunk(chunks, createPathResponse.upload_id, createPathResponse.path).then(
              () => {
                this.completeChunksUpload(createPathResponse.upload_id, createPathResponse.path).then(
                    (path) => {
                      this.createFile(path)
                    },
                )
              },
          )
        })
      })
    },
  },
  watch: {
    modelValue: {
      handler(value) {
        this.newFiles = value
      },
      deep: true,
    },
  },
}
</script>
<style scoped lang="scss">
@import 'src/assets/inputs/variables';
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
    margin-bottom: 10px;
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
  display: flex;
  flex-wrap: wrap;
  .file {
    background-color: var(--file-background-color);
    border-radius: var(--file-border-radius);
    padding: 10px 12px;
    display: grid;
    grid-template-columns: 12px 1fr auto 8px;
    grid-column-gap: 6px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 204px;
    .bi {
      color: var(--file-icon-color);
    }
    &-name {
      font-weight: var(--file-name-font-weight);
      font-size: var(--file-name-font-size);
      color: var(--file-name-color);
      align-self: center;
      max-width: 100px;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
    }
    &-size {
      font-size: 10px;
      font-weight: var(--file-size-font-weight);
      color: var(--file-size-color);
      align-self: flex-end;
    }
    &-delete {
      align-self: flex-end;
      cursor: pointer;
      .bi {
        width: 8px;
        height: 8px;
      }
    }
  }
}
</style>