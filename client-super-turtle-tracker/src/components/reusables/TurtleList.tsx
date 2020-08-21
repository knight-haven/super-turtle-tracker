import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { BACKEND_SECRET, BASE_URL } from "../../../env";
import { Turtle } from "../../utils/interfaces/Turtle";
import { View } from ".";
import { TurtleListItem } from "./TurtleListItem";
import { ScrollView } from "react-native";

export const TurtleList = (): JSX.Element => {
  const [turtleList, setTurtleList] = useState<Turtle[]>([]);

  const getTurtles = () => {
    axios
      .get<Turtle[]>(`${BASE_URL}/turtle`, {
        headers: { Authorization: `Bearer ${BACKEND_SECRET}` },
      })
      .then((response) => {
        setTurtleList(response.data);
      });
  };

  useEffect(() => {
    getTurtles();
  }, []);

  return (
    <ScrollView>
      {turtleList.map((item) => {
        return <TurtleListItem key={item.id} turtle={item} />;
      })}
    </ScrollView>
  );
};
