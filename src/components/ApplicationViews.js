import { Route } from "react-router-dom"
import { NavBar } from "./NavBar"
import { Vans } from "./Vans"
import { Vantastic } from "./Vantastic"

export const ApplicationViews = () => {
    return (
        <>
            <NavBar />

            <Route path="/purchases">
                <Vans />
            </Route>

            <Route exact path="/">
                <Vantastic />
            </Route>

        </>
    )
}
