import { useEffect, useState } from "react"

export const Vantastic = () => {
    const [floors, setFloors] = useState([])
    const [beds, changeBedObjectArray] = useState([])
    const [windows, updateWindowsArray] = useState([])
    const [totalCost, changeTotalCost] = useState(0)
    const [userChoice, setUserChoice] = useState({
        floor: 0,
        bed: 0,
        window: 0
    })

    useEffect(
        () => {
            if (userChoice.floor > 0 && userChoice.bed > 0 && userChoice.window > 0) {
                const floorObject = floors.find(
                    (floor) => {
                        return userChoice.floor === floor.id
                    }
                )
                const floorPrice = floorObject.price

                const windowObject = windows.find(
                    (window) => {
                        return userChoice.window === window.id
                    }
                )
                const windowPrice = windowObject.price

                const bedObject = beds.find(
                    (bed) => {
                        return userChoice.bed === bed.id
                    }
                )
                const bedPrice = bedObject.price

                changeTotalCost(bedPrice+windowPrice+floorPrice)
            }

        },
        [userChoice]
    )

    /*
        Single responsibility: Observe beds transient state
    */
    useEffect(
        () => {
            console.log("Beds state changed", beds)
        },
        [beds]
    )

    /*
        Single responsibility: Observe floors transient state
    */
    useEffect(
        () => {
            console.log("Floors state changed", floors)
        },
        [floors]
    )

    /*
        Single responsibility: Observe windows transient state
    */
    useEffect(
        () => {
            console.log("Windows state changed", windows)
        },
        [windows]
    )


    useEffect(
        () => {
            return fetch(`http://localhost:8088/beds`)
                .then(response => response.json())
                .then(
                    (allTheBeds) => {
                        changeBedObjectArray(allTheBeds)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            return fetch(`http://localhost:8088/windows`)
                .then(response => response.json())
                .then(
                    (allTheWindows) => {
                        updateWindowsArray(allTheWindows)
                    }
                )
        },
        []
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
                Total cost of choices: {totalCost.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2})}
            </div>
            <div>
                <h2>Floors</h2>
                {
                    floors.map(floor => {
                        return <button
                                    onClick={
                                        () => {
                                            const copy = {...userChoice}
                                            copy.floor = floor.id
                                            setUserChoice(copy)
                                        }
                                    }
                                    className="floor"
                                    key={floor.id}>{floor.type}</button>
                    })
                }
            </div>
            <div>
                <h2>Windows</h2>
                {
                    windows.map(window => {
                        return <button
                                    onClick={
                                        () => {
                                            const copy = {...userChoice}
                                            copy.window = window.id
                                            setUserChoice(copy)
                                        }
                                    }
                                    key={window.id}>{window.size}</button>
                    })
                }
            </div>
            <div>
                <h2>Beds</h2>
                {
                    beds.map(bed => {
                        return <button
                                    onClick={
                                        () => {
                                            const copy = {...userChoice}
                                            copy.bed = bed.id
                                            setUserChoice(copy)
                                        }
                                    }
                                    key={bed.id}>{bed.type}</button>
                    })
                }
            </div>
        </>
    )
}
