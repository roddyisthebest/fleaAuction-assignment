import React, {type PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Card: React.FC<
  PropsWithChildren<{
    auctionId: number;
    viewCount: number;
  }>
> = ({auctionId, viewCount}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>작품ID ({auctionId})</Text>
      <Text style={styles.text}>조회수 {viewCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
  },
});

export default Card;
