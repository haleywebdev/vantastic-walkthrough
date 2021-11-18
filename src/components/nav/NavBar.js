import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Van Builder</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/purchases">Van Orders</Link>
            </li>
        </ul>
    )
}