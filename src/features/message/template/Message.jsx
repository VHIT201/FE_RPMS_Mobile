import React, { useState, useMemo, useCallback } from "react";
import { Text, View, FlatList } from 'react-native';
import generalStyles from "../../../styles/generalStyles";
import ChatListComponents from "../../../components/ChatListButton";
import TextInputComponent from "../../../components/TextInput";
import styles from "../chatlistStyles";
import colors from "../../../values/colors";
import { Icons } from "../../../assets/icons";
import debounce from 'lodash.debounce';
import Header from "../../../components/Header";
const Message = props => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sampleData, setSampleData] = useState([
    {
      id: '1',
      name: 'John Doe',
      content: 'Hey, how are you?',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '10:30 AM',
      isRead: false, // Chưa xem
    },
    {
      id: '2',
      name: 'Jane Smith',
      content: 'Can we reschedule our meeting?',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '11:15 AM',
      isRead: true, // Đã xem
    },
    {
      id: '3',
      name: 'Michael Johnson',
      content: 'Got your email, will respond soon.',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '12:00 PM',
      isRead: false, // Chưa xem
    },
    {
      id: '4',
      name: 'Emily Davis',
      content: 'Let\'s catch up over lunch.',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '1:45 PM',
      isRead: true, // Đã xem
    },
    {
      id: '5',
      name: 'Chris Lee',
      content: 'Did you finish the report?',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '2:30 PM',
      isRead: false, // Chưa xem
    },
    {
      id: '6',
      name: 'Anna Brown',
      content: 'The project deadline is approaching.',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '3:15 PM',
      isRead: true, // Đã xem
    },
    {
      id: '7',
      name: 'David Wilson',
      content: 'Can you review my document?',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '4:00 PM',
      isRead: false, // Chưa xem
    },
    {
      id: '8',
      name: 'Sophia Miller',
      content: 'Meeting tomorrow at 10 AM.',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '4:45 PM',
      isRead: true, // Đã xem
    },
    {
      id: '9',
      name: 'James Taylor',
      content: 'Have you seen the latest update?',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '5:30 PM',
      isRead: false, // Chưa xem
    },
    {
      id: '10',
      name: 'Olivia Anderson',
      content: 'Let\'s discuss the new proposal.',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '6:15 PM',
      isRead: true, // Đã xem
    },
    {
      id: '11',
      name: 'Liam Harris',
      content: 'I have a few questions about the project.',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '7:00 PM',
      isRead: false, // Chưa xem
    },
    {
      id: '12',
      name: 'Ava Clark',
      content: 'Are you coming to the event?',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '8:45 PM',
      isRead: true, // Đã xem
    },
    {
      id: '13',
      name: 'Ethan Rodriguez',
      content: 'The system is down, please check.',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '9:30 PM',
      isRead: false, // Chưa xem
    },
    {
      id: '14',
      name: 'Mia Martinez',
      content: 'Please confirm your attendance.',
      iconSource: 'https://i.ibb.co/Pw7xSFB/emPun.jpg',
      time: '10:15 PM',
      isRead: true, // Đã xem
    },
  ]);

  const handleSearch = useCallback(debounce((query) => {
    setSearchQuery(query);
  }, 300), []);

  const filteredData = useMemo(() => {
    return sampleData.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sampleData, searchQuery]);

  const renderHeader = () => (
    <TextInputComponent
      styleAreaInput={{ height: 40, width: "100%", alignSelf: "center", marginBottom: 20 }}
      borderRadius={20}
      borderColor={colors.grey}
      leftIcon={Icons.iconSearchBlackFull}
      placeholder={'Tìm kiếm tin nhắn'}
      onChangeText={handleSearch}
      style={{ marginLeft: 5 }}
    />
  );


  return (
    <View style={[generalStyles.container, { backgroundColor: colors.white }]}>
      <Header titleHeader={'Tin nhắn'}/>
      <FlatList
        data={filteredData}
        style={{paddingHorizontal:10, paddingTop:10}}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChatListComponents
            name={item.name}
            content={item.content}
            iconSource={{ uri: item.iconSource }}
            time={item.time}
            style={styles.listItem}
            leftIcon={item.iconSource}
            styleLeftIcon={styles.leftIcon}
            textContainerStyles={styles.textContainer}
            nameStyle={styles.name}
            contentStyle={styles.content}
            timeStyle={styles.timeContainer}
            timeTextStyle={styles.timeText}
            rightIcon={null}
            isRead={item.isRead}
            
          />
        )}
      />
    </View>
  );
};

export default Message;
