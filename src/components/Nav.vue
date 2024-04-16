<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'home' }"
          >Fireblogs</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" to="#">Home</router-link>
          <router-link class="link" to="#">Blogs</router-link>
          <!-- <router-link class="link" to="#">Create Post</router-link> -->
          <router-link class="link" to="#">Login/Register</router-link>
        </ul>
      </div>
    </nav>
    <svg @click='toggleMobileNav' v-show="mobile" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bars" class="svg-inline--fa fa-bars fa-w-14 menu-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg>
    <!-- <img
      src="@/assets/Icons/bars-regular.jpg"
      alt=""
      class="menu-icon"
    /> -->
    <Transition name="mobile-navs">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="links" to="#">Home</router-link>
        <router-link class="links" to="#">Blogs</router-link>
        <!-- <router-link class="links" to="#">Create Post</router-link> -->
        <router-link class="links" to="#">Login/Register</router-link>
      </ul>
    </Transition>
  </header>
</template>

<script>
// import MenuIcon from "../assets/Icons/bars-regular.jpg";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Nav",
  components: {
    // MenuIcon,
  },
  data(){
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    }
  },
  created(){
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen(){
       this.windowWidth = window.innerWidth;
       if (this.windowWidth <=750){
          this.mobile = true;
          return;
       }
       this.mobile = false;
       this.mobileNav = false;
       return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 1px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
    &:hover {
      color: #1eb8b8;
    }
  }
  nav {
    display: flex;
    padding: 25px 0;
    .branding {
      display: flex;
      align-items: center;
      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      ul {
        margin-right: 32px;
        .link {
          margin-right: 32px;
          .link:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;

  }
      .mobile-nav{
       padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
     .link{
      padding: 15px 0;
      color: #fff;
     }
    }
    .mobile-navs-enter-active,
    .mobile-navs-leave-active{
      transition: all 1s ease;
    }
    .mobile-navs-enter-from{
      transform: translateX(-250px);
    }
    .mobile-navs-enter-to {
      transform: translateX(0);
    }
    .mobile-navs-leave-to{
      transform: translateX(-250px);
    }
}
</style>
