import React from 'react';
import Swal from 'sweetalert2'

const AddCoffee = () => {

    const handleAddCoffee = e => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const newCoffee = { name, quantity, supplier, taste, category, details, photo }
        console.log(newCoffee)

        // send data to the server and database
        fetch('https://restart-coffee-crud-server-4fhz4qkwx-md-sufian-jidans-projects.vercel.app/coffee', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCoffee)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log('successfully added');
                    Swal.fire({
                        title: 'Success!',
                        text: 'Coffee added successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    e.target.reset();
                }
            })

    }

    return (
        <div className='lg:w-3/4 mx-auto'>
            <div className="text-center p-10">
                <h1 className="text-5xl font-bold">Add Coffee!</h1>
                <p className="py-6">
                    Provident cupiditate voluptatem et in.Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
            </div>
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                <form onSubmit={handleAddCoffee} className="card-body">
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className='form-control flex-1'>
                            <label className="fieldset-label">Name</label>
                            <input type="text" className="input" name="name" placeholder="Coffee Name" />
                        </div>
                        <div className='form-control flex-1'>
                            <label className="fieldset-label">Available  Quantity</label>
                            <input type="number" className="input" name="quantity" placeholder="Quantity" />
                        </div>
                    </div>
                    {/* form second row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className='form-control flex-1'>
                            <label className="fieldset-label">Supplier</label>
                            <input type="text" name="supplier" className="input" placeholder="Supplier" />
                        </div>
                        <div className='form-control flex-1'>
                            <label className="fieldset-label">Taste</label>
                            <input type="text" className="input" name="taste" placeholder="Taste Name" />
                        </div>
                    </div>
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className='form-control flex-1'>
                            <label className="fieldset-label">Category</label>
                            <input type="text" className="input" name="category" placeholder="Coffee Category" />
                        </div>
                        <div className='form-control flex-1'>
                            <label className="fieldset-label">Details</label>
                            <input type="text" className="input" name="details" placeholder="Details" />
                        </div>
                    </div>

                    <div className='form-control'>
                        <label className="fieldset-label">Photo Url</label>
                        <input type="text" className="input w-full" name="photo" placeholder="Photo Url" />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full">Add Coffee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCoffee;