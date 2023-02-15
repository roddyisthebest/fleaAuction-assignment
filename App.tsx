import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';
import EventSource from 'react-native-sse';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Card from './components/Card';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [refreshingTwo, setRefreshingTwo] = useState<boolean>(false);

  const [random, setRandom] = useState<number[]>([
    Math.random(),
    Math.random(),
  ]);
  const [data, setData] = useState<{viewCount: number; auctionId: number}[]>([
    {auctionId: 2127, viewCount: 120},
    {auctionId: 2128, viewCount: 143},
    {auctionId: 2130, viewCount: 76},
    {auctionId: 2131, viewCount: 89},
    {auctionId: 2126, viewCount: 62},
    {auctionId: 2135, viewCount: 58},
    {auctionId: 2129, viewCount: 69},
    {auctionId: 2132, viewCount: 65},
    {auctionId: 2134, viewCount: 56},
    {auctionId: 2136, viewCount: 43},
    {auctionId: 2140, viewCount: 54},
    {auctionId: 2137, viewCount: 83},
    {auctionId: 2138, viewCount: 49},
    {auctionId: 2139, viewCount: 37},
    {auctionId: 2141, viewCount: 80},
    {auctionId: 2142, viewCount: 55},
    {auctionId: 2123, viewCount: 113},
    {auctionId: 2124, viewCount: 51},
    {auctionId: 2125, viewCount: 67},
    {auctionId: 2133, viewCount: 84},
    {auctionId: 2145, viewCount: 45},
    {auctionId: 2146, viewCount: 44},
    {auctionId: 2150, viewCount: 58},
    {auctionId: 2151, viewCount: 69},
    {auctionId: 2147, viewCount: 33},
    {auctionId: 2148, viewCount: 19},
    {auctionId: 2153, viewCount: 45},
    {auctionId: 2158, viewCount: 47},
    {auctionId: 2154, viewCount: 27},
    {auctionId: 2155, viewCount: 19},
    {auctionId: 2156, viewCount: 23},
    {auctionId: 2157, viewCount: 31},
    {auctionId: 2143, viewCount: 51},
    {auctionId: 2144, viewCount: 44},
    {auctionId: 2149, viewCount: 44},
    {auctionId: 2152, viewCount: 80},
  ]);

  const [sseEvent, setSseEvent] = useState<{
    data: string;
    lastEventId: number;
    type: 'sse.auction_viewed';
    url: string;
  }>({
    data: '{}',
    lastEventId: 0,
    type: 'sse.auction_viewed',
    url: '',
  });
  const renderItem = ({
    item,
  }: {
    item: {viewCount: number; auctionId: number};
  }) => <Card viewCount={item.viewCount} auctionId={item.auctionId} />;

  const suffle = (
    dataProps: {viewCount: number; auctionId: number}[],
    rand: number,
  ) => {
    const copyData = [...dataProps];
    for (let index = dataProps.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(rand * (index + 1));
      const temporary = copyData[index];
      copyData[index] = copyData[randomPosition];
      copyData[randomPosition] = temporary;
    }
    return copyData;
  };

  type MyCustomEvents = 'sse.auction_viewed' | 'open';

  useEffect(() => {
    const eventSource = new EventSource<MyCustomEvents>(
      'https://api.fleaauction.world/v2/sse/event',
    );

    const connectToSSE = async () => {
      try {
        eventSource.addEventListener('sse.auction_viewed', (event: any) =>
          setSseEvent(event),
        );
      } catch (e) {
        console.log(e);
      }
    };
    connectToSSE();
    return () =>
      eventSource.removeEventListener('sse.auction_viewed', (event: any) =>
        setSseEvent(event),
      );
  }, []);

  useEffect(() => {
    const JSONDATA = JSON.parse(sseEvent.data);
    console.log(JSONDATA);

    setData(prev =>
      prev.map(d => {
        if (d.auctionId === JSONDATA.auctionId) {
          return {
            auctionId: d.auctionId,
            viewCount: JSONDATA.viewCount,
          };
        } else {
          return d;
        }
      }),
    );
  }, [sseEvent]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.text}>헤더영역</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyLabel}>
          <Text style={styles.text}>가로 스크롤 영역 #1</Text>
        </View>
        <FlatList
          data={suffle(data, random[0])}
          horizontal
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.flatListStyle}
          contentContainerStyle={styles.flatListContainerStyle}
          keyExtractor={item => item.auctionId.toString()}
          refreshing={refreshing}
          onRefresh={() => {
            setRandom([Math.random(), random[1]]);
          }}
        />
        <View style={styles.bodyLabel}>
          <Text style={styles.text}>가로 스크롤 영역 #2</Text>
        </View>
        <FlatList
          data={suffle(data, random[1])}
          horizontal
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.flatListStyle}
          contentContainerStyle={styles.flatListContainerStyle}
          keyExtractor={item => item.auctionId.toString()}
          refreshing={refreshingTwo}
          onRefresh={() => {
            setRandom([random[0], Math.random()]);
          }}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>탭바영역</Text>
      </View>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4f4f4f',
  },
  body: {
    flex: 10,
    backgroundColor: 'white',
  },
  bodyLabel: {
    height: 60,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  item: {
    width: 160,
    height: 160,
    backgroundColor: '#3A2F2A',
    borderRadius: 20,
  },
  separator: {
    width: 15,
  },
  flatListStyle: {
    flexGrow: 0,
    height: 190,
    backgroundColor: '#eaeaea',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  flatListContainerStyle: {
    padding: 15,
  },
});

export default App;
