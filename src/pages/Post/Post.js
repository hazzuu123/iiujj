import { useState } from 'react'
import styles from './Post.module.css'
import axios from 'axios'

/** 동아리 글 작성 */
const Post = () => {
    const [file, setFile] = useState('')

    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
    }

    const handleWriteUpload = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', '제목');
        formData.append('content', '내용');
        formData.append('image', file);

        try {
            const response = await axios.post('http://3.39.253.182:8080/app/post/write-post', formData,
                {
                    headers: { Authorization: token, },
                }
            );
        } catch (error) {
            console.error('글작성 요청 실패:', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleWriteUpload} encType='multipart/form-data'>
                <div>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleFileSelect}
                    />
                </div>
                <button type='submit'>업로드</button>
            </form>
        </div>
    )
}

export default Post
