import React from "react"
import { Route } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { VanBuilder } from "./VanBuilder"
import { Vans } from "./Vans"

export const ApplicationViews = () => {
    return (
        <>
            <NavBar />

            <Route exact path="/">
                <VanBuilder />
            </Route>

            <Route path="/purchases">
                <Vans />
            </Route>
        </>
    )
}
