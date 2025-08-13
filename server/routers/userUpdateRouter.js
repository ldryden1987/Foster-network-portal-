import bcrypt from "bcrypt";
import express from "express";
import { Router } from "express";
import User from "../models/User.js";
import isAdminManagerorStaff from "../middlewares/isAdminManagerorStaff.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdminOrManager from "../middlewares/isAdminOrManager.js";

const app = express();
app.use(express.json());
const userUpdateRouter = Router();

//ADMIN/MANAGER/STAFF ROUTES
// Get all users (Admin/Manager/Staff only)
userUpdateRouter.get(
  "/allUsers",
  isAuthenticated,
  isAdminManagerorStaff,
  async (req, res) => {
    try {
      const requestorRole = req.user.role;
      let userFilter = {};
      if (!req.user || !req.user.role) {
        return res.status(401).json({ 
          error: "Authentication required. User not found in request." 
        });
      }
      // Apply role-based filtering
      if (requestorRole === "admin") {
        // Admins can see everyone - no filter needed
        userFilter = {};
      } else if (requestorRole === "manager") {
        // Managers can see everyone except admins
        userFilter = { role: { $ne: "admin" } };
      } else if (requestorRole === "staff") {
        // Staff can see everyone except admins and managers
        userFilter = { role: { $nin: ["admin", "manager"] } };
      }
      const users = await User.find(userFilter).select("-password"); // Exclude password field

      if (!users || users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }

      res.status(200).json({
        message: "Users retrieved successfully",
        count: users.length,
        users: users,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Get one user by ID (Admin/Manager/Staff only)
userUpdateRouter.get(
  "/user/:userId",
  isAuthenticated,
  isAdminManagerorStaff,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const requestorRole = req.user.role;

      // Apply role-based filtering
      let userFilter = { _id: userId };
      
      if (requestorRole === "manager") {
        userFilter.role = { $ne: "admin" };
      } else if (requestorRole === "staff") {
        userFilter.role = { $nin: ["admin", "manager"] };
      }

      const user = await User.findOne(userFilter).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found or access denied" });
      }

      res.status(200).json({
        message: "User retrieved successfully",
        user: user,
      });
    } catch (err) {
      console.error("Get user error:", err);
      res.status(500).json({ error: "Internal server error: " + err.message });
    }
  }
);

//Admin/Manager/Staff route to update other user's profiles.
userUpdateRouter.put(
  "/user/:user_ID",
  isAuthenticated,
  isAdminManagerorStaff,
  async (req, res) => {
    try {
      const user_id = req.params.user_ID;
      const requestorRole = req.user.role;

      // Get the target user to check their role
      const targetUser = await User.findById(user_id);
      if (!targetUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Role-based authorization checks
      if (requestorRole === "staff") {
        if (targetUser.role === "admin" || targetUser.role === "manager") {
          return res
            .status(403)
            .json({ error: "Staff cannot update admin or manager accounts" });
        }
      } else if (requestorRole === "manager") {
        if (targetUser.role === "admin") {
          return res
            .status(403)
            .json({ error: "Managers cannot update admin accounts" });
        }
      }
      // Admins can update anyone - no additional checks needed

      const updatedUser = await User.findByIdAndUpdate(
        user_id,
        { ...req.body },
        { new: true }
      ).select("-password");

      if (!updatedUser) {
        return res
          .status(400)
          .json({ error: "User must have changes to update" });
      }

      res.status(200).json({
        notice: "User updated successfully",
        message: updatedUser,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Dedicated route for admin/Manager to reset user passwords
userUpdateRouter.put(
  "/user/resetPasswordAdmin/:user_ID",
  isAuthenticated,
  isAdminOrManager,
  async (req, res) => {
    try {
      const user_id = req.params.user_ID;
      const { newPassword } = req.body;
      const requestorRole = req.user.role;

      if (!newPassword) {
        return res.status(400).json({ error: "New password is required" });
      }

      const targetUser = await User.findById(user_id);
      if (!targetUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Role-based authorization checks
      if (requestorRole === "staff") {
        if (targetUser.role === "admin" || targetUser.role === "manager") {
          return res
            .status(403)
            .json({
              error:
                "Staff cannot reset passwords for admin or manager accounts",
            });
        }
      } else if (requestorRole === "manager") {
        if (targetUser.role === "admin") {
          return res
            .status(403)
            .json({
              error: "Managers cannot reset passwords for admin accounts",
            });
        }
      }

      const passwordHash = bcrypt.hashSync(newPassword, 10);

      await User.findByIdAndUpdate(
        user_id,
        { password: passwordHash },
        { new: true }
      );

      res.status(200).json({
        notice: "Password reset successfully",
        message: `Password updated for user: ${targetUser.email}`,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Dedicated route for admin/Manager to Delete Users
userUpdateRouter.delete(
  "/user/:user_ID",
  isAuthenticated,
  isAdminOrManager,
  async (req, res) => {
    try {
      const user_id = req.params.user_ID;
      const requestorRole = req.user.role;

      if (!user_id) {
        return res.status(400).json({ error: "A user must be selected to delete" });
      }

      const targetUser = await User.findById(user_id);
      if (!targetUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Role-based authorization checks
      if (requestorRole === "manager") {
        if (targetUser.role === "admin" || targetUser.role === "manager") {
          return res
            .status(403)
            .json({
              error: "Managers cannot delete Admin or Other Manager Accounts.",
            });
        }
      }

      // Proceed to delete the user
      await User.findByIdAndDelete(user_id);

      res.status(200).json({
        notice: "User deleted successfully",
        message: `User deleted: ${targetUser.email}`,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

//USER ROUTES
//allows users to see their own profile

//allows users to update their own profile except role, status, password, and autogenerated db items
userUpdateRouter.put(
  "/updateProfile/:user_ID",
  isAuthenticated,
  async (req, res) => {
    try {
      const user_id = req.params.user_ID;
      const authenticatedUserId = req.user._id.toString(); // Get the authenticated user's ID

      // Check if user is trying to update their own profile
      if (user_id !== authenticatedUserId) {
        return res.status(403).json({
          error: "Access denied. You can only update your own profile.",
        });
      }
      // Define which fields users cannot update themselves
      const blockedFields = ["role", "status", "_id", "__v", "password"];
      const updates = {};
      //will filter out blocked keys
      Object.keys(req.body).forEach((key) => {
        if (!blockedFields.includes(key)) {
          updates[key] = req.body[key];
        }
      });
      // Check if user tried to update blocked fields
      const attemptedBlockedFields = Object.keys(req.body).filter((key) =>
        blockedFields.includes(key)
      );

      if (attemptedBlockedFields.length > 0) {
        return res.status(403).json({
          error: `Cannot update the following fields: ${attemptedBlockedFields.join(
            ", "
          )}`,
        });
      }
      //Check if user tries to update blocked fields.
      const updatedUser = await User.findByIdAndUpdate(
        user_id,
        updates, // Use filtered updates instead of { ...req.body }
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res
        .status(200)
        .json({ notice: "Profile updated successfully", message: updatedUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Dedicated route for users to change their passwords
userUpdateRouter.put(
  "/changePassword/:user_ID",
  isAuthenticated,
  async (req, res) => {
    try {
      const user_id = req.params.user_ID;
      const authenticatedUserId = req.user._id.toString(); // Get the authenticated user's ID
      const { currentPassword, newPassword } = req.body;
      
      // Debugging Logs
      console.log("Change password debug:");
      console.log("- Target user_id (from URL):", user_id);
      console.log("- Target user_id type:", typeof user_id);
      console.log("- Authenticated user ID (raw):", req.user._id);
      console.log("- Authenticated user ID (string):", authenticatedUserId);
      console.log("- User IDs match:", user_id === authenticatedUserId);

      // Validate that password is provided
      if (!newPassword) {
        return res.status(400).json({ error: "New password is required" });
      }

      // Check if user is trying to update their own profile
      if (user_id !== authenticatedUserId) {
        return res.status(403).json({
          error: "Access denied. You can only update your own password.",
        });
      }

      // Get the user to verify current password
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify current password
      if (!bcrypt.compareSync(currentPassword, user.password)) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      // Hash the new password
      const passwordHash = bcrypt.hashSync(newPassword, 10);

      // Update only the password field
      const updatedUser = await User.findByIdAndUpdate(
        user_id,
        { password: passwordHash },
        { new: true }
      );

      res.status(200).json({
        notice: "Password reset successfully",
        message: `Password updated for user: ${updatedUser.email}`,
      });
      return;
    } catch (err) {
      res.status(400).json({ error: err.message });
      return;
    }
  }
);



export default userUpdateRouter;
