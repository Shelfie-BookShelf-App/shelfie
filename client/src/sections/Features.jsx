import { imageCollection } from "../constants";

export default function Features() {
  return (
    <section className="features py-12 grid grid-cols-2 gap-8">
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
      <figure>
        <img src={imageCollection[1]} alt="" />
      </figure>
    </section>
  );
}
