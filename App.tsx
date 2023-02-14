import React, {useState, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// const Section: React.FC<
//   PropsWithChildren<{
//     title: string;
//   }>
// > = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const [data, setData] = useState<any[]>([1, 2, 3, 4, 5, 6]);
  const renderItem = () => <View style={styles.item} />;
  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.text}>헤더영역</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyLabel}>
            <Text style={styles.text}>가로 스크롤 영역 #1</Text>
          </View>
          <FlatList
            data={data}
            horizontal
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={styles.flatListStyle}
            contentContainerStyle={styles.flatListContainerStyle}
          />
          <View style={styles.bodyLabel}>
            <Text style={styles.text}>가로 스크롤 영역 #2</Text>
          </View>
          <FlatList
            data={data}
            horizontal
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={styles.flatListStyle}
            contentContainerStyle={styles.flatListContainerStyle}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>탭바영역</Text>
        </View>
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
  },
  section: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4f4f4f',
  },
  body: {
    flex: 10,
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
    backgroundColor: '#FFE742',
  },
  flatListContainerStyle: {
    padding: 15,
  },
});

export default App;
