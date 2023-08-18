import React, { useEffect, useRef } from "react";

const Map = () => {
    const mapRef = useRef(null)
    useEffect(() => {
        const script = document.createElement("script");

        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=35dd98d3b2bbe5ed569823f92e91b928&autoload=false`; // Kakao Maps SDK 로드 후 지도 객체에 접근 할 수 있도록 'autoload=false' 지정
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                // Kakao Maps SDK 로드 후 실행할 내용
                const mapOptions = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3,
                };
                const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

                // // 마커 표시하기
                // createMarker(map)
                // 마커와 인포윈도우 표시하기
                createInfoWindow(map)
            });
        };

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거
            document.head.removeChild(script);
        };
    }, []);

    /** 마커 생성하기 */
    const createMarker = (map) => {
        // 마커가 표시될 위치
        const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667)
        // 마커를 생성
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        })

        //지도에 마커를 표시
        marker.setMap(map)


        return marker

    }

    /** 마커와 인포 윈도우 생성하기 */
    const createInfoWindow = (map) => {
        const marker = createMarker(map)

        // 인포윈도우가 표시될 위치
        const iwPosition = new window.kakao.maps.LatLng(33.450701, 126.570667)
        // 인포윈도우에 표출될 내용
        const iwContent =
            `<div style="white-space: nowrap">
                <div>사이코우스시 쌍문점</div>
                <div>서울 도봉구 방학로7길 99</div>
                <div>02-999-4298</div>
            <div>`
        // removable 속성을 true로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시된다
        const iwRemovable = true

        //인포윈도우를 생성
        const infoWindow = new window.kakao.maps.InfoWindow({
            // map: map, // 인포윈도우가 표시될 지도
            position: iwPosition,
            content: iwContent,
            removable: iwRemovable

        })

        infoWindow.open(map, marker)
    }

    return <div
        id="map"
        style={{
            width: "600px",
            height: "500px"
        }}
        ref={mapRef}
    ></div>;
};

export default Map;
