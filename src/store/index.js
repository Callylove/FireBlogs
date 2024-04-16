import { createStore } from 'vuex'

export default createStore({
  state: {
    
    sampleBlogCards: [
      {
        blogTitle: 'Blog Card #1', blogCoverPhoto: 'stock-1', blogDate:'May 1, 2024'
      },
       {
        blogTitle: 'Blog Card #2', blogCoverPhoto: 'stock-2', blogDate:'May 1, 2024'
      },
       {
        blogTitle: 'Blog Card #3', blogCoverPhoto: 'stock-3', blogDate:'May 1, 2024'
      },
       {
        blogTitle: 'Blog Card #4', blogCoverPhoto: 'stock-4', blogDate:'May 1, 2024'
      }
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
