import { use, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const Users = () => {
    const loadedUsers = useLoaderData([]);
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // make sure user is confirmed to delete
                fetch(`http://localhost:5000/user/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your User has been deleted.",
                                icon: "success"
                            });
                            // remove the user from the user UI
                            const remaining = users.filter(use => use?._id !== id);
                            setUsers(remaining);
                        }
                    });
            }
        });
    };

    return (
        <div className='mx-20'>
            <h1 className='text-4xl text-center my-5'>users : {loadedUsers.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Last Logged in</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map(user => <tr key={user?._id}>
                                <th>1</th>
                                <td>{user?.email}</td>
                                <td>{user?.createdAt}</td>
                                <td></td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(_id)}
                                        className='btn'>X</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;