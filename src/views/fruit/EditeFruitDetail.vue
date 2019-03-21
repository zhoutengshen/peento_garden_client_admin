<template>
  <div class="quill-editor">
    <!-- quill-editor -->
    <QuillEditor
      ref="myTextEditor"
      :value="content"
      :options="editorOption"
      class
      @change="changHandle"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
    <input
      id="imgUpload"
      ref="imgUpload"
      type="file"
      style="display:none"
      accept="image/*"
      @change="inputChangeHandle"
    >
  </div>
</template>

<script>
import { uploadImg } from '@/api/fruit'
import hljs from 'highlight.js'
import { quillEditor, Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
export default {
  components: {
    QuillEditor: quillEditor
  },
  model: {
    prop: 'content',
    event: 'change'
  },
  props: {
    content: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      name: 'edtiedFruiDetail',
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            handlers: {
              image(value) {
                if (value && window) {
                  const input = document.getElementById('imgUpload')
                  input.click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        }
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value
    }
  },
  mounted() {
  },
  methods: {
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    changHandle(val) {
      this.$emit('change', val.html)
    },
    inputChangeHandle() {
      const file = this.$refs['imgUpload'].files[0]
      if (file) {
        const f = new FormData()
        f.append('img', file)
        uploadImg(f).then(({ data }) => {
          if (data.success) {
            const quill = this.editor
            const length = quill.getSelection().index
            quill.insertEmbed(length, 'image', data.url)
            quill.setSelection(length + 1)
            this.$refs['imgUpload'].value = ''
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
<style>
@import "quill/dist/quill.core.css";
@import "quill/dist/quill.snow.css";
@import "quill/dist/quill.bubble.css";
</style>
<style>
.quill-editor {
}
.quill-editor .ql-container {
  height: 800px;
}
</style>

