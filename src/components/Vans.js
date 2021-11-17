import { useEffect, useState } from "react"

export const Vans = () => {
    const [vans, updateVanInventory] = useState([])

    useEffect(
        () => {
            return fetch(`http://localhost:8088/vans?_expand=floor&_expand=window&_expand=bed`)
                .then(response => response.json())
                .then(
                    (vans) => {
                        updateVanInventory(vans)
                    }
                )
        },
        []
    )

    return (
        <>
            <div>
                <h2>Vans</h2>
                {
                    vans.map(van => {
                        return <div key={van.id}>
                            Van #{van.id} has {van.window.size} windows and {van.floor.type} floors and {van.bed.type} bed
                        </div>
                    })
                }
            </div>
        </>
    )
}
