<template>
    <div class="ckeditor-classic">
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
              'bold', 'italic', '|',
              'link', '|',
              'bulletedList', 'numberedList', '|',
              'uploadImage', '|',
              'undo', 'redo'
             ],
            shouldNotGroupWhenFull: true
        },
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
