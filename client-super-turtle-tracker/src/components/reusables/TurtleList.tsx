import useAxios from "axios-hooks";
import * as React from "react";
import { ScrollView } from "react-native";
import { BACKEND_SECRET, BASE_URL } from "../../../env";
import { Turtle } from "../../utils/interfaces/Turtle";
import { TurtleListItem } from "./TurtleListItem";

export const TurtleList = (): JSX.Element => {
  // const [turtleList, setTurtleList] = useState<Turtle[]>([]);
  const [{ data, loading, error }, refetch] = useAxios({
    headers: { Authorization: `Bearer ${BACKEND_SECRET}` },
    url: `${BASE_URL}/turtle`,
  });

  // const getTurtles = () => {
  //   axios
  //     .get<Turtle[]>(`${BASE_URL}/turtle`, {
  //       headers: { Authorization: `Bearer ${BACKEND_SECRET}` },
  //     })
  //     .then((response) => {
  //       setTurtleList(response.data);
  //     });
  // };

  // useEffect(() => {
  //   getTurtles();
  // }, []);

  return (
    <ScrollView>
      {data.map((item: Turtle) => {
        return <TurtleListItem key={item.id} turtle={item} />;
      })}
    </ScrollView>
  );
};
