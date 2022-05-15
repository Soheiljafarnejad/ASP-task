import DataGroup from "./components/DataGroup";
import SelectDataGroup from "./components/SelectDataGroup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/asyncReducer";
import { addDataGroup } from "./redux/dataReducer";
const App = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.async);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(addDataGroup(data));
  }, [data, dispatch]);

  return (
    <section className="bg-white h-screen grid grid-cols-12 p-16 gap-4">
      <DataGroup />
      <SelectDataGroup />
    </section>
  );
};

export default App;
