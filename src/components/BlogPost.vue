<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="blog-wrapper" :class="{'no-user':!user}">
    <div class="blog-content">
        <div>
            <h2 v-if="post.welcomeScreen" >{{post.title}}</h2>
           
            <h2 v-else>{{post.blogTitle}}</h2>
            <p v-if="post.welcomeScreen" >{{post.blogPost}}</p>
            <p class="content-preview" v-else v-html="post.blogHTML"></p>
            <router-link class="link link-light" v-if="post.welcomeScreen" :to="{name:'Login'}"> Login/Register<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14 arrow arrow-light" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg></router-link>
            <router-link v-else  class="link" :to="{name:'ViewBlog',params:{blogid:this.post.blogId}}">
              View The Post<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14 arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>
            </router-link>
            
        </div>
       
    </div>
     <div class="blog-photo">
          <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="">
          <img v-else :src="post.blogCoverPhoto" alt="">
        </div>
  </div>
</template>

<script>
export default {
    name: 'BlogPost',
    props:['post'],
    computed:{
    user(){
      return this.$store.state.user;
    }
  }

}
</script>

<style lang="scss">
.blog-wrapper{
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 1px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px){
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
  .blog-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media (min-width: 700px){
      order: 1
    }
    @media (min-width: 800px){
      flex: 3;
    }
    div{
      max-width: 375px;
      padding: 72px 24px;
      @media (min-width: 700px){
      padding: 0 24px;
      }
      h2{
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px){
        font-size: 40px;
    }
      }
      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }
      .content-preview{
        font-size: 13px;
        max-height: 24px;
        width: 250px;
        white-space: nowrap;
        overflow: hodden;
        text-overflow: ellipsis;
      }
      .link{
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: .5s ease-in all;
        &:hover {
          border-bottom-color: #303030;
        }
      }
      .link-light{
        &:hover {
          border-bottom-color: #fff;
        }
      }
    }
  }
  .blog-photo{
    order: 1;
    flex: 3;
    box-shadow: 0 4px 1px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    @media (min-width: 700px){
      order: 2;
    }
    @media (min-width: 800px){
      flex: 4;
    }
    img{
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &:nth-child(even){
    .blog-content{
      order: 2;
    }
    .blog-photo{
      order: 1;
    }
  }
}
.no-user:first-child{
  .blog-content{
    background-color: #303030;
    color: #fff;
  }
}
</style>