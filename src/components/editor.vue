<template>
    <div class="ckeditor-classic">
        {{ editorData }}
        <ckeditor @input="change" v-model="content" :editor="editor" :config="editorConfig"></ckeditor>
    </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      content: "",
      editorConfig: {
        toolbar: {
            items: [
              'fontColor', 'fontBackgroundColor', '|',
              'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
              'link', '|',
              'bulletedList', 'numberedList', 'todoList', '|',
              'code', 'codeBlock', '|',
              'uploadImage', '|',
              'undo', 'redo'
             ],
            shouldNotGroupWhenFull: true
        }
      },
    }
  },

  methods: {
    change() {
      this.$emit('data', this.content);
    }
  }
}
</script>
