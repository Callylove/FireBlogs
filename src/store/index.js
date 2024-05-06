import { createStore } from 'vuex'
import { auth } from "../firebase/firebaseInit";
// import db from "../firebase/firebaseInit";
// import * as firebase from "firebase/app";
import 'firebase/auth';
import { db} from "../firebase/firebaseInit";
// import { collection, query,getDocs } from 'firebase/firestore';
import { onAuthStateChanged} from "firebase/auth";
import { collection, getDocs, query,where,updateDoc,doc,orderBy, deleteDoc} from "firebase/firestore";


// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { onAuthStateChanged} from 'firebase/auth';

const store = createStore({
  state() {
    return {
    
   
    blogPosts:[],
    postLoaded:null,
    blogHTML:'Write your blog title here...',
    blogTitle:'',
    blogPhotoName:'',
    blogPhotoFileURL:null,
    blogPhotoPreview:null,
    editPost:null,
    user:null,
    profileEmail:null,
    profileFirstName:null,
    profileLastName:null,
    profileUsername:null,
    profileId:null,
    profileInitials:null,
    isAdmin:null,
  }
  },
  getters: {
    blogPostsFeed(state){
      return state.blogPosts.slice(0,2)
    },
    blogPostsCards(state){
      return state.blogPosts.slice(2,6)
    }
  },
  mutations: {
    checkAdmin(state,payload){
      state.isAdmin=payload;
    },
    newBlogPost(state,payload){
      state.blogHTML=payload
    },
    updateBlogTitle(state,payload){
      state.blogTitle=payload
    },
    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview
    },
    fileNameChange(state,payload){
      state.blogPhotoName = payload
    },
    createFileURL(state,payload){
      state.blogPhotoFileURL = payload
    },
    toggleEditPost(state,payload){
      state.editPost = payload;
    },
    filterBlogPost(state,payload){
      this.blogPosts = state.blogPosts.filter(post=>post.blogId !== payload)
    },
    setBlogState(state,payload){
      state.blogTitle = payload.blogTitle,
      state.blogHTML = payload.blogHTML,
      state.blogPhotoFileURL = payload.blogCoverPhoto,
      state.blogPhotoName = payload.blogCoverPhotoName
    },
    updateUser(state,payload){
      state.user=payload
    },
    setProfileInfo(state,doc){
      state.profileId=auth.currentUser.uid
      state.profileEmail=doc.email;
      state.profileFirstName=doc.firstName;
      state.profileLastName=doc.lastName;
      state.profileUsername=doc.username;
      // console.log(state.profileId);
    },
    
    setProfileInitials(state) {
      const initials = [
        state.profileFirstName?.charAt(0)?.toUpperCase(),
        state.profileLastName?.charAt(0)?.toUpperCase()
      ].filter(initial => initial); // Filter out undefined values
      state.profileInitials = initials.join("");
    }
    ,
    changeFirstName(state,payload){
      state.profileFirstName=payload;
    },
    changeLastName(state,payload){
      state.profileLastName=payload;
    },
    changeUsername(state,payload){
      state.profileUsername=payload;
    }
  },
  actions: {
    async getCurrentUser({commit}){

    onAuthStateChanged(auth, async (user)=>{
      if(user){
      const q = query(collection(db, "users"),where("email", "==", user?.email))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      // console.log(userData);
      // console.log(auth.currentUser.uid);
      commit('setProfileInfo', userData);
      commit("setProfileInitials"); 
    });
  }
    }); 
    },
    async getPost({state}){
      const docRef = await collection(db,"blogPosts")
      const q =  query(docRef,orderBy('date','desc'))
      const results = getDocs(q)
      results.then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
        
          if(!state.blogPosts.some(post=>{post.blogId === doc.id})){
            const data={
              blogId: doc.data().blogId,
              blogHTML: doc.data().blogHTML,
              blogCoverPhoto: doc.data().blogCoverPhoto,
              blogTitle:doc.data().blogTitle,
              blogDate: doc.data().date,
              blogCoverPhotoName: doc.data().blogCoverPhotoName,
            };
            state.blogPosts.push(data)
            console.log(state.blogPosts.blogHTML);
          }
          
        });
      })
      state.postLoaded = true;
      // console.log(state.blogPosts);
    },
    async updatePost({commit,dispatch}, payload){
      commit("filterBlogPost",payload);
      await dispatch("getPost");
    },
    async deletePost({commit},payload){
      // const getPost = await doc(db,"blogPost",payload);
      await deleteDoc(doc(db,"blogPosts",payload));
      commit("filterBlogPost",payload)
    },
    async updateUserSettings({commit,state}){
    
      // await doc(db,'users', state.profileId)
      
      onAuthStateChanged(auth, async (user)=>{
        // const q = query(collection(db, "users"),where("email", "==", user?.email))
        if(!user) return;
        
        const usersQuery = query(collection(db, "users"), where("email", "==", user?.email));
        const querySnapshot = await getDocs(usersQuery);
        const userDoc = querySnapshot.docs[0];
        // console.log(userDoc);
        const userDocRef = doc(db, "users", userDoc.id);
        console.log(userDoc.id);

     try{ await updateDoc(userDocRef,{
        firstName: state.profileFirstName,
        lastName:state.profileLastName,
        username:state.profileUsername
      })
      
      commit("setProfileInitials");
    }catch(error){
      console.log('err',error);
    }
  })}
  },
  modules: {
  }
})
export default store