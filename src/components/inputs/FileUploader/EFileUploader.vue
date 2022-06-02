<template>
  <div class="file-uploader" :class="`file-uploader--${mergedData.size} ${mergedData.disabled ? 'disabled' : ''}`" :style="getStyleVars" >
    <span class="label" v-if="mergedData.label">{{ mergedData.label }}</span>
<!--    (mergedData.multiple && newFiles.length < mergedData.maxFiles) ||-->
    <div
      class="upload-zone"
      :class="{ disabled: mergedData.disabled }"
      v-show="
            !newFiles.length
      "
    >
      <icon v-if='!isErrorUpload' icon="upload" />
      <icon v-else icon="arrow-clockwise" />

      <span class="drop-label" v-show="!isFileLoading && !isErrorUpload">{{ mergedData.innerText }}</span>
      <span class="loader-label" v-show="isFileLoading && !isErrorUpload">{{ mergedData.loadingText }}</span>
      <span class="drop-label upload-error" v-show="!isFileLoading && isErrorUpload" @click="clear">{{ mergedData.tryAgainText }}</span>

      <file-upload
        :accept="mergedData.accept.length ? mergedData.accept.join() : ''"
        :multiple="mergedData.multiple"
        :disabled="mergedData.disabled"
        input-id="file1"
        :drop="true"
        :maximum="mergedData.maxFiles"
        :size="mergedData.maxSize"
        @input-file="fileHandler"
      >
        <span class="browse-label" v-if="!isFileLoading && !isErrorUpload">{{ mergedData.actionInnerText }}</span>
      </file-upload>
    </div>

    <div class="file-preview">
      <div class="file" v-for="file in newFiles" :key="file.id" @click="openFile(file.image_url)">
        <div class="file-icon">
          <icon icon="file-earmark" />
        </div>
        <div class="file-name">{{ file.name || 'No name' }}</div>
        <div class="file-size">{{ fileSize(file.size_in_bytes) }}</div>
        <div class="file-delete" @click.stop="deleteFile(file.id)" v-show="mergedData.deletable">
          <icon icon="x-lg" />
        </div>
      </div>
      <div class="add-more" v-show="
        (mergedData.multiple && newFiles.length)
      ">

        <file-upload
          :accept="mergedData.accept.length ? mergedData.accept.join() : ''"
          :multiple="mergedData.multiple"
          :disabled="mergedData.disabled || isErrorUpload"
          input-id="file2"
          :maximum="mergedData.maxFiles"
          :size="mergedData.maxSize"
          @input-file="fileHandler"
        >

         <!--          todo куда впихнуть текст ошибки -->
          <!--          todo другие тексты ошибок -->
          <!--          <span class="browse-label" v-if="!isFileLoading">{{ mergedData.actionInnerText }}</span>-->
          <span class="browse-label" :class="{disabled: newFiles.length > mergedData.maxFiles}" v-if="!isFileLoading"> <icon icon="plus-lg" /> Добавить файл</span>
            <!--          todo ???? Loading text ? -->
          <span class="browse-label" :class="{disabled: newFiles.length > mergedData.maxFiles}" v-else> {{ mergedData.loadingText }}</span>
        </file-upload>
      </div>
    </div>

    <span class="helper-text" :class="{'--error': isErrorUpload || error}" v-if="mergedData.helperText || isErrorUpload || error">{{ !error ? mergedData.helperText : error}}</span>
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
      isFileLoading: false,
      isErrorUpload: false
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
          loadingText: 'Loading...',
          tryAgainText: 'Try again',
          // loadErrorText: 'Loading error',
          errorText: ''
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
        '--label-font-weight': this.styleConfig?.labelFontWeight || 400,
        '--label-font-size': this.styleConfig?.labelFontSize || '14px',
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--helper-text-font-size': this.styleConfig?.helperTextFontSize || '10px',
        '--border-color': this.styleConfig?.borderColor || '#cbd5e0',
        '--border-radius': this.styleConfig?.borderRadius || '4px',
        '--icon-color': this.styleConfig?.iconColor || '#718096',
        '--drop-label-color': this.styleConfig?.dropLabelColor || '#718096',
        '--browse-label-color': this.styleConfig?.browseLabelColor || '#3385ff',
        '--uploader-labels-font-weight': this.styleConfig?.uploaderLabelsFontWeight || 400,
        '--uploader-labels-font-size': this.styleConfig?.uploderLabelsFontSize || this.defaultFontSize,
      }
    },
    defaultFontSize() {
      return this.mergedData.size === 'sm' ? '12px' : '14px'
    },

    error() {
      return this.mergedData.errorText
    }
  },
  mounted() {
    this.newFiles = this.mergedData.modelValue
    this.EgalActionConstructor = new ActionConstructor(this.mergedData.domain)
  },
  methods: {
    clear() {
      this.isFileLoading = false
      this.isErrorUpload = false
      this.newFiles = []
    },
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
      this.EgalActionConstructor.delete(this.mergedData.microservice, this.mergedData.model, {
        id: fileId,
      })
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
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            this.isFileLoading = false
            this.isErrorUpload = true
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
     * Get binary string
     * @param file
     */
    getBase64String(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => resolve(reader.result.split(';base64,')[1])

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
     * Upload full file (without chunks) in base64 format
     * @param file
     * @param fileName
     */
    uploadFile(file, fileName) {
      return new Promise((resolve, reject) => {
        this.EgalActionConstructor.custom(
          this.mergedData.microservice,
          this.mergedData.model,
          'uploadBase',
          {
            file_basename: fileName,
            contents: file,
          },
        )
          .call()
          .then((data) => {
            resolve(data.path)
          })
          .catch((error) => {
            this.isFileLoading = false
            this.isErrorUpload = true
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
        upload(this, 1)
        function upload(self, index) {
          self.EgalActionConstructor.custom(
            self.mergedData.microservice,
            self.mergedData.model,
            'uploadPart',
            {
              upload_id: uploadId,
              path,
              part_number: index,
              contents: chunks[index - 1],
            },
          )
            .call()
            .then((response) => {
              if (response.action_error || response.error_message) {
                reject(response.action_error || response.error_message)
                return
              }
              if (index < chunks.length) {
                index++
                upload(self, index)
                return
              }
              resolve()
            })
            .catch((error) => {
              this.isFileLoading = false
              this.isErrorUpload = true
              self.$emit('error:upload', error)
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
          .then((data) => resolve(data.path))
          .catch((error) => {
            this.isFileLoading = false
            this.isErrorUpload = true
            this.$emit('error:upload', error)
            reject(error)
          })
      })
    },
    /**
     * Create file in data base
     * @param path
     * @param fileName
     */
    createFile(path, fileName) {
      return new Promise((resolve, reject) => {
        this.EgalActionConstructor.create(this.mergedData.microservice, this.mergedData.model, {
          image_path: path,
        })
          .call()
          .then((data) => {
            this.$emit('on:upload', { ...data, name: fileName })
            resolve(data.id)
          })
          .catch((error) => {
            this.isFileLoading = false
            this.isErrorUpload = true
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
      this.isFileLoading = true
      this.isErrorUpload = false

      if (this.mergedData.validators.length) {
        const errorMessage = validate(this.mergedData.validators, this.newValue)
        this.$emit('error', errorMessage)
        if (errorMessage) {
          this.isFileLoading = false
          return
        }
      }

      if (file.size < this.chunkSize) {
        this.getBase64String(file.file).then((response) => {
          this.uploadFile(response, file.name).then((path) => {
            this.createFile(path, file?.name).then(() => {
              this.isFileLoading = false
            })
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
                  this.createFile(path, file?.name).then(() => {
                    this.isFileLoading = false
                  })
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

    &.--error {
      color: $danger;
    }

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
      line-height: 150%;
    }
    .drop-label {
      color: var(--drop-label-color);

      &.upload-error {
        width: 72px;
        margin: 0 15px;
        text-align: center;
        font-weight: 400;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .browse-label {
      color: var(--browse-label-color);
    }
    ::v-deep(span.file-uploads) {
      &:hover {
        opacity: 0.8;
      }
    }

    .loader-label {
      min-width: 110px;
      color: var(--browse-label-color);
      text-align: center;
      margin-top: 8px;
      margin-bottom: 11px;
      font-weight: var(--uploader-labels-font-weight);
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
    padding: 10px 11px;
    display: grid;
    grid-template-columns: 12px 1fr auto 8px;
    grid-column-gap: 6px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 160px;
    .bi {
      color: var(--file-icon-color);
      margin-bottom: 0;
    }
    &-name {
      font-weight: var(--file-name-font-weight);
      font-size: var(--file-name-font-size);
      color: var(--file-name-color);

      max-width: 90px;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
      align-self: flex-end;
      margin-bottom: 1px;
    }
    &-size {
      font-size: 10px;
      font-weight: var(--file-size-font-weight);
      color: var(--file-size-color);
      align-self: flex-end;
      margin-bottom: 3px;
    }
    &-delete {
      align-self: flex-end;
      cursor: pointer;
      .bi {
        width: 10px;
        height: 10px;
        vertical-align: bottom;
        margin-bottom: 4px;
      }
    }
  }
  .bi {
    color: var(--icon-color);
    margin-bottom: 8px;
  }
  span {
    font-weight: 700;
    //font-weight: var(--uploader-labels-font-weight);
    font-size: var(--uploader-labels-font-size);
  }
  .browse-label {
    color: var(--browse-label-color);
    padding: 6px 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .bi {
      color: var(--browse-label-color);
      stroke: var(--browse-label-color);
      margin-bottom: 0;
      margin-right: 6px;
      width: 10px;
      height: 10px;
    }

  }
  ::v-deep(span.file-uploads):hover > label {
    opacity: 0.2;
    cursor: pointer;
  }

  .add-more {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    .browse-label.disabled {
      pointer-events: none;
      color: $gray-400;
      .bi {
        color: $gray-400;
        stroke: $gray-400;
      }
      &:hover {
        cursor: default;
      }
    }

    ::v-deep(span.file-uploads):hover {
      opacity: 1;
      cursor: default;
    }
    ::v-deep(span.file-uploads):hover > label {
      opacity: 0;
      cursor: default;
    }
  }
}

.file-uploader.disabled {
    .helper-text {
      color: $gray-400;
    }

    .upload-zone {
      //todo ?
      //background-color: $gray-100;

      ::v-deep(label) {
        cursor: default;
      }
    }
    .file-preview {
      .file {
        background-color: $gray-100;
      }
    }

  .file, .browse-label, .drop-label {
    pointer-events: none;
    color: $gray-400;
    .bi {
      color: $gray-400;
      stroke: $gray-400;
    }
    &:hover {
      cursor: default;
    }
  }

  .file-name, .file-size, .bi {
    color: $gray-400;
  }
  ::v-deep(span.file-uploads):hover {
    opacity: 1;
    cursor: default;
  }
}
</style>