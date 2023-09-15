// SearchBar.js
import { DebounceInput } from "react-debounce-input";

function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="message-input-container">
      <DebounceInput
        id="message-text"
        name="message-text"
        type="text"
        placeholder="Let me help you"
        value={value}
        minLength={2}
        debounceTimeout={500}
        onChange={onChange}
      />
      <button className="clear" onClick={onClear}>
        &#8634;
      </button>
    </div>
  );
}

export default SearchBar;
