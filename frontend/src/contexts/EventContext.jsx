import { createContext, useContext, useReducer, useEffect } from 'react'

import contentsApi from '../api/contents'

const ContentsContext = createContext()

const localContentList = []
const serverContentList = []

const localContentsReducer = (localContentList, action) => {
  switch (action.type) {
    case 'localContent/create':
      const objectUrl = window.URL.createObjectURL(action.payload.blobData)
      const newLocalContent = {
        filePath: action.payload.filePath,
        objectUrl: objectUrl,
        etag: action.payload.etag,
        duration: 5_000,
      }
      return [...localContentList, newLocalContent]
    case 'localContent/delete':
      return localContentList.filter((localContent) => {
        if (localContent.filePath !== action.payload) {
          return true
        } else {
          window.URL.revokeObjectURL(localContent.objectUrl)
          return false
        }
      })
    default:
      return localContentList
  }
}

const serverContentsReducer = (serverContentList, action) => {
  switch (action.type) {
    case 'serverContent/create':
      return [...serverContentList, action.payload]
    case 'serverContent/clear':
      return []
    default:
      return serverContentList
  }
}

const intervalSync = (dispatch) => {
  const CONTENTS_REFRESH_INTERVAL_MS = 60_000
  const sync = async () => {
    const jsonData = await contentsApi.listContents()
    console.log('json', jsonData)

    dispatch({
      type: 'serverContent/clear',
    })
    jsonData.forEach((content) => {
      dispatch({
        type: 'serverContent/create',
        payload: content,
      })
    })
    window.setTimeout(sync, CONTENTS_REFRESH_INTERVAL_MS)
  }
  sync()
}

const localContentsRefresh = (serverContents, localContents, dispatch) => {
  // サーバーから削除されたものを削除
  localContents
    .filter((lc) => {
      return (
        -1 ===
        serverContents.findIndex(
          (sc) => sc.filePath === lc.filePath && sc.etag === lc.etag,
        )
      )
    })
    .forEach((target) => {
      console.log('delete start', target.etag)
      dispatch({
        type: 'localContent/delete',
        payload: target.filePath,
      })
    })

  // サーバーに作成されたものを作成
  serverContents
    .filter((sc) => {
      return (
        -1 ===
        localContents.findIndex(
          (lc) => sc.filePath === lc.filePath && sc.etag === lc.etag,
        )
      )
    })
    .forEach((target) => {
      console.log('download start', target.etag)
      contentsApi.getContent(target.filePath).then((blobData) => {
        dispatch({
          type: 'localContent/create',
          payload: {
            filePath: target.filePath,
            blobData: blobData,
            etag: target.etag,
          },
        })
      })
    })
}

const ContentsProvider = ({ children }) => {
  const [localContents, localContentsDispatch] = useReducer(
    localContentsReducer,
    localContentList,
  )
  const [serverContents, serverContentsDispatch] = useReducer(
    serverContentsReducer,
    serverContentList,
  )

  // 定期的にサーバーのコンテンツと同期
  useEffect(() => intervalSync(serverContentsDispatch), [])

  // サーバーが更新された時にローカル側を更新
  useEffect(() => {
    localContentsRefresh(serverContents, localContents, localContentsDispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverContents])

  return (
    <ContentsContext.Provider value={localContents}>
      {children}
    </ContentsContext.Provider>
  )
}

const useContents = () => useContext(ContentsContext)

export { ContentsProvider, useContents }
