export default function Input({ placeholder, text, type, ...props }) {
  return (
    <>
      <input
        className="p-4 bg-primary-100 my-4 "
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </>
  );
}
