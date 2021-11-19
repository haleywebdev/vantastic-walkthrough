import { useEffect, useState } from "react"

/*
        {
            choices: {floor: 0, etc},
            setter: () => {}
        }
*/

export const Windows = (propertiesAsASingleObject) => {
    const [windows, updateWindowsArray] = useState([])

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

    return (
        <>
            <div>
                <h2>Windows</h2>
                {
                    windows.map(window => {
                        return <button
                                    onClick={
                                        () => {
                                            const copy = {...propertiesAsASingleObject.choices}
                                            copy.window = window
                                            propertiesAsASingleObject.setter(copy)
                                        }
                                    }
                                    key={window.id}>{window.size}</button>
                    })
                }
            </div>
        </>
    )
}
