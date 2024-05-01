<template>
  <div class="post-view" >
    <div class="container QuillWrapper" v-if="currentBlog">
      <h2>{{this.currentBlog[0]?.blogTitle}}</h2>
      <h4>Posted on: {{new Date(this.currentBlog[0]?.blogDate).toLocaleString('en-us',{dateStyle:'long'})}}</h4>
      <img :src="this.currentBlog[0]?.blogCoverPhoto" alt="">
      <div class="post-content ql-editor" v-html="this.currentBlog[0]?.blogHTML"></div>
    </div>
    <div v-else>
    Loading blog post...
    
  </div>
  </div>
</template>

<script>
export default {
name:'ViewBlog',
data(){
  return{
    currentBlog:null
  }
},
async mounted(){
  try{await this.$store.dispatch('getPost');
  this.currentBlog = await this.$store.state.blogPosts.filter(post=>{
    return post.blogId === this.$route.params.blogid;
    
  })
  // console.log(new Date(this.currentBlog[0]?.blogDate).toLocaleString('en-us',{dateStyle:'long'}));
   }
 
  catch(err){
    console.log(err);
  }
}

}
</script>

<style lang="scss">
.post-view{
  h4{
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>