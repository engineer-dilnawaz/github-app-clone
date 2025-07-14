import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, Text } from "react-native";

const Details = () => {
  return (
    <SafeAreaView>
      <Text>Details</Text>
      <Link href={".."}>GO back</Link>
    </SafeAreaView>
  );
};

export default Details;
