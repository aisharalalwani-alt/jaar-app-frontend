import { useEffect, useState } from "react";
import axios from "../../services/api";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await axios.get("/posts/");
        setPosts(postsRes.data);
        const eventsRes = await axios.get("/events/");
        setEvents(eventsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Community Feed</h1>
      <h2>Posts</h2>
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
      <h2>Events</h2>
      {events.map(event => <div key={event.id}>{event.title}</div>)}
    </div>
  );
}

export default HomePage;
