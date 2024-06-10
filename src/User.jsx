import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "./Store";

export default function User(){

    const users = useSelector( (state) => state.user.users);
    const status = useSelector( (state) => state.user.status);
    const error = useSelector( (state) => state.user.error);
    console.log(users)
    
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(fetchUsers());
    }, [dispatch]);

    return(
        <div className="container">
            <h3 className="text-primary text-center m-3"> API calling using ToolKit </h3>
            {
                status == 'loading' && <h3 className="text-success"> Fetching the data, please wait</h3>
            }
            {
                status == 'Completed' && error == false && (
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Phone </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item) => (
                            <tr key={item.id}>
                                <td> {item.id } </td>
                                <td> {item.name} </td>
                                <td> {item.email} </td>
                                <td> {item.phone} </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
                )
            }
            {
                status == 'error' && <h3 className="text-danger"> {error} </h3>
            }
            
        </div>
    )
}