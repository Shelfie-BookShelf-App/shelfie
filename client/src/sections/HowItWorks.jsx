import { featureList } from "../constants";

export default function HowItWorks() {
  return (
    <section className="how-it-work py-12 flex flex-col justify-center items-center text-center gap-4">
      <h4>Explore</h4>
      <h3>Discover How Our Features Enhance Your Experience</h3>
      <p>
        Our platform allows you to easily filter books by category and add your
        favorite to your profile. Engage with fellows readers through
        discussions and share your thoughts on the book you love
      </p>
      <div className="grid grid-cols-3 my-12 gap-8">
        {featureList.map((feature, index) => {
          const { title, description, img } = feature;
          return (
            <article key={index} className="flex flex-col gap-4">
              <figure className="aspect-square">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </figure>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          );
        })}
      </div>
      <div className="flex gap-4">
        <button className="btn">Learn More</button>
        <button className="btn btn-neutral">Sign Up!</button>
      </div>
    </section>
  );
}
