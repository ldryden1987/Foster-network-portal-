import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DisplayUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (userId) {
      fetchUser();
    } else {
      setError("No user ID provided");
      setLoading(false);
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const sessionToken = localStorage.getItem("sessionToken");

      if (!sessionToken) {
        setError("Please log in to view user details");
        navigate("/signin");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/userUpdate/user/${userId}`,
        {
          headers: {
            Authorization: sessionToken,
          },
        }
      );