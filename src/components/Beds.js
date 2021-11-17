import { useEffect, useState } from "react"


/*
        {
            choices: {floor: 0, etc},
            setter: () => {}
        }
*/


export const Beds = ({choices, setter}) => {
    const [beds, changeBedObjectArray] = useState([])
    /*
        Single responsibility: Observe beds transient state
    */
    useEffect(
        () => {
            console.log("Beds state changed", beds)
        },
        [beds]
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

    return (
        <>
            <div>
                <h2>Beds</h2>
                {
                    beds.map(bed => {
                        return <button
                                    onClick={
                                        () => {
                                            const copy = {...choices}
                                            copy.bed = bed.price
                                            setter(copy)
                                        }
                                    }
                                    key={bed.id}>{bed.type}</button>
                    })
                }
            </div>
        </>
    )
}
