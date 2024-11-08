export default function GoogleBook({ book }) {
  return (
    <article>
      <figure>
        <img src={book?.volumeInfo?.imageLinks?.thumbnail} alt="" />
      </figure>
      <h3 className="font-bold">{book?.volumeInfo?.title}</h3>
      <p>Published Date: {book?.volumeInfo?.publishedDate}</p>
      <p>Page Count: {book?.volumeInfo?.pageCount}</p>
      <p>Language: {book?.volumeInfo?.language}</p>
      <p>Description: {book?.volumeInfo?.description?.slice(0, 100)}</p>
    </article>
  );
}
