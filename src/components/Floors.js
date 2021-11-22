import { useEffect, useState } from "react"

export const Floors = ({ choices, setter }) => {
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
                <select onChange={
                    (changeEvent) => {
                        const copy = { ...choices }
                        copy.floor = floors.find(fll => fll.id === parseInt(changeEvent.target.value)) || {}
                        setter(copy)
                    }
                }>
                    <option value="0">Please choose a floor type...</option>
                    {
                        floors.map(floor => {
                            return <option
                                className="floor"

                                value={floor.id}
                                key={floor.id}>{floor.type}</option>
                        })
                    }
                </select>
            </div>

        </>
    )
}
