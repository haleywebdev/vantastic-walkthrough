import { useEffect, useState } from "react"
import "./Vans.css"

export const Vans = () => {
    const [vans, updateVanInventory] = useState([])

    useEffect( () => { fetchVans() }, [] )

    const fetchVans = () => {
        return fetch(`http://localhost:8088/vans?_expand=floor&_expand=window&_expand=bed&_expand=user`)
                .then(HTTPResponseJSONString => HTTPResponseJSONString.json())
                .then(
                    (vans) => {
                        updateVanInventory(vans)
                    }
                )
    }

    const cancelOrder = (vanPrimaryKey) => {
        return fetch(`http://localhost:8088/vans/${vanPrimaryKey}`, {
            method: "DELETE"
        })
            .then(
                () => { fetchVans() }
            )
    }

    return (
        <>
            <div>
                <h2>Vans</h2>
                {
                    vans.map(van => {
                        return parseInt(localStorage.getItem("vanner")) === van.user.id
                                ? <div style={{
                                            margin:"0.75rem"
                                        }} key={van.id}>
                                            {van.user.name} ordered the van "{van.vanityName}" needs {van.window.size.toLowerCase()} windows and {van.floor.type.toLowerCase()} floors and a {van.bed.type.toLowerCase()} bed and is needed by {van.neededBy}
                                            <button
                                                onClick={
                                                    () => {
                                                        cancelOrder(van.id)
                                                    }
                                                }
                                            >Cancel Order</button>
                                        </div>
                                : <div>Not yours</div>
                    })
                }
            </div>
        </>
    )
}
