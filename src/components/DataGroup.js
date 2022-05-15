import { useDispatch, useSelector } from "react-redux";
import { dataCheck } from "../redux/dataReducer";
import { addSelectData } from "../redux/selectDataReducer";
import Accordion from "../common/Accordion";

const DataGroup = () => {
  const { dataGroup, checked } = useSelector((state) => state.dataGroup);
  const { loading, data, error } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  const dataGroupKeys = Object.keys(dataGroup);
  return (
    <section className="col-span-6 flex flex-col items-start justify-start bg-slate-200 p-8 rounded-md">
      {loading ? (
        <p className="text-xl self-center">loading...</p>
      ) : !loading && error ? (
        <p className="text-xl self-center">{error}</p>
      ) : (
        !loading &&
        !error &&
        data && (
          <>
            <h2 className="self-center text-3xl mb-2">All Data</h2>
            <button
              onClick={() => dispatch(addSelectData(checked, data))}
              className={`self-end py-2 px-6 bg-slate-300 rounded-md font-medium mb-6 ${
                checked.length > 0 ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={checked.length === 0}
            >
              Add
            </button>
            {dataGroupKeys &&
              dataGroupKeys.map((item) => {
                return (
                  <Accordion
                    key={item}
                    header={item}
                    body={dataGroup[item]}
                    checked={checked}
                    checkHandler={dataCheck}
                  />
                );
              })}
          </>
        )
      )}
    </section>
  );
};

export default DataGroup;
