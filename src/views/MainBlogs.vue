<!-- eslint-disable vue/multi-word-component-names -->
<template>
 <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" >
      </div>
      
        <MainBlogCard :post="post" v-for="(post,index) in sampleBlogCards" :key="index"/>
    </div>
   </div>
</template>

<script>
import MainBlogCard from '../components/MainBlogCard.vue'
export default {
// eslint-disable-next-line vue/multi-word-component-names
name: 'blog',
components: {MainBlogCard},
data(){
    return{
        sampleBlogCards: [
        {
          blogTitle: "Blog Card #1",
          blogCoverPhoto: "stock-1",
          blogDate: "20 April, 2024",
        },
        {
          blogTitle: "Blog Card #2",
          blogCoverPhoto: "stock-2",
          blogDate: "21 April, 2024",
        },
        {
          blogTitle: "Blog Card #3",
          blogCoverPhoto: "stock-3",
          blogDate: "23 April, 2024",
        },
        {
          blogTitle: "Blog Card #4",
          blogCoverPhoto: "stock-4",
          blogDate: "24 April, 2024",
        },
      ],
    }
},
computed: {
        editPost:{
          get(){
            return this.$store.state.editPost;
          },
          set(payload){
            this.$store.commit('toggleEditPost', payload)
          }
        },
        
      },
beforeUnmount() {
          this.$store.commit('toggleEditPost', false)
        }
}
</script>

<style lang="scss" scoped>
.blog-cards{
  position:relative;
  .toggle-edit{
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;
    span{
      margin-right: 16px;
    }
    input[type='checkbox']{
  position: relative;
  border: none;
  appearance: none;
  background-color: #fff;
  outline: none;
  width: 80px;
  height: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}
input[type='checkbox']:before{
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background-color: #303030;
  transform: scale(1.1);
  transition: 750ms ease all;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}
input:checked[type='checkbox']:before{
  background: #fff;
  left:52px;
}
  }
}

</style>