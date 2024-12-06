import React, { useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

const UpdatePassword = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle visibility of new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle visibility of confirm password

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password updated successfully!");
      onClose(); // Close the modal
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
      console.error("Error updating password:", error);
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
        <h2 className="text-lg font-semibold mb-4 text-center">Update Password</h2>
        <div>
          {/* New Password Input */}
          <label className="block mb-2 text-sm font-medium">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"} // Toggle password visibility
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="input-box-style w-full"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)} // Toggle visibility
            >
              {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          {/* Confirm Password Input */}
          <label className="block mt-2 mb-2 text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="input-box-style w-full"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <button
            className="w-full bg-indigo-600 text-white rounded-md px-3 py-2 mt-2"
            onClick={handlePasswordUpdate}
            disabled={loading || !newPassword || !confirmPassword}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
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

export default UpdatePassword;
