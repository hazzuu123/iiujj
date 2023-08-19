import { useState } from "react"
import DaumPostcode from "react-daum-postcode"


/** 주소 검색 */
const GetLocation = () => {
    const [openPostcode, setOpenPostcode] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState({
        roadAddress: "",
        jibunAddress: "",
        zonecode: ""
    })
    const handleClickButton = (event) => {
        event.preventDefault()
        setOpenPostcode(!openPostcode)
    }

    const selectAddress = (data) => {
        console.log(`data.roadAddress: ${data.roadAddress}`)    // 도로명주소
        console.log(`data.jibunAddress: ${data.jibunAddress}`)  // 지번주소
        console.log(`data.zonecode: ${data.zonecode}`)  //우편번호
        setSelectedAddress({
            roadAddress: data.roadAddress,
            jibunAddress: data.jibunAddress,
            zonecode: data.zonecode
        })
        setOpenPostcode(false) // 주소를 선택한 후에 모달을 닫기 위해 추가
    }

    return (
        <div>
            {/* 주소를 담는 부분 */}
            <label htmlFor="juso"></label>
            {/* 선택한 주소를 input에 표시 */}
            <input
                type="text"
                placeholder="주소를 선택하세요"
                value={selectedAddress.roadAddress}
                readOnly // 사용자가 직접 수정할 수 없도록 읽기 전용으로 설정
            />
            <button onClick={handleClickButton}>주소 검색</button>

            {openPostcode &&
                <DaumPostcode
                    style={{ width: '500px', height: '500px' }}
                    onComplete={selectAddress} // 우편번호 검색 결과 목록을 클릭했을 때 실행되는 콜백 함수
                    autoClose={false}           // 주소를 선택한 경우 사용되는 DOM을 제거하여 자동 닫힘 설정(true: 자동닫힘)
                //defaultQuery="판교역로 235" // 기본적으로 입력되어있는 검색어
                />}
        </div>
    )
}

export default GetLocation