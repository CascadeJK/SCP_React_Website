// Imports the necessary hooks and modules from React and react-router-dom
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
// Imports supabase for database interactions from supabase
import { supabase } from "../supabase";

function NavMenu()
{
    const [item, setItem] = useState([])

    // useEffect hook to fetch items when the component mounts
    useEffect(
        () => {
            // Function to fetch item ids and names from the 'scp' table
            const fetchItems = async () => {
                const {data, error} = await supabase.from('scp').select('id, item');
                if(error)
                {
                    console.error(error); // Console logs an error
                } 
                else {
                    setItem(data); //update component state with fetched data
                }
            };
            fetchItems();
        }, []
    )

    return(

        /*Navbar*/
        <nav className="navbar navbar-dark navbar-expand-lg">
            <div className="container-fluid">
                {/*Hambuger menu for when the screen shrinks*/}
                <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon bg-transparent"></span>
                </button>
                {/* Collapsible menu content */}
                <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                    <div className="navbar-nav  ms-auto">
                        <ul>
                            {/* Maps through each item to create individual navigation links */}
                            {
                                item.map(
                                    (items) => (
                                        <li className="links" key={items.id}>
                                            <Link to={`/item/${items.id}`}>{items.item}</Link> {/* Creates Links to each item by id */}
                                        </li>
                                    )
                                )
                            }
                            {/* Link to the Admin Panel */}
                            <li className="links">
                                <Link to="/admin">Admin Panel</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// export the NavMenu componint as default export. Allows it to be imported
export default NavMenu;