import { features } from "../constants";

export default function FeatureList() {
  return (
    <section className="feature-list py-12 flex flex-col gap-4">
      <h4>Discover</h4>
      <h3>Explore Our Unique Bookstore Features</h3>
      <p>
        Our bookstore is designed to enhance your reading experience. With
        intuitive features, finding you next favorite book has never been easier
      </p>
      <div className="grid grid-cols-3 gap-8 py-8">
        {features.map((feature, index) => {
          const { title, description } = feature;
          return (
            <article key={title} className="flex flex-col gap-4">
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          );
        })}
      </div>
      {/* <div className="flex gap-4">
        <button className="btn">Learn More</button>
        <button className="btn btn-neutral">Sign Up</button>
      </div> */}
    </section>
  );
}
