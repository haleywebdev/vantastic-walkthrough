import { useEffect, useState } from "react"
import { Beds } from "./Beds"
import { Floors } from "./Floors"
import { Windows } from "./Windows"

export const Vantastic = () => {
    const [userChoice, setUserChoice] = useState({
        floor: 0,
        bed: 0,
        window: 0
    })
    const [totalCost, updateTotalCost] = useState(0)

    /*
        Single responsibility: Calculate cost of chosen options
    */
    useEffect(
        () => {
            if (userChoice.floor > 0 && userChoice.bed > 0 && userChoice.window > 0) {
                updateTotalCost( userChoice.floor + userChoice.bed + userChoice.window )
            }
        },
        [userChoice]
    )


    return (
        <>
            <div>
                Total cost of choices: {totalCost.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2})}
            </div>

            <Floors choices={userChoice} setter={setUserChoice} />
            <Windows choices={userChoice} setter={setUserChoice} />
            <Beds choices={userChoice} setter={setUserChoice} />
        </>
    )
}
