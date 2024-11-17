export default function Features() {
  return (
    <section className="py-12 grid grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <h4>Discover</h4>
        <h3>Explore Our Curated Collection of New Releases</h3>
        <p>
          Dive into a world literature with our integrated Google Books display.
          Browse the latest titles and find your next great read with ease.
        </p>
        <div className="flex gap-4">
          <button className="btn btn-neutral">Browse</button>
          <button className="btn">Suggest</button>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1630948197497-3c0de9d73ad2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </section>
  );
}
