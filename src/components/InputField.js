const InputField = ({ label, name, type, value, onChange, placeholder }) => {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <label>{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
      </div>
    );
  };
export default InputField;