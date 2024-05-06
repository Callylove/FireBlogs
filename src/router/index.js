import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Blogs from '../views/Blogs.vue'
import MainBlogs from '../views/MainBlogs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import CreatePost from '../views/CreatePost.vue'
import BlogPreview from '../views/BlogPreview.vue'
import ViewBlog from '../views/ViewBlog.vue'
import EditBlog from '../views/EditBlog.vue'
import ErrorPage from '../views/404Page.vue'
import { auth } from "../firebase/firebaseInit";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta:{
      title:'Home',
      requiresAuth:false
    }
  },
  {
    path: '/main-blogs',
    name: 'MainBlogs',
    component: MainBlogs,
     meta:{
      title:'Main Blogs',
      requiresAuth:false
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
     meta:{
      title:'Blogs',
      requiresAuth:false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
     meta:{
      title:'Login',
      requiresAuth:false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
     meta:{
      title:'Register',
      requiresAuth:false
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
     meta:{
      title:'Forgot Password',
      requiresAuth:false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
     meta:{
      title:'Profile',
      requiresAuth:true,
 
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
     meta:{
      title:'Admin',
      requiresAuth:true,
      requiresAdmin:true
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
     meta:{
      title:'Create Post',
      requiresAuth:true,
      requiresAdmin:true
    }
  },
  {
    path: '/post-preview',
    name: 'BlogPreview',
    component: BlogPreview,
     meta:{
      title:'Preview Blog Post',
      requiresAuth:true,
      requiresAdmin:true
    }
  },
  {
    path: '/view-blog/:blogid',
    name: 'ViewBlog',
    component: ViewBlog,
     meta:{
      title:'View Blog Post',
      requiresAuth:false,
    }
  },
  {
    path: '/edit-blog/:blogid',
    name: 'EditBlog',
    component: EditBlog,
     meta:{
      title:'Edit Blog Post',
      requiresAuth:true,
      requiresAdmin:true
    }
  },
  {
    path:"/:catchall(.*)*",
    name:'404Page',
    component: ErrorPage,
    meta:{
      title:'404 Page',
      requiresAuth:false,
      // requiresAdmin:true
    }

  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  document.title = `${to.meta.title} | FireBlog`
  next() 
})
router.beforeEach(async (to,from,next)=>{
  const trustedAdmin = ["paul@gmail.com"]
  let user = auth.currentUser;
//   if(user){

//   console.log(combinedClaims);
// }
  // console.log(token);

 
  // let user = auth.currentUser;
  // let Admin = null;
  // if (user){
  //   let token = await user.getIdTokenResult()
  //   Admin = token.claims.admin
  // }
  if(to.matched.some((res)=>res.meta.requiresAuth)){
    if (user){
      if(to.matched.some((res)=>res.meta.requiresAdmin)){
        const token =  user.getIdTokenResult();
        const isAdminClaims={isAdmin:true};
        const combinedClaims = Object.assign({},token.claims,isAdminClaims)
        if (trustedAdmin.includes(user.email)){
          console.log(trustedAdmin.includes(user.email));
          
         try{ const newToken =  user.getIdToken(combinedClaims);
          localStorage.setItem('firebaseToken', newToken)}
          catch(error){
              console.log(error);
          }
      }
        if(combinedClaims){
          return next()
        }
        return next({name:'Home'})
      }
      return next()
    }
    return next({name:'Home'})
  }
  return next()
})
export default router
