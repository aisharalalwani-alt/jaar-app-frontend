import { useEffect, useState } from "react";
import api from "../../services/api";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    house_number: "",
    street: "",
    phone: "",
    bio: "",
  });

  // Fetch profile + posts + events
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await api.get("my-profile/");
        const data = res.data;

        setProfile(data.profile);
        setPosts(data.posts);
        setCreatedEvents(data.created_events);
        setJoinedEvents(data.joined_events);

        setFormData({
          house_number: data.profile.house_number || "",
          street: data.profile.street || "",
          phone: data.profile.phone || "",
          bio: data.profile.bio || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      const res = await api.put("my-profile/", formData);
      setProfile(res.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!profile) return <p className="text-center mt-10">No profile found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {editMode ? (
        <div className="space-y-3">
          <input
            name="house_number"
            value={formData.house_number}
            onChange={handleChange}
            placeholder="House Number"
            className="border rounded p-2 w-full"
          />
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            className="border rounded p-2 w-full"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border rounded p-2 w-full"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="border rounded p-2 w-full"
          />
          <div className="flex justify-center space-x-4 mt-3">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p>
            <strong>Username:</strong> {profile.user}
          </p>
          <p>
            <strong>House Number:</strong>{" "}
            {profile.house_number || "Not set"}
          </p>
          <p>
            <strong>Street:</strong> {profile.street || "Not set"}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone || "Not set"}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio || "No bio yet"}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}

      <hr className="my-8" />

      <section className="text-left">
        <h3 className="text-xl font-semibold mb-2">My Posts 📝</h3>
        {posts.length > 0 ? (
          <ul className="space-y-2">
            {posts.map((p) => (
              <li
                key={p.id}
                className="border rounded p-3 shadow-sm bg-gray-50"
              >
                <strong>{p.title}</strong> — {p.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts yet.</p>
        )}

        <h3 className="text-xl font-semibold mt-8 mb-2">Created Events 🎉</h3>
        {createdEvents.length > 0 ? (
          <ul className="space-y-2">
            {createdEvents.map((e) => (
              <li
                key={e.id}
                className="border rounded p-3 shadow-sm bg-gray-50"
              >
                <strong>{e.title}</strong> — {e.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events created yet.</p>
        )}

        <h3 className="text-xl font-semibold mt-8 mb-2">Joined Events 🤝</h3>
        {joinedEvents.length > 0 ? (
          <ul className="space-y-2">
            {joinedEvents.map((e) => (
              <li
                key={e.id}
                className="border rounded p-3 shadow-sm bg-gray-50"
              >
                <strong>{e.title}</strong> — {e.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No joined events yet.</p>
        )}
      </section>
    </div>
  );
}

export default UserProfile;
