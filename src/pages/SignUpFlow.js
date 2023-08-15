import { useEffect, useRef, useState } from 'react';
import styles from './SignUpFlow.module.css'
import axios from 'axios';

const SignUpFlow = () => {
    const emailRef = useRef(null); // useRef를 통해 아이디(이메일) 입력란의 ref를 생성
    const [email, setEmail] = useState('') // 아이디(이메일)
    const [password, setPassword] = useState('') // 패스워드
    const [confirmPassword, setConfirmPassword] = useState('') // 패스워드 확인
    const [duplicateButton, setDuplicateButton] = useState(false)
    const [duplicateMessage, setDuplicateMessage] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [name, setName] = useState('') // 이름
    const [role, setRole] = useState('USER') // 선택된 역할


    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 아이디 입력란에 포커스를 줌
        emailRef.current.focus();
    }, [])





    /** 아이디 입력 시 */
    const handleEmailChange = (event) => setEmail(event.target.value)


    /** 비밀번호 입력 시 */
    const handlePasswordChange = (event) => setPassword(event.target.value)

    /** 확인용 비밀번호 입력 시 */
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    }


    /** 이름 입력 시 */
    const handleNameChange = (event) => setName(event.target.value)

    /** 역할 선택 시 */
    const handleRoleChange = (event) => setRole(event.target.value)


    /** 아이디 중복 검사 클릭 시 */
    const checkUpDuplicateEmail = async () => {

        try {
            // 서버에 아이디 중복 검사 요청
            const response = await checkUpDuplicateEmailRequest()
            // 응답 코드에 따라 사용가능한 이메일인지 확인
            if (response.data.code === 1000) {
                setDuplicateButton(true)
                setDuplicateMessage(response.data.result) // " 이메일 사용 가능 "
            } else if (response.data.code === 3200) {
                setDuplicateButton(true)
                setDuplicateMessage(response.data.message)  // " 이미 가입된 이메일 주소입니다. "
                emailRef.current.focus();   // 이메일 입력란에 다시 포커스를 줌
            }



        } catch {
            console.log('아이디 중복검사 요청 실패')
        }
    }

    /** 서버에 아이디 중복검사 요청 */
    const checkUpDuplicateEmailRequest = async () => {
        return await axios.get(`http://3.39.253.182:8080/app/member/email/${email}`)
    }


    /** 회원가입 폼 초기화 */
    const clearSignUpForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDuplicateButton(false);
        setDuplicateMessage('');
        setPasswordMatch(true);
        setName('')
    }

    /** 회원가입 버튼 입력 시*/
    const signup = async (event) => {
        event.preventDefault();

        // 패스워드와 확인 패스워드가 일치하지 않을 경우
        if (password !== confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        // 이름을 입력하지 않을 경우 
        if (name === '') {
            return;
        }

        let postData = {
            'email': email,
            'password': password,
            'name': name,
            'rold': role
        }
        // 서버에 회원가입 요청
        try {
            const response = await signupRequest(postData)
            console.log('회원가입 요청 성공', response.data)
            // 응답 코드에 따라 메세지 출력 및 회원가입 폼 초기화
            if (response.data.code === 1000) {
                clearSignUpForm();
            } else if (response.data.code === 3200) {
                setDuplicateMessage(response.data.message)
                emailRef.current.focus()    // 이메일 입력란에 포커스를 줌
            }


        } catch (error) {
            console.log('회원가입 요청 실패', error)
        }



    }

    const signupRequest = async (postData) => {
        return await axios.post('http://3.39.253.182:8080/app/member/sign-up', postData)
    }


    return (
        <div>
            <form onSubmit={signup}>
                <div>
                    <label htmlFor='email'></label>
                    <input
                        type='text'
                        id='email'
                        placeholder='EMAIL'
                        value={email}
                        onChange={handleEmailChange}
                        ref={emailRef} // 아이디 입력 필드에 자동 포커스를 설정
                    />
                    {/* 중복 검사하는 버튼  */}
                    <button type='button' onClick={checkUpDuplicateEmail}>Check Duplicate</button>
                    {duplicateButton && (
                        <p style={{ color: 'red' }}>{duplicateMessage}</p>
                    )}
                </div>
                <div>
                    <label htmlFor='password'></label>
                    <input
                        type='password'
                        id='password'
                        placeholder='PASSWORD'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                {/* 비밀번호 다시 입력하는란을 만들어줘 */}
                <div>
                    <label htmlFor='confirmPassword'></label>
                    <input
                        type='password'
                        id='confirmPassword'
                        placeholder='CONFIRM PASSWORD'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                {!passwordMatch && (
                    <p style={{ color: "red" }}>Password do not match.</p>
                )}
                <div>
                    <label htmlFor='name'></label>
                    <input
                        type='text'
                        id='name'
                        placeholder='NAME'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label htmlFor='role'></label>
                    {/* USER, CLUB, ADMIN 중에 하나를 선택 가능  */}
                    <input
                        type='radio'
                        id='user'
                        name='role'
                        value='USER'
                        checked={role === 'USER'}
                        onChange={handleRoleChange}
                    />
                    <label htmlFor='user'>USER</label>
                    <input
                        type='radio'
                        id='club'
                        name='role'
                        value='CLUB'
                        checked={role === 'CLUB'}
                        onChange={handleRoleChange}
                    />
                    <label htmlFor='club'>CLUB</label>
                    <input
                        type='radio'
                        id='admin'
                        name='role'
                        value='ADMIN'
                        checked={role === 'ADMIN'}
                        onChange={handleRoleChange}
                    />
                    <label htmlFor='admin'>ADMIN</label>

                </div>
                <button type='submit'>SIGN UP</button>
            </form>
        </div>
    )
}

export default SignUpFlow;