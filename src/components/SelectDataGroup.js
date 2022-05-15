import { useDispatch, useSelector } from "react-redux";
import { checkSelectData, deleteSelectData } from "../redux/selectDataReducer";
import Accordion from "../common/Accordion";
import { updateChecked } from "../redux/dataReducer";

const SelectDataGroup = () => {
  const dispatch = useDispatch();
  const { dataGroup, checked } = useSelector((state) => state.selectData);
  const selectDataKeys = Object.keys(dataGroup);

  const clickHandler = () => {
    dispatch(deleteSelectData(checked));
    dispatch(updateChecked(checked));
  };

  return (
    <section className="col-span-6 flex flex-col items-start justify-start bg-slate-200 p-8 rounded-md">
      <h2 className="self-center text-3xl mb-2">Selected Data</h2>
      <button
        onClick={clickHandler}
        className={`self-end py-2 px-6 bg-slate-300 rounded-md font-medium mb-6 ${
          checked.length > 0 ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={checked.length === 0}
      >
        Delete
      </button>
      {selectDataKeys &&
        selectDataKeys.map((item) => {
          return (
            <Accordion
              key={item}
              header={item}
              body={dataGroup[item]}
              checked={checked}
              checkHandler={checkSelectData}
            />
          );
        })}
    </section>
  );
};

export default SelectDataGroup;
