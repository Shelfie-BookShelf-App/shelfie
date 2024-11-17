export default function HowItWorks() {
  return (
    <section className="py-12 flex flex-col justify-center items-center text-center gap-4">
      <h4>Explore</h4>
      <h3>Discover How Our Features Enhance Your Experience</h3>
      <p>
        Our platform allows you to easily filter books by category and add your
        favorite to your profile. Engage with fellows readers through
        discussions and share your thoughts on the book you love
      </p>
      <div className="grid grid-cols-3 my-12 gap-8">
        <article className="flex flex-col gap-4">
          <figure className="aspect-square">
            <img
              src="https://images.unsplash.com/photo-1512508561942-18fbe6d5d0cf?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full object-cover"
            />
          </figure>
          <h3>Effortless Book Filtering for Your Convenience</h3>
          <p>
            Quickly find your next read with our intuitive filtering options
          </p>
        </article>
        <article className="flex flex-col gap-4">
          <figure className="aspect-square">
            <img
              src="https://images.unsplash.com/photo-1630948197497-3c0de9d73ad2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full object-cover"
            />
          </figure>
          <h3>Save Your Favorites for Easy Access</h3>
          <p>Add books to your favorite list and revisit them anytime</p>
        </article>
        <article className="flex flex-col gap-4">
          <figure className="aspect-square">
            <img
              src="https://images.unsplash.com/photo-1462903876006-77f6beb241b4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full object-cover"
            />
          </figure>
          <h3>Join the Conversation with Fellow Readers</h3>
          <p>Participate in discussions and share your insights on our forum</p>
        </article>
      </div>
      <div className="flex gap-4">
        <button className="btn">Learn More</button>
        <button className="btn btn-neutral">Sign Up!</button>
      </div>
    </section>
  );
}
