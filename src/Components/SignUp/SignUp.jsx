import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {

    const { createUser } = useContext(AuthContext);

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        createUser(email, password)
            .then(result => {
                // console.log(result.user);

                const createdAt = result.user.metadata.creationTime
                const user = { email, createdAt }
                //new user has been created

                fetch('https://restart-coffee-crud-server-4fhz4qkwx-md-sufian-jidans-projects.vercel.app/user', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            console.log('successfully added');
                            Swal.fire({
                                title: 'Success!',
                                text: 'User Created successfully',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            });
                            e.target.reset();
                        }
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                </div>
                <div className="card bg-base-100 w-full min-w-96 shrink-0 shadow-2xl">
                    <form onSubmit={handleSignUp} className="card-body">
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Email</label>
                            <input type="email" className="input" name='email' placeholder="Email" />
                            <label className="fieldset-label">Password</label>
                            <input type="password" className="input" name='password' placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Sign Up</button>
                        </fieldset>
                    </form>
                    <p className="my-3 text-center">Already have an account? <Link to={'/signIn'} className="text-blue-700">Please Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;