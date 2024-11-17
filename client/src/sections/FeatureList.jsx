export default function FeatureList() {
  return (
    <section className="py-12 flex flex-col gap-4">
      <h4>Discover</h4>
      <h3>Explore Our Unique Bookstore Features</h3>
      <p>
        Our bookstore is designed to enhance your reading experience. With
        intuitive features, finding you next favorite book has never been easier
      </p>
      <div className="grid grid-cols-3 gap-8 py-8">
        <article>
          <h3>Effortless Book Discovery with Category Filtering</h3>
          <p>
            Easily browse through genres and categories to find exactly what
            you're looking for
          </p>
        </article>
        <article>
          <h3>Personalized Recommendations Just for You</h3>
          <p>
            Receive tailored book suggestions based on your reading references
          </p>
        </article>
        <article>
          <h3>Stay Updated with New Arrivals</h3>
          <p>Be first to know about new releases and bestsellers</p>
        </article>
      </div>
      <div className="flex gap-4">
        <button className="btn">Learn More</button>
        <button className="btn btn-neutral">Sign Up</button>
      </div>
    </section>
  );
}
