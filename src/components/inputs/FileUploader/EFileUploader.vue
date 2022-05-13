<template>
  <div class="file-uploader" :class="`file-uploader--${mergedData.size}`" :style="getStyleVars">
    <span class="label" v-if="mergedData.label">{{ mergedData.label }}</span>
    <div class="upload-zone" :class="{ disabled: mergedData.disabled }">
      <icon icon="upload" />
      <span class="drop-label">{{ mergedData.innerText }}</span>
      <file-upload
        :accept="mergedData.accept.length ? mergedData.accept.join() : ''"
        :multiple="mergedData.multiple"
        :disabled="mergedData.disabled"
        ref="inputFile"
        :drop="true"
        :maximum="mergedData.maxFiles"
        :size="mergedData.maxSize"
        @input-file="fileHandler"
        v-show="mergedData.multiple || !newFiles.length"
      >
        <span class="browse-label">{{ mergedData.actionInnerText }}</span>
      </file-upload>
    </div>
    <div class="file-preview" v-show="newFiles.length">
      <div class="file" v-for="file in newFiles" :key="file.id" @click="openFile(file.file_url)">
        <div class="file-icon">
          <icon icon="file-earmark" />
        </div>
        <div class="file-name">{{ file.name || 'No name' }}</div>
        <div class="file-size">{{ fileSize(file.size) }}</div>
        <div class="file-delete" @click.stop="deleteFile(file.id)" v-show="mergedData.deletable">
          <icon icon="x-lg" />
        </div>
      </div>
    </div>
    <span class="helper-text" v-if="mergedData.helperText">{{ mergedData.helperText }}</span>
  </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component/dist/vue-upload-component'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import { validate } from '@/helpers/validators'
import { ActionConstructor } from '@egalteam/framework'

export default {
  name: 'EFileUploader',
  components: {
    FileUpload: VueUploadComponent,
    Icon: BootstrapIcon,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      newFiles: [],
      chunkSize: 5242880, // 5mb
      EgalActionConstructor: null,
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          modelValue: [],
          label: '',
          helperText: '',
          multiple: false,
          size: 'sm',
          validators: [],
          accept: [],
          maxFiles: 1,
          maxSize: 0,
          disabled: false,
          deletable: true,
          domain: 'http://127.0.0.1:88',
          microservice: 'core',
          model: 'Document',
          innerText: 'Drop file here or',
          actionInnerText: 'Browse file',
        },
        this.data,
      )
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Open Sans',
        '--file-background-color': this.styleConfig?.fileBackgroundColor || '#f7fafc',
        '--file-border-radius': this.styleConfig?.fileBorderRadius || '4px',
        '--file-icon-color': this.styleConfig?.fileIconColor || '#a0aec0',
        '--file-name-font-weight': this.styleConfig?.fileNameFontWeight || 500,
        '--file-name-font-size': this.styleConfig?.fileNameFontSize || '12px',
        '--file-name-color': this.styleConfig?.fileNameColor || '#2d3748',
        '--file-size-font-weight': this.styleConfig?.fileSizeFontWeight || 500,
        '--file-size-color': this.styleConfig?.fileSizeColor || '#a0aec0',
        '--label-color': this.styleConfig?.labelColor || '#4a5568',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 500,
        '--label-font-size': this.styleConfig?.labelFontSize || '14px',
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 500,
        '--helper-text-font-size': this.styleConfig?.helperTextFontSize || '12px',
        '--border-color': this.styleConfig?.borderColor || '#cbd5e0',
        '--border-radius': this.styleConfig?.borderRadius || '4px',
        '--icon-color': this.styleConfig?.iconColor || '#718096',
        '--drop-label-color': this.styleConfig?.dropLabelColor || '#718096',
        '--browse-label-color': this.styleConfig?.browseLabelColor || '#3385ff',
        '--uploader-labels-font-weight': this.styleConfig?.uploaderLabelsFontWeight || 500,
        '--uploader-labels-font-size': this.styleConfig?.uploderLabelsFontSize || '14px',
      }
    },
  },
  mounted() {
    this.newFiles = this.mergedData.modelValue
    this.EgalActionConstructor = new ActionConstructor(this.mergedData.domain)
  },
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
      this.EgalActionConstructor.delete(
        this.mergedData.microservice,
        this.mergedData.model,

        {
          id: fileId,
        },
      )
        .call()
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
        this.EgalActionConstructor.custom(
          this.mergedData.microservice,
          this.mergedData.model,
          'createMultipartUpload',
          {
            file_basename: fileName,
          },
        )
          .call()
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
          let chunkStart = 0
          let chunkEnd = 0
          let chunkArray = []
          while (chunkStart + this.chunkSize < resp.length) {
            chunkEnd = chunkStart + this.chunkSize
            chunkArray.push(resp.slice(chunkStart, chunkEnd))
            chunkStart += this.chunkSize
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
        this.EgalActionConstructor.custom(
          this.mergedData.microservice,
          this.mergedData.model,
          'upload',
          {
            file_basename: fileName,
            contents: file,
          },
        )
          .call()
          .then((response) => response.json())
          .then((data) => {
            resolve(data.action_result.data.path)
          })
          .catch((error) => {
            this.$emit('error:upload', error)
            reject(error)
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
          this.EgalActionConstructor.custom(
            self.mergedData.microservice,
            self.mergedData.model,
            'uploadPart',
            {
              upload_id: uploadId,
              path,
              part_number: index,
              contents: chunks[index],
            },
          )
            .call()
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
        this.EgalActionConstructor.custom(
          this.mergedData.microservice,
          this.mergedData.model,
          'completeMultipartUpload',
          {
            upload_id: uploadId,
            path,
          },
        )
          .call()
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
        this.EgalActionConstructor.create(
          this.mergedData.microservice,
          this.mergedData.model,

          {
            file_path: path,
          },
        )
          .call()
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
      if (this.mergedData.validators.length) {
        const errorMessage = validate(this.mergedData.validators, this.newValue)
        this.$emit('error', errorMessage)
        if (errorMessage) {
          return
        }
      }

      if (file.size < this.chunkSize) {
        this.getBinaryString(file.file).then((response) => {
          this.uploadFile(response, file.name).then((path) => {
            this.createFile(path)
          })
        })
      } else {
        this.createUploadPath(file.name).then((createPathResponse) => {
          this.createChunks(file).then((chunks) => {
            this.uploadChunk(chunks, createPathResponse.upload_id, createPathResponse.path).then(
              () => {
                this.completeChunksUpload(
                  createPathResponse.upload_id,
                  createPathResponse.path,
                ).then((path) => {
                  this.createFile(path)
                })
              },
            )
          })
        })
      }
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
@import 'src/assets/variables';
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
    ::v-deep(label) {
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
