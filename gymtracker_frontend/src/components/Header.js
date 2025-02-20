import React from 'react';
import {Link} from "react-router-dom";

export const Header = () => {
  return (
    <header>
        <div className="container">
            <div className="inner-content">
                <div className="brand">
                    <Link to="/">SLUGTRACKER</Link>
                </div>

                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>

                <ul className="nav-links">
                    <li>
                        <Link to="/equipment-availability">Equipment Availability</Link>
                    </li>
                </ul>

                <ul className="nav-links">
                    <li>
                        <Link to="/workout-recommendations">Workout Recommendations</Link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
  )
}