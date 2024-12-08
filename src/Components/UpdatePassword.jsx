import React, { useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons
import NavBtns from './Buttons/NavBtns';

const UpdatePassword = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle visibility for new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle visibility for confirm password

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transform transition-transform scale-95 hover:scale-100 relative">
        <NavBtns
          className="absolute top-2 right-2 text-lg text-gray-600 hover:text-red-600 hover:font-bold transition-colors"
          onClick={onClose}
        >
          ✕
        </NavBtns>
        <h2 className="text-xl font-semibold text-center mb-6 text-indigo-700">Update Password</h2>
        <div>
          {/* New Password */}
          <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-indigo-600"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-indigo-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
          )}

          <NavBtns
            className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2 mt-4 transition-transform hover:scale-105 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onClick={handlePasswordUpdate}
            disabled={loading || !newPassword || !confirmPassword}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </NavBtns>
        </div>

        <NavBtns
          className="w-full bg-gray-200 text-gray-700 rounded-lg px-4 py-2 mt-4 hover:bg-gray-300 transition-colors"
          onClick={onClose}
        >
          Close
        </NavBtns>
      </div>
    </div>
  );
};

export default UpdatePassword;
