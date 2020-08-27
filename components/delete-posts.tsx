import { useDeletePosts } from '../apollo/hooks'

function DeletePosts() {
  const [deletePosts] = useDeletePosts()
  return <button onClick={() => deletePosts()}>Delete all</button>
}

export { DeletePosts }
