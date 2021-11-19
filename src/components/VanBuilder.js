import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
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
    const history = useHistory()

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
                <input type="text"
                    onChange={
                        (event) => {
                            const copyofState = {...userChoice}
                            copyofState.vanity = event.target.value
                            setUserChoice(copyofState)
                        }
                    }
                    id="vanity"
                    className="form-control"
                    required autoFocus />


                <label htmlFor="neededBy"> Needed by date </label>
                <input type="date"
                    onChange={
                        (event) => {
                            const copyofState = {...userChoice}
                            copyofState.neededBy = event.target.value
                            setUserChoice(copyofState)
                        }
                    }
                    id="neededBy"
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
                        vanityName: userChoice.vanity,
                        neededBy: userChoice.neededBy,
                        userId: parseInt(localStorage.getItem("vanner"))
                    })
                })
                    .then(response => response.json())
                    .then(() => {
                        history.push("/purchases")
                    })

            }}>Complete Purchase</button>
        </>
    )
}
