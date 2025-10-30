import { useEffect, useState } from "react";
import axios from "../services/api";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/posts/")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));

    axios.get("/events/")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Community Feed</h1>
      <section>
        <h2>Posts</h2>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title} - by {post.user}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Events</h2>
        {events.map(event => (
          <div key={event.id}>
            <h3>{event.title} - by {event.created_by}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
