// Imports the necessary hooks from React
import { useState, useEffect } from "react";
// Imports supabase for database interactions from supabase
import { supabase } from "../supabase";

// The AdminPanel component manages the item records
function AdminPanel()
{
    // our components states
    const [items, setItems] = useState([]);
    const [newRecord, setNewRecord] = useState({
        item: '',
        class: '',
        description: '',
        containment: '',
        image: ''
    });

    // This state is to hold a record being edited
    const [editRecord, setEditRecord] = useState(null);

    // useEffect hook to fetch items when the component mounts
    useEffect(
        () => {
            const fetchItems = async () => {
                const {data, error} = await supabase.from('scp').select('*');
                if(error)
                {
                    console.error(error); // Console logs an error
                } 
                else {
                    setItems(data); // set this state to the fetched data.
                }
            };
            fetchItems();
        }, []
    )

    // Function to add a new record
    const addItem = async () => {
        await supabase.from('scp').insert([newRecord]);
        setNewRecord({ item: '', class: '', description: '', containment: '', image: ''});
        window.location.reload(); // Refresh after adding an item
    }

    // Function to delete an item
    const deleteItem = async (id) => {
        await supabase.from('scp').delete().eq('id', id);
        window.location.reload(); // Refresh after deletion
    }

    // Function to set the record to be edited
    const startEditing = (item) => {
        setEditRecord(item);
    }

    // Function to save the updated record
    const saveEdit = async (id) => {
        await supabase.from('scp').update(editRecord).eq('id', id);
        setEditRecord(null); // Clear the edit state after saving
        window.location.reload(); // Refresh after update
    }

    return(
        <div>
            <h1>Admin Panel</h1>

            <ul className="scp-holder">
                {
                    items.map(
                        (item) => (
                            <li className="scps" key={item.id}>
                                {
                                    editRecord && editRecord.id == item.id ? (
                                        
                                        // show input fields when editing
                                        <>
                                            <input value={editRecord.item} onChange={(e)=>setEditRecord({...editRecord, item: e.target.value})} />
                                            <input value={editRecord.class} onChange={(e)=>setEditRecord({...editRecord, class: e.target.value})} />
                                            <input value={editRecord.description} onChange={(e)=>setEditRecord({...editRecord, description: e.target.value})} />
                                            <input value={editRecord.containment} onChange={(e)=>setEditRecord({...editRecord, containment: e.target.value})} />
                                            <input value={editRecord.image} onChange={(e)=>setEditRecord({...editRecord, image: e.target.value})} />
                                            <button className="Save" onClick={()=>saveEdit(item.id)}>Save</button>
                                            <button className="Cancel" onClick={()=>setEditRecord(null)}>Cancel</button>
                                        </>
                                        
                                    ) : (
                                        <>
                                            <h4>{item.item}</h4>
                                            <button className="Edit button" onClick={()=>startEditing(item)}>Edit</button>
                                            <button className="Delete button" onClick={()=>deleteItem(item.id)}>Delete</button>
                                        </>
                                    )
                                }
                            </li>
                        )
                    )
                }
            </ul>
            
            {/* Form to add a new item */}
            <div className="record">
                <input className="inputs" value={newRecord.item} onChange={(e)=>setNewRecord({...newRecord, item: e.target.value})} placeholder="Item" />
                <input className="inputs" value={newRecord.class} onChange={(e)=>setNewRecord({...newRecord, class: e.target.value})} placeholder="Class" />
                <input className="inputs" value={newRecord.description} onChange={(e)=>setNewRecord({...newRecord, description: e.target.value})} placeholder="Description" />
                <input className="inputs" value={newRecord.containment} onChange={(e)=>setNewRecord({...newRecord, containment: e.target.value})} placeholder="Containment" />
                <input className="inputs" value={newRecord.image} onChange={(e)=>setNewRecord({...newRecord, image: e.target.value})} placeholder="Image" />
                <button className="Add" onClick={addItem}>Add Item</button>
            </div>
        </div>
    ); // end of return statement
}

// export the AdminPanel componint as default export. Allows it to be imported
export default AdminPanel;