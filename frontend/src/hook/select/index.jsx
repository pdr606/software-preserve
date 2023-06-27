import PropTypes from "prop-types";

function Select({ options, value, setValue, text, className, required  }) {
  return (
    <select required={required} className={className} value={value} onChange={({ target }) => setValue(target.value)}>
      <option value='' disabled>{text}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired
};

export default Select;
