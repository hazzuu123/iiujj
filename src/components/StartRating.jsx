import { FaStar } from "react-icons/fa";
import { useState } from "react";
/** 하나의 별을 채우는 컴포넌트 */
const Star = ({ selected = false, onSelect = f => f }) => (
    <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect}></FaStar >
)
/** 별점 시스템 */
const createArray = length => [...Array(length)]

const StarRating = ({ totalStars = 5 }) => {
    const [selectedStars, setSelectedStars] = useState(3)
    return (
        <>
            {createArray(totalStars).map((n, i) =>
                <Star key={i}
                    selected={selectedStars > i}
                />
            )}
            <p>{selectedStars}/{totalStars}</p>
        </>
    )
}

const ClickStarRating = () => {
    const [selectedStars, setSelectedStars] = useState(0)

    // 별을 찍는다.
    return (
        <>
            {[...Array(5)].map((a, i) => (
                <Star
                    key={i}
                    selected={selectedStars > i}
                    onSelect={() => { setSelectedStars(i + 1) }}
                />

            ))}
            <p>{selectedStars}/5</p>
        </>
    )

}

export default ClickStarRating