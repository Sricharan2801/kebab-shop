import { useEffect, useState } from 'react';
import Logo from '/logo.webp';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/Firebase'; // Import Firebase auth
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/Firebase'; // Assuming db is your Firestore instance
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const SignUp = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formValues.email,
                formValues.password
            );
            const user = userCredential.user;

            // Update user profile with name (displayName)
            await updateProfile(user, {
                displayName: formValues.name,
                phoneNumber: formValues.phone,
            });

            // Send email verification
            await sendEmailVerification(user);

            // Save additional user data (like phone) in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: formValues.name,
                email: formValues.email,
                phone: formValues.phone,
            });

            setFormValues({ name: '', email: '', phone: '', password: '' });
            console.log('User registered:', userCredential.user);
            toast.success('Registration successful! Please log in.');
            toast.success('Check your email and verify your account.', {
                duration: 10000,
            });
            navigate('/sign-in');
        } catch (error) {
            toast.error(`Registration failed. Please try again. ${error.message}`);
            console.error('Error signing up:', error.message);
            setError(error.message);
        }
    };

    useEffect(() => {
        const img = new Image();
        img.src = Logo;
    }, []);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
            {/* Navigate to home */}
            <div className="absolute top-5 left-5">
                <Link to="/">
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <FaArrowLeft className="mr-2 text-lg" /> Home
                    </button>
                </Link>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img alt="Your Company" src={Logo} className="mx-auto w-[5rem]" />
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign up to new account
                </h2>
            </div>

            <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6" onSubmit={handleSignUp}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                name="name"
                                value={formValues.name}
                                type="text"
                                required
                                autoComplete="name"
                                className="input-box-style"
                                onChange={(e) => changeHandler(e)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                value={formValues.email}
                                type="email"
                                required
                                autoComplete="email"
                                className="input-box-style"
                                onChange={(e) => changeHandler(e)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                            Phone number
                        </label>
                        <div className="mt-1">
                            <input
                                id="phone"
                                name="phone"
                                value={formValues.phone}
                                type="number"
                                required
                                autoComplete="phone"
                                className="input-box-style"
                                onChange={(e) => changeHandler(e)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                name="password"
                                value={formValues.password}
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                                className="input-box-style"
                                onChange={(e) => changeHandler(e)}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-2 text-gray-600 hover:text-gray-900"
                            >
                                {showPassword ? '👁' : '👁‍🗨'}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-2 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/sign-in" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
