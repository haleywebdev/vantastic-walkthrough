import { useEffect, useState } from "react"

export const Floors = ({choices, setter}) => {
    const [floors, setFloors] = useState([])

    /*
        Single responsibility: Observe floors transient state
    */
    useEffect(
        () => {
            console.log("Floors state changed", floors)
        },
        [floors]
    )

    useEffect(
        () => {
            return fetch(`http://localhost:8088/floors`)
                .then(response => response.json())
                .then(
                    (theFloorsArrayOfObjectsThatIWantForChris) => {
                        setFloors(theFloorsArrayOfObjectsThatIWantForChris)
                    }
                )
        },
        []
    )

    return (
        <>
            <div>
                <h2>Floors</h2>
                {
                    floors.map(floor => {
                        return <button
                                    onClick={
                                        () => {
                                            const copy = {...choices}
                                            copy.floor = floor.price
                                            setter(copy)
                                        }
                                    }
                                    className="floor"
                                    key={floor.id}>{floor.type}</button>
                    })
                }
            </div>

        </>
    )
}
