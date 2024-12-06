import React, { useState } from 'react';
import { auth } from '../utils/Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';

const ForgetPasswordModel = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handlePasswordReset = async () => {
        setLoading(true);
        try {
            const normalizedEmail = email.trim().toLowerCase();
            await sendPasswordResetEmail(auth, normalizedEmail);
            setEmailSent(true);
            toast.success('Password reset email sent! Check your inbox.');
        } catch (error) {
            toast.error('Error sending password reset email. Please try again.');
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h2 className="text-lg font-semibold mb-4 text-center">Forgot Password</h2>
                <div>
                    <label className="block mb-2 text-sm font-medium">Registered Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="input-box-style"
                    />
                    <button
                        className="w-full bg-indigo-600 text-white rounded-md px-3 py-2 mt-2"
                        onClick={handlePasswordReset}
                        disabled={loading || !email}
                    >
                        {loading ? 'Sending...' : 'Send Reset Email'}
                    </button>
                    {emailSent && (
                        <p className="mt-2 text-green-600 flex items-center">
                            ✅ Password reset email sent! Check your inbox.
                        </p>
                    )}
                </div>
                <button
                    className="w-full bg-gray-200 text-black rounded-md px-3 py-2 mt-2"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ForgetPasswordModel;
