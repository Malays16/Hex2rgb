import { useState } from 'react';
import PropTypes from 'prop-types';

const isValidHexColor = hexColor => {
  const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
  return hexColorRegex.test(hexColor);
};

const hexToRgb = hex => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgb(${r}, ${g}, ${b})`;
};

const Form = ({ setHexColor }) => {
  const [form, setForm] = useState({
    hexColor: '',
    info: ''
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    if (value.length) {
      if (!isValidHexColor(value)) {
        setForm({ ...form, [name]: value, info: 'Ошибка!' });
        setHexColor('#f22');
      } else {
        setForm({ ...form, [name]: value, info: hexToRgb(value) });
        setHexColor(value);
      }
    } else {
      setForm({ ...form, [name]: value, info: '' });
      setHexColor('');
    }
  };

  return (
    <form>
      <input id="hex-color" type="text" placeholder="Hex Color" name="hexColor" onInput={handleChange} />
      <div className="info-message">{form.info}</div>
    </form>
  );
};

Form.propTypes = {
  setHexColor: PropTypes.func.isRequired
};

export default Form;