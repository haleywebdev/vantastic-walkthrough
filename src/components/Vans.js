import { useEffect, useState } from "react"

export const Vans = () => {
    const [vans, updateVanInventory] = useState([])

    useEffect(
        () => {
            return fetch(`http://localhost:8088/vans?_expand=floor&_expand=window&_expand=bed&_expand=user`)
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
                        return <div style={{
                            margin:"0.75rem"
                        }} key={van.id}>
                            Van "{van.vanityName}" ordered by {van.user.name} needs {van.window.size.toLowerCase()} windows and {van.floor.type.toLowerCase()} floors and a {van.bed.type.toLowerCase()} bed and is needed by {van.neededBy}
                        </div>
                    })
                }
            </div>
        </>
    )
}
