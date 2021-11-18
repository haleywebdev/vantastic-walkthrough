import { useEffect, useState } from "react"
import { Beds } from "./Beds"
import { Floors } from "./Floors"
import { Windows } from "./Windows"

export const VanBuilder = () => {
    const [userChoice, setUserChoice] = useState({
        floor: {},
        bed: {},
        window: {},
        vanity: "",
        neededBy: Date.now()
    })
    const [totalCost, updateTotalCost] = useState(0)

    /*
        Single responsibility: Calculate cost of chosen options
    */
    useEffect(
        () => {
            if (userChoice.floor?.price && userChoice.bed?.price && userChoice.window?.price) {
                updateTotalCost(userChoice.floor.price + userChoice.bed.price + userChoice.window.price)
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
                    minimumFractionDigits: 2
                })}
            </div>

            <fieldset>
                <legend>Van options</legend>
                <Floors choices={userChoice} setter={setUserChoice} />
                <Windows choices={userChoice} setter={setUserChoice} />
                <Beds choices={userChoice} setter={setUserChoice} />

            </fieldset>

            <fieldset>
                <legend>Personalization</legend>
                <label htmlFor="vanity"> Name your van </label>
                <input type="email"
                    id="vanity"
                    onChange={evt => {
                        const copy = {...userChoice}
                        copy.vanity = evt.target.value
                        setUserChoice(copy)
                    }}
                    className="form-control"
                    required autoFocus />
                <label htmlFor="inputEmail"> Needed by date </label>
                <input type="date"
                    onChange={evt => {
                        const copy = {...userChoice}
                        copy.neededBy = evt.target.value
                        setUserChoice(copy)
                    }}
                    className="form-control"
                    required />

            </fieldset>

            <button onClick={() => {
                return fetch(`http://localhost:8088/vans`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        floorId: userChoice.floor.id,
                        windowId: userChoice.window.id,
                        bedId: userChoice.bed.id,
                        neededBy: userChoice.neededBy,
                        vanityName: userChoice.vanity,
                        userId: parseInt(localStorage.getItem("vanner"))
                    })
                })
                    .then(response => response.json())
                    .then(() => {

                    })

            }}>Complete Purchase</button>
        </>
    )
}
