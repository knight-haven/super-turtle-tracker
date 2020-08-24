import useAxios from "axios-hooks";
import * as React from "react";
import { ScrollView } from "react-native";
import { View } from ".";
import { BACKEND_SECRET, BASE_URL } from "../../../env";
import { Turtle } from "../../utils/interfaces/Turtle";
import { TurtleListItem } from "./TurtleListItem";

export const TurtleList = (): JSX.Element => {
  // const [turtleList, setTurtleList] = useState<Turtle[]>([]);
  const [{ data, loading, error, response }, refetch] = useAxios({
    headers: { Authorization: `Bearer ${BACKEND_SECRET}` },
    url: `${BASE_URL}/turtle`,
  });

  return (
    <View>
      {loading || error ? undefined : (
        <ScrollView>
          {data.map((item: Turtle) => {
            return <TurtleListItem key={item.id} turtle={item} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};
