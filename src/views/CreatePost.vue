<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="loading"/>
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            @change="fileChange"
            ref="blogPhoto"
            id="blog-photo"
            accept=".png,.jpg,.jpeg"
          />
          <button
            @click="openPreview"
            class="preview"
            :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <!-- <VueEditor :editorOptions="editorSettings" v-model="blogHTML" use-custom-image-handler
            /> -->
        <VueEditor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          use-custom-image-handler
          @imageAdded="handleImageAdded"
        />
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }"
          >Post Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
// import Quill from 'quill'
// import * as firebase from 'firebase/app';
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import VueEditor from "../components/VueEditor.vue";
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseInit";
import Loading from "../components/Loading.vue"
// window.Quill = Quill
// const imageResize = require("quill-image-resize-module").default;
// Quill.register('modules/imageResize',imageResize)
// const AlignStyle = Quill.import("attributors/style/align");
// Quill.register(AlignStyle, true);
// const BlockEmbed = Quill.import("blots/block/embed");
// class ImageBlot extends BlockEmbed {
//   static create(value) {
//     const node = super.create();
//     node.setAttribute("src", value.url);
//     node.setAttribute("id", value.id);
//     return node;
//   }

//   static value(node) {
//     return {
//       url: node.getAttribute("src"),
//       id: node.getAttribute("id")
//     };
//   }
// }

// ImageBlot.blotName = "image";
// ImageBlot.tagName = "img";
// Quill.register(ImageBlot);
export default {
  name: "CreatePost",
  data() {
    return {
      file: null,
      loading:null,
      error: null,
      errorMsg: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  components: { VueEditor, BlogCoverPreview,Loading },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      // console.log(URL.createObjectURL(this.file))
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
      
    },
    openPreview() {
      this.$store.commit("openPhotoPreview");
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const storage = getStorage();
      const storageRef = ref(storage, `documents/blogPostPhotos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.loge("File available at", downloadURL);
            Editor.insertEmbed(cursorLocation, "image", downloadURL);
            resetUploader();
          });
        }
      );
    },
    uploadBlog() {
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
            this.loading=true;
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `documents/blogCoverPhotos/${this.$store.state.blogPhotoName}`
          );
          const uploadTask = uploadBytesResumable(storageRef, this.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (error) => {
              console.log(error);
              // Handle unsuccessful uploads
              this.loading=false;
            },
            async () => {
              const downloadURL = await getDownloadURL(storageRef);
              const timestamp = Date.now();
              const Collection = await collection(db, "blogPosts");
              const database = doc(Collection);
             
              // const ID = database.id
              // const ref = doc(database,"blogPosts")
              // const getRef = await getDoc(ref)
              // const getD = getRef.data()

              try {
                await setDoc(database, {
                  blogId: database.id,
                  blogHTML: this.blogHTML,
                  blogCoverPhoto: downloadURL,
                  blogCoverPhotoName: this.blogCoverPhotoName,
                  blogTitle:this.blogTitle,
                  profileId: this.profileId,     
                  date: timestamp,
                });
                await this.$store.dispatch("getPost")
                this.loading=false;
                this.$router.push({ name: "ViewBlog", params: {blogid: database.id }});
              } catch (err) {
                console.log(err.message);
                
              }
            }
          );
        }
        else{
        this.error = true;
        this.errorMsg = "Please ensure you uploaded a cover photo!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
        }
      }
      else{
      this.error = true;
      this.errorMsg = "Please ensure Blog Title and Blog Post has been filled!";
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
      }
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        return this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        return this.$store.commit("newBlogPost", payload);
      },
    },
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    padding: 12px 24px;
    border-radius: 20px;
    color: #fff;
    text-decoration: none;
    background-color: #303030;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  //error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      display: flex;
      position: relative;
      margin-left: 16px;
      flex: 1;

      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
        color: #000;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>