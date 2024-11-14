export default function CheckedCategories({ children, options }) {
  return (
    <div>
      <h3>{children}</h3>
      <div className="flex flex-col">
        {options.map((option, index) => (
          <label key={index} className="flex gap-2">
            <input type="checkbox" name={option.value} />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
