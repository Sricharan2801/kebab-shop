import { useEffect, useState } from 'react';
import Logo from '/logo.webp';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import ForgetPasswordModel from './ForgetPasswordModel';
import { FaArrowLeft } from 'react-icons/fa';

const SignIn = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error(
          'Your email is not verified. Please check your inbox and verify your email.',
          { duration: 10000 }
        );
        return;
      }

      setFormValues({ email: '', password: '' });
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.');
      console.error('Error signing in:', error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = Logo;
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {isModalOpen && (
        <ForgetPasswordModel
          onClose={() => setIsModalOpen(false)} // Pass onClose handler to modal
        />
      )}

      {/* Navigation Back to Home */}
      <div className="absolute top-5 left-5">
        <Link to="/">
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <FaArrowLeft className="mr-2 text-lg" /> Home
          </button>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={Logo} className="mx-auto w-[5rem]" />
        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  onClick={() => setIsModalOpen(true)} // Open the modal on click
                >
                  Forgot password?
                </button>
              </div>
            </div>
            <div className="mt-2 relative">
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
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{' '}
          <Link to="/sign-up" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
