import { useState } from "react";

export default function Testimonial() {
  const [testimonial, setTestimonial] = useState([
    {
      rating: "⭐️⭐️⭐️⭐️⭐️",
      content:
        "The book recommendations are always spot on! I’ve discovered so many hidden gems that I wouldn’t have found anywhere else.",
      avatar_img:
        "https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Daniel Carter",
      role: "Librarian, Book Haven",
    },
    {
      rating: "⭐️⭐️⭐️⭐️⭐️",
      content:
        "A fantastic resource for readers! The community discussions are lively and insightful, and the curated lists save so much time.",
      avatar_img:
        "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=3408&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Michael Brown",
      role: "Teacher, Literature Academy",
    },
    {
      rating: "⭐️⭐️⭐️⭐️⭐️",
      content:
        "This bookstore has transformed my reading experience! The curated selections and community discussions are simply unbeatable.",
      avatar_img:
        "https://images.unsplash.com/photo-1630948197497-3c0de9d73ad2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Emily Johnson",
      role: "Book Blogger, Reader's Hub",
    },
    {
      rating: "⭐️⭐️⭐️⭐️⭐️",
      content:
        "This platform has rekindled my love for reading. The chatbot recommendations are surprisingly accurate and super helpful!",
      avatar_img:
        "https://images.unsplash.com/photo-1636041282694-aa4e52370419?q=80&w=3376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Alex Green",
      role: "Freelance Writer",
    },
    {
      rating: "⭐️⭐️⭐️⭐️⭐️",
      content:
        "The user interface is so intuitive and clean. Browsing through books has never been easier or more enjoyable.",
      avatar_img:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Jessica Lee",
      role: "Tech Enthusiast & Book Lover",
    },
  ]);

  const [seletedIndex, setSeletedIndex] = useState(0);

  const handleTestimonial = (e) => {
    const currentIndex = seletedIndex;
    if (e.target.name === "left") {
      if (currentIndex === 0) {
        setSeletedIndex(testimonial.length - 1);
      } else {
        seletedIndex(currentIndex - 1);
      }
    } else if (e.target.name === "right") {
      if (currentIndex === testimonial.length - 1) {
        setSeletedIndex(0);
      } else {
        setSeletedIndex(currentIndex + 1);
      }
    }
  };

  return (
    <section className="py-24 flex items-center">
      <button name="left" onClick={handleTestimonial}>
        ⬅️
      </button>
      <div className="flex-1 px-24 flex flex-col text-center gap-8">
        <h3>{testimonial[seletedIndex].rating}</h3>
        <h3>{testimonial[seletedIndex].content}</h3>
        <div className="flex justify-center items-center gap-4">
          <img
            src={testimonial[seletedIndex].avatar_img}
            alt=""
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="text-start">
            <h4>{testimonial[seletedIndex].name}</h4>
            <p>{testimonial[seletedIndex].role}</p>
          </div>
        </div>
      </div>
      <button name="right" onClick={handleTestimonial}>
        ➡️
      </button>
    </section>
  );
}
