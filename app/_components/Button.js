function Button({ handleClick, activeFilter, children, filter }) {
  return (
    <button
      onClick={() => handleClick(filter)}
      className={`px-5 py-2  hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700" : ""
      } `}
    >
      {children}
    </button>
  );
}

export default Button;
