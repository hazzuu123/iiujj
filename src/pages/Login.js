import { useRef, useState, useEffect } from "react"
import axios from "axios"

import styles from './Login.module.css'

/** Login 컴포넌트 */
const Login = () => {
    const inputRef = useRef(null)
    const [username, setUsername] = useState('')  // 사용자 아이디
    const [password, setPassword] = useState('')  //비밀번호
    const [loginError, setLoginError] = useState(false)  // 로그인 실패여부
    const [errorMessage, setErrorMessage] = useState(''); // 로그인 실패 메세지

    useEffect(() => {
        // 컴포넌트가 마운트되면 아이디 입력 필드에 자동으로 포커스를 준다.
        inputRef.current.focus()
    }, [])

    /** 로그인 버튼 클릭 시 */
    const handleLogin = async (event) => {
        event.preventDefault();

        // 여기에서 로그인 처리 로직을 구현
        // Login 컴포넌트로 로그인 처리

        const postData = {
            'email': username,
            'password': password
        }


        try {
            // 로그인을 서버에 요청하고 그에 따른 결과 실행
            const response = await handleLoginRequest(postData);
            console.log('로그인 요청 성공: ', response.data)
            // 응답 코드에 따라 메세지 출력 및 로그인 폼 초기화
            if (response.data.code === 1000) {
                // 로그인에 성공할 시
                setLoginError(false)
                // 로그인 폼 초기화
                setUsername('')
                setPassword('')


                const accessToken = response.data.result.replace('Bearer ', '');
                // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                // accessToken을 axios.defaults.headers.common에 저장하지만, 보안상의 이유로 브라우저 내장 저장소(localStorage, cookie)에는 저장하지 않는 것이 중요하다.

            } else if (response.data.code === 3201) {
                setLoginError(true)
                setErrorMessage(response.data.message)
            } else if (response.data.code === 3202) {
                setLoginError(true)
                setErrorMessage(response.data.message)
            }
        } catch (error) {
            console.log('로그인 요청 실패:', error)
        }


    };

    // 서버에 로그인 요청
    const handleLoginRequest = async (postData) => {
        return await axios.post('http://3.39.253.182:8080/app/member/sign-in', postData)
    }

    /** 아이디 입력 시 */
    const handleInputUsername = (event) => {
        setUsername(event.target.value)
    }
    /** 패스워드 입력 시 */
    const handleInputPassword = (event) => {
        setPassword(event.target.value)
    }
    return (
        <div className="App">
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='id'>ID  </label>
                    <input
                        type='text'
                        id='id'
                        placeholder='ID'
                        onChange={handleInputUsername}
                        value={username}
                        ref={inputRef}  // 아이디 입력 필드에 자동 포커스를 설정
                    />
                </div>
                <div>
                    <label htmlFor='password'>PASSWORD </label>
                    <input
                        type='password'
                        id='password'
                        placeholder='PASSWORD'
                        onChange={handleInputPassword}
                        value={password}
                    />
                </div>
                <button type='submit'>LOGIN</button>
            </form>
            {/* 로그인에 실패하면 경고 텍스트를 보여준다. */}
            <div>
                {loginError && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                )}
            </div>
        </div>
    );
}

export default Login;