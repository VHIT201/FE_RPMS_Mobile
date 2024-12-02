import React, { useState, useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ButtonComponent from "../Button";
import generalStyles from "../../styles/generalStyles";
import { Icons } from "../../assets/icons";
import Config from "../../configuration";
import { IntroImage } from "../../assets/images";
import styles from "./postStyles";

export default function PostComponent({
    userInfo,
    content,
    like,
    comment,
    share,
    t
}) {
    const getUserAvatar = useCallback(() => {
        if (!userInfo) {
          return Icons.iconUserGrayC4Full;
        }
        return { uri: Config.URL_IMAGE + userInfo.avatar };
    }, [userInfo]);

    const [openModal, setOpenModal] = useState(false);

    const toggleModal = useCallback(() => {
        setOpenModal(prevOpenModal => !prevOpenModal);
    }, []);

    return (
        <View style={styles.postContainer}>
            <View style={[generalStyles.flexRow, styles.postHeaderContainer]}>
                <View style={[generalStyles.flexRow, styles.alignCenter]}>
                    <Image source={getUserAvatar()} style={styles.postAvatar} />
                    <Text style={styles.userNameText}>
                        {userInfo?.name == null ? 'Unknown User' : userInfo.name}
                    </Text>
                </View>
                <TouchableOpacity onPress={toggleModal}>
                    <Image
                        source={Icons.IconThreeDots}
                        style={styles.threeDotsIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <Text>{content}</Text>
            </View>
            <View style={styles.contentImageContainer}>
                <Image
                    source={IntroImage.introJoinGroup}
                    style={styles.contentImage}
                />
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={[generalStyles.flexRow, styles.centerContent]}>
                <ButtonComponent
                    style={styles.postButton}
                    text={like > 0 ? like.toString() : 'Like'}
                    leftIcon={Icons.iconHeartOutLine}
                    styleIcon={generalStyles.smallIcon}
                    textStyle={styles.buttonText}
                />
                <ButtonComponent
                    style={styles.postButton}
                    text={comment > 0 ? comment.toString() : 'Comment'}
                    leftIcon={Icons.iconMessageOutLine}
                    styleIcon={generalStyles.smallIcon}
                    textStyle={styles.buttonText}
                />
                <ButtonComponent
                    style={styles.postButton}
                    text={share > 0 ? share.toString() : 'Share'}
                    leftIcon={Icons.iconShareBlackFull}
                    styleIcon={generalStyles.smallIcon}
                    textStyle={styles.buttonText}
                />
            </View>
            {openModal && (
                <View style={styles.modal}>
                    <ButtonComponent
                        style={styles.modalButton}
                        text={t('Save_post')}
                        leftIcon={Icons.iconPin}
                        styleIcon={generalStyles.smallIcon}
                        textStyle={styles.modalButtonText}
                    />
                    <ButtonComponent
                        style={styles.modalButton}
                        text={t('Delete_post')}
                        leftIcon={Icons.iconCancel}
                        styleIcon={generalStyles.smallIcon}
                        textStyle={styles.modalButtonText}
                    />
                    {/* <View style={styles.modalArrow}>
                        <Image style={styles.modalArrowImage} source={Icons.iconPoligon} />
                    </View> */}
                </View>
            )}
        </View>
    );
}
