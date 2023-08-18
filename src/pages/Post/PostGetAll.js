import axios from "axios"
import { useEffect } from "react"
const PostGetAll = () => {
    useEffect(() => {
        const postGetAll = async () => {
            try {
                const response = await axios.get('http://3.39.253.182:8080/app/post/getAll')
                console.log('전체 글 불러오기 성공', response.data)

            } catch {
                console.log('전체 글 불러오기 실패')
            }
        }

        postGetAll()

    }, [])
}

export default PostGetAll;