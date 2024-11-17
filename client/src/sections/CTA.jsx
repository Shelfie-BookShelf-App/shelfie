import { imageCollection } from "../constants";

export default function CTA() {
  return (
    <section className="cta py-12">
      <div className="border my-4 mx-8 grid grid-cols-2">
        <div className="p-8 flex flex-col gap-4">
          <h2>Join Our Book Lovers Community</h2>
          <p>
            Create an account today to save your favorite books and engage in
            lively discussions.
          </p>
          <div className="flex gap-4">
            <button className="btn btn-neutral">Sign Up</button>
            <button className="btn">Learn More</button>
          </div>
        </div>
        <figure>
          <img
            src={imageCollection[3]}
            alt=""
            className="w-full h-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
