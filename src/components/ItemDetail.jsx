// Imports the necessary hooks and modules from React and react-router-dom
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Imports supabase for database interactions from supabase
import { supabase } from "../supabase";

// The ItemDetail component displays the information about an item
function ItemDetail()
{
    // UseStaes
    const {id} = useParams();
    const [itemData, setItemData] = useState(null);

    // useEffect hook to fetch item details when the component mounts or when 'id' changes
    useEffect(
        () => {
            // This function fetches the item details from the 'scp' table in supabase
            const fetchItemDetails = async () =>
            {
                const {data, error} = await supabase.from('scp').select('*').eq('id', id).single();
                if(error)
                {
                    console.error(error); // Console logs an error
                }
                else {
                    setItemData(data); // updates this component state with fetched data
                }
            }
            fetchItemDetails()
        }, [id]// Dependency array with 'id' to refetch if the ID changes
    );

    // Displays the item details or a loading message if data is not yet available
    return(
        <div className="items">
            {
                itemData ? (
                    <>
                        {/* Displays the item information if data is available */}
                        <h1>{itemData.item}</h1>
                        <h2>{itemData.class}</h2>
                        <h3>Description:</h3>
                        <p>{itemData.description}</p>
                        <h3>Containment:</h3>
                        <p>{itemData.containment}</p>
                        {/* Displays the image in the database unless there isn't one then displays a substitute image */}
                        <img className="images" src={itemData.image ? itemData.image : "https://slapmdchskufpvrvjdqi.supabase.co/storage/v1/object/public/images/Redacted.jpg"} alt="image"/>
                    </>
                ) : (
                    // Displays Loading while retreiving the data
                    <p>Loading...</p>
                )
            }
        </div>
    );
}

// export the ItemDetail componint as default export. Allows it to be imported
export default ItemDetail;