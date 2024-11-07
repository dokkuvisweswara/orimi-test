import { create } from 'zustand'

export const useStore = create((set) => ({
    config: '',
    setConfig: (newData: any) => set({ config: newData }),
    counter: 1,
    setCounter: (newData: any) => set({ counter: newData + 1  }),
    allPlaylistData: [],
    setAllPlaylistData: (newData: any) => set({allPlaylistData: newData}),
  }));

  export const useStoreConfig = create((set) => ({
    localConfig: '',
    setLocalConfig: (newData: any) => set({ localConfig: newData }),
    deckingConfigObject: '',
    setDeckingConfigObject: (newData: any) => set({ deckingConfigObject: newData }),
  
  }));


  export const useStoreUser = create((set) => ({
    isUserPresent: false,
    setIsUserPresent: (isUser: any) => set({ isUserPresent: isUser}),
    userDetails: {},
    setUserDetails: (newData: any) => set({ userDetails: newData}),
    subscriptionDetails: [],
    setSubscriptionDetails: (response : any) => set({ subscriptionDetails : response}), 
  }));

  export const useStorePlayer = create((set) => ({
    isSelectedContent: false,
    setIsSelectedContent: (content: any) => set({ isSelectedContent: content}),
    getAvaibility: null,
    setAvaibility: (avai: any) => set({ getAvaibility: avai}),
    contentSelectedByPlayBtn: false,
    setContentSelectedByPlayBtn: (content: any) => set({ contentSelectedByPlayBtn: content}),
  }));

  export const usePlayList = create((set) => ({
    primaryPlayList: [],
    setPrimaryPlayList: (playList: any) => set({ primaryPlayList: [...playList]}),
  }))

  export const useStoreAddToQue = create((set: any) => ({
    addToQueContent: [],
    setAddToQueContent: (newObject: any) => set((state: any) => ({ addToQueContent: [...state.addToQueContent, ...newObject] })),
    removeFromQueContent: (newObject: any) => set((state: any) => ({ addToQueContent: state.addToQueContent.slice(1) })),

  }));  
  
  export const useStoreContent = create((set) => ({
    contentData: null,
    setContentData: (newData: any) => set({ contentData: newData})
  }))

  export const useSoreUtility = create((set) => ({
    isSideNavActive: true,
    setIsSideNavActive: (newData: any) => set({ isSideNavActive: newData}),
    isToggleActive: true,
    setIsToggleActive: (newData: any) => set({ isToggleActive: newData})
  }))
  export const useStoreRecallPlaylist = create((set) => ({
    recallPlaylist: 1,
    setRecallPlaylist: (newData: any) => set({ recallPlaylist: newData + 1}),
  }))


  export const useStorePlayerTinyLoader = create((set) => ({
    tinyLoader: true,
    setConfig: (loader: any) => set({ tinyLoader: loader })
  }));

  export const useSelectedIndexFromPlaylist = create((set) => ({

    selectedIndexPlaylist: 0,
    setSelectedIndexPlaylist: (index: any) => set({ selectedIndexPlaylist: index})
  }))


  export const useStoreSearchQuery = create((set) => ({
    storeQuery: null,
    setStoreQuery: (item: any) => set({ storeQuery: item}),
    isSearch:null,
    setIsSearch: (item:any)=> set({isSearch:item})
  }))  
  
  export const usePlayListSongsCount = create((set)=> ({    
    playListSongsCount: 0,
    setPlayListSongsCount: (newData: any) => set({playListSongsCount: newData}),
    playListSongsDuration:0,
    setPlayListSongsDuration:(newData:any) => set({playListSongsDuration:newData})
  }))
  export const useStoreFavourite  = create((set)=> ({    
    isFavouriteRemoved: null,
    setIsFavouriteRemoved: (newData: any) => set({isFavouriteRemoved: newData})
  }))

  export const useStoreUpdatePlayListSongs = create((set)=> ({
    updatePlayListSongs: [],
    setUpdatePlayListSongs: (Content: any) => set({updatePlayListSongs: [...Content]})

  }))

  export const useCurrentProfileDetails = create((set) => ({
    updateProfileData: null,
    setUpdateProfileData: (profile: any) => set({updateProfileData: profile})
  }))

  export const useFirebaseLoginStore = create((set)=>({
    isFirebaseLogin:null,
    setIsFirebaseLogin: (newData:any) => set({isFirebaseLogin:newData})
  }))
  
  export const useSubscriberDetails = create((set) =>({
    subscriberData: null,
    setSubscriberData: (data: any) => set({subscriberData: data})
  }))

  export const useStoreProfileListData = create((set) =>({
    profileListDataData: null,
    setProfileListDataData: (data: any) => set({profileListDataData: data})
  }))

  export const useStoreMakeSaveDetailLists = create((set) =>({
    detailListSave: null,
    setDetailListSave: (data: any) => set({detailListSave: data})
  }))

  export const useStoreCollaboratorList = create((set) =>({
    collaboratorList: null,
    setCollaboratorList: (data: any) => set({collaboratorList: data})
  }))

  export const useStoreLanguageDataset = create((set) =>({
    getStoreLanguageDataset: '',
    setStoreLanguageDataset: (data: any) => set({storeLanguageDataset: data})
  }))