import { useState } from "react";
import { useDispatch } from "react-redux";
const Accordion = ({ header, body, checkHandler, checked }) => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  return (
    <section className="w-full transition-all duration-300">
      <div
        className="bg-slate-100 py-2 px-4 rounded-md mb-2 cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <div className="flex items-center justify-between">
          <p className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-300">
            {header}
          </p>
          <p>quantity: {body.length}</p>
          <div className="flex items-center gap-4">
            <span
              className={`transition-all duration-300 ${
                toggle ? "rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {/* body */}
      <ul className={toggle ? "block" : "hidden"}>
        {body &&
          body.map((item) => {
            return (
              <li
                key={item.uniqueId}
                className="flex items-center justify-between mb-2 py-2 px-4 rounded-md  bg-slate-300"
              >
                <p>{`#${item.uniqueId}`}</p>
                <p>{new Date(item.created).toLocaleDateString("en")}</p>
                <input
                  type="checkbox"
                  className="form-check-input h-4 w-4"
                  value={item.uniqueId}
                  onChange={(e) => dispatch(checkHandler(e))}
                  checked={checked.some((i) => i === item.uniqueId)}
                />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default Accordion;
