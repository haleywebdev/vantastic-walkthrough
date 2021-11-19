import { Route } from "react-router-dom"
import { VanBuilder } from "./VanBuilder"
import { Vans } from "./Vans"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/purchases">
                <Vans />
            </Route>

            <Route exact path="/">
                <VanBuilder />
            </Route>

        </>
    )
}
