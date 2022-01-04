import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useComment} from './hooks/useComment';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewComment,
  deleteComment,
  deleteCommentMyImg,
} from './redux/account/actions';

const {width: screenWidth} = Dimensions.get('window');

const ImageView = ({navigation, route}) => {
  const {index, images, screen} = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);
  const [isVisible, setIsVisible] = useState(false);
  const [currentComment, setCurrentComment] = useState();
  const {getComment} = useComment([]);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const partnerDetail = useSelector(state => state.home.partnerDetail);
  const [currentData, setCurrentData] = useState();
  console.log('asd currentComment', currentData?.images[currentIndex]);

  useEffect(() => {
    if (screen !== 'Account') {
      setCurrentData(partnerDetail);
    } else {
      setCurrentData(userData?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, partnerDetail?.images, userData?.data?.images]);

  useEffect(() => {
    const comment = getComment({
      comment: currentData?.images[currentIndex].comment,
    });
    setCurrentComment(comment || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, currentData]);

  const handleOpenModal = () => {
    setIsVisible(true);
    const comment = getComment({
      comment: currentData?.images[currentIndex].comment,
    });
    setCurrentComment(comment || []);
  };

  const header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingTop: 35,
          justifyContent: 'space-between',
          position: 'absolute',
          width: '100%',
          top: 0,
          zIndex: 100,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" color="#fff" size={24} />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <SimpleLineIcons name="trash" color="#fff" size={22} />
        </TouchableOpacity> */}
      </View>
    );
  };
  const footer = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1001,
          height: 50,
        }}
        onPress={handleOpenModal}>
        {/* <TouchableOpacity>
          <AntDesign name="hearto" color="#fff" size={22} />
        </TouchableOpacity> */}
        <Text
          style={{
            flex: 1,
            fontWeight: '700',
            marginLeft: 20,
            marginTop: 15,
            color: '#fff',
          }}>
          Comment ({currentData?.images[currentIndex].comment?.length || 0})
        </Text>
      </TouchableOpacity>
    );
  };
  const handleSendComment = () => {
    dispatch(
      addNewComment({
        id: screen !== 'Account' ? partnerDetail?.id : userData?.id,
        data: {
          images: (currentData?.images || []).map((image, i) =>
            i === currentIndex
              ? {
                  url: currentData?.images[currentIndex]?.url,
                  comment: [
                    ...(currentData?.images[currentIndex]?.comment || []),
                    {
                      comment: text,
                      id: userData?.id,
                    },
                  ],
                }
              : image,
          ),
        },
      }),
    );
    setText('');
  };

  const handleDeleteComment = i => () => {
    if (screen !== 'Account') {
      dispatch(
        deleteComment({
          index: i,
          url: currentData?.images[currentIndex]?.url,
        }),
      );
    } else {
      dispatch(
        deleteCommentMyImg({
          index: i,
          url: currentData?.images[currentIndex]?.url,
        }),
      );
    }
  };

  return (
    <>
      <ImageViewer
        index={currentIndex}
        imageUrls={images.map(e => ({url: e.url}))}
        renderHeader={header}
        renderFooter={footer}
        footerContainerStyle={{
          backgroundColor: '#4e4c4c',
          width: screenWidth,
          height: 50,
          borderRadius: 10,
        }}
        onChange={i => {
          setCurrentIndex(i);
        }}
      />
      <Modal
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}>
        <View
          style={{
            flexDirection: 'row',
            opacity: 5,
            height: 50,
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: '#f1949421',
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}>
            <EvilIcons name="arrow-left" color="#000" size={30} />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontWeight: '700',
              marginRight: 20,
            }}>
            Comment ({currentData?.images[currentIndex].comment?.length || 0})
          </Text>
        </View>

        {currentComment?.map((item, i) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#4e4c4c3d',
            }}>
            <Image
              source={{
                uri: item?.avatar,
              }}
              style={styles.avatar}
            />
            <View style={{flexGrow: 1}}>
              <Text style={{fontWeight: '700'}}>{item?.petName}</Text>
              <Text>{item?.comment?.comment}</Text>
            </View>
            {item?.comment?.id === userData?.id && (
              <TouchableOpacity
                style={{marginRight: 15}}
                onPress={handleDeleteComment(i)}>
                <Feather name="delete" color="#000" size={20} />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <View
          style={{
            width: screenWidth,
            position: 'absolute',
            bottom: 0,
          }}>
          <TextInput
            onChangeText={e => setText(e)}
            value={text}
            underlineColorAndroid="transparent"
            placeholder="Leave your comment here!"
            placeholderTextColor="#2f33374f"
            style={styles.input}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              right: 10,
            }}
            onPress={handleSendComment}>
            <Feather name="send" color="#FF8C76" size={30} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
    margin: 10,
    marginLeft: 20,
  },
  input: {
    color: '#000',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#f1949421',
    elevation: 5,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: screenWidth - 60,
  },
});
