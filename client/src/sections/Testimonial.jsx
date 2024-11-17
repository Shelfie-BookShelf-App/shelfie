import { useState } from "react";
import { testimonials } from "../constants";

export default function Testimonial() {
  const [seletedIndex, setSeletedIndex] = useState(0);

  const handlePrevTestimonial = () => {
    setSeletedIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setSeletedIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const { rating, content, avatar_img, name, role } =
    testimonials[seletedIndex];

  return (
    <section className="testimonial py-24 flex items-center">
      <button name="left" onClick={handlePrevTestimonial}>
        ⬅️
      </button>
      <div className="flex-1 px-24 flex flex-col text-center gap-8">
        <h3>{rating}</h3>
        <h3>{content}</h3>
        <div className="flex justify-center items-center gap-4">
          <img
            src={avatar_img}
            alt=""
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="text-start">
            <h4>{name}</h4>
            <p>{role}</p>
          </div>
        </div>
      </div>
      <button name="right" onClick={handleNextTestimonial}>
        ➡️
      </button>
    </section>
  );
}
