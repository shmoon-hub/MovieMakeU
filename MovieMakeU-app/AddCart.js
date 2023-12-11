import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAudioPlayer } from './useAudioPlayer'; // useAudioPlayer 임포트
// Firebase 설정 초기화 (이미 초기화가 되어있다면 생략 가능)
const firebaseConfig = {
  apiKey: "AIzaSyDljLuGD6TUhnkgezYrFtGeta4p9VwP1eQ",
  authDomain: "moviemakeu.firebaseapp.com",
  databaseURL: "https://moviemakeu-default-rtdb.firebaseio.com",
  projectId: "moviemakeu",
  storageBucket: "moviemakeu.appspot.com",
  messagingSenderId: "308608060636",
  appId: "1:308608060636:web:a7d7dac61ce6872fa1f819"
};
initializeApp(firebaseConfig);

const db = getFirestore();

const moviesData = [
  { 
    id: '1', 
    title: '아이유 콘서트 : 더 골든 아워', 
    image: require('./MoviePoster/IU_MoviePoster.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDyLqm85Ox7SzjZJ7XnBxIKk2mpck2wzQ_7-H4p9QKekvPPc9IOvs1td6Glh5sKQF21GZtGgA7nqG7bzatvMIQd89vv1Eepz8FZdvcaqozhQcff-_FCMGHk9RhZfPKBz5lj5vZgP_2s0UXYS6b6VBmxNBop_5fXnOlpAgZD_zLJ_gBrQPI5lV8uZsr0SDVcDoBeUCFHNKmfnrSsRTb3hQ_3fA6RCNtQGXtH0e__jJKOOJmH0MP-Q8co3IOFlFuO-PuL3INtMN5XdEyZM5_lm10sPXpI5qAKPAhX7ObTELi21FkXK6LrpHULeIZaj_9wV6ElC9dHXVE17l-m_tdcqDOqY_9noh0WPKIRk67hRnp6-hFcpEMz_B3eIopBQGjTFkAy7CQ8ZoDKkpl4ie-jEikhX6FGkBOyGI0GPBpK8WlWI-Z9HD9SL0Jbx_VSHOVas074QvqjEN-NSOSo4v98en7QrIqCyuRNILgL2PrpoNxWUVOzxm1lnBH8jbiB4hMaCXgtRFhCVL-4HWsqhtEe98vADvEtGWfrgPLncLeaNwz6omnRJFuuuel6e1A5FDd2MvVChiXHC5KfMaWslNfSUMWI8PkbH5F_q1Y78dOR9UzI4wZh4nsO8jETOKACHy4zzBWdwZwLRAq3DceXN64caYs645i_08GMflnbngFhAC0uNXUSvEZ2Jwx9EmvHj3uu4TqRQArKdJJ7RWjfIShRKEL5q8_gT3AK_BEMIh3woO6wKpZr9A7RAyrCW6tjx-oWJdqImKzKaLcLpGqZTU94Ebahd86jMuN8DTaHA22Sn99mOTCmjm4ykeXEZMI0cErh15bl2bMjL6-oP09YJOlJ7dRpfVrzzFacYpdbyydxlG47zP6Z4lY2anzbjVGXlgZ9Z7qMWYagWgh8qG28TKf7rrMIp3h19tHe5DX6tQbKdSDLqWNC2lwDjX37z6Bc7bsrxKV0WHtYOV-NSRWlwPhrvN9QJ8NC5-nbBTGSfPylNJ9hIqUnNHaKZGNB1bcmR68WEQe3gIZ2yXy3EIHXRVLlZ1rPSiv_rRMCiK31dTFFFoS6gbGv1hsBD4mC1-vzXM4LXZlTePIBVRt9IUQXq_samCUeJwx2l-4QeGMFHBXxa4w2jr134fibW1lbwE7VPq9G8Uteen8Q17Msl2T92qLNdsEhH1IkuAou9Yy6d6cZsquL0WNDOOKUEPI2yG07IHMLmrd6MiAyLVuIIY95OFzsvSClfCFySfQrkQpJ0dx_4bzbPvrmnD97tIXQAp0WUBwRJsrhDR4r76gcUfvq-yWQHE51jZwL_il7OfiFtJmTcQzBR6RMGv_m6VyDNBaP--Ult1xBTBtxnyJj6ZvKq-PBENxB5q-J-_rbmDXG2nW0o4Hc6fJ368IA3u57UmqLPbRkj6VVeE-rnG07SorwzK-U2UAwfFRJDYF7DcB8YjAXiMGy3e0jw-BqnSTVGH0RxEuETGzwjt_zUkzT8Z3mQzIwH1Ysm_qls99MOeG1TvHEmsFxeGzB9S_6wEns=w1640-h2360' // 가정된 이미지 URL => 구글 드라이브 주소로 변경후 저장
  },
  { 
    id: '2', 
    title: '잠', 
    image: require('./MoviePoster/Sleep_MoviePoster.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDwFr_jF8VkkhAgawuE76SRCFW3scBK6bc_J6hCl8fxgQOSGHKLE6RDu4Lv6fVydkK7SCZ_ObpnT8pyh-DKLiew7erpbULKpNjeKAV_ZVQZeKCgA-eMnB7n5PeQEDvUDJeWNJ4i35Gx6Eq3puxU8OVyrTawgwqTLNeoYVcmmICDNHXL_P0ltLZGcPEncoJLdzJ2KOUKcRzcmpmbo_EL8MbLzrnz5BTpire8d02SsmIKYjJHgJvJ3xAHsTfWNWjZcubC-ZtRDNlU6aVWkU9r9bt6e3r10FzBx3REiVZ0xEJ9Gabo_ErY0nTn_GON1y0rMBnwhdOcCRBLgWkc0_OHtZnrUUkCs2PQwcDnSLSBIhUtdkre-GqrjIEiyjFTSdeMpaT1yBh6MVBbXps4i-5ZKzHYYh2p_pRWKVDYNQ8CApozf78jf-CT1wCk0JX1JQxJJtHPLnE_dXVKzXa6i3SjD2-GgrTRClslVAS4gO7xs4yYwMOa3IS2Ml7HQBCh2OJ0Av7g4POWxeLZlroCIekjNdPlrOahptI6qR8mCbWwFRrEW5gVC9nYGkCdXVQyfPtmKAFFxuVqcSDJu1mBhSAERg_BSWJkhTHRvEmVx8wy45EN7oeqzH0c05Q3jZ1clnq4vlPnasucb6qlFZc6E17Xvq4UNdFH0B8gIilbi5j0LSy-RVy3fDil2ze7CtZQF6udWHKsloStfCzOu425hxjZk6ANJ6QOnh8zmnNGzmGuLl7zqectRZGxuITnQroNsfYhxpE4a28IufVA5ALKkbN57Ezul-aX2uC4cYG-X7vsKdWqCJgK3AE5cFGMvh0CQ9hagS_uphVOxs3jd5lYfS1iPtVd2Ieu0iSLHy6orWDDYzIwI1rJB3FK2gNcNlqi5nwVmQBC-yckwlEoVYa7jgfezDDtElCQ06I21ZJk1vhqCupJ_YpVP0k2flRNmOvusbcDVmrn2rtqqFHdOukqrU4NO_6PP2s8Gy81pdhtePSdwfiCiS8wZtc-k6UpYpc-6OscUC7bI6Wc_DZ5JW_b7jpiWxsA0NFdhHEB-Ep4nX8gyvl_aljlBY1tm7hiIRDsw9CVYB-lltvSrpm3yatJ8pVH7Cs93j69y-HQ8zG9qDwyjgEztC9JT_A6Cd3NZIaRBUN6O1d3uMxM9NvXfW9NTx7_Amj6ZEj-zhxSsc8l8d4AQe_pd2a_4VwbMuw5jKLw-m3LQ2dcljlQxBdJPJ1Ag4FKNh5TIOLEW7Aoa0iuwUDDqFu_MjbvqHqh8A-aoX19zKE1IkWPfwhSWMWbR17zvVnwJ0P2AZ5vLnHWh6vgqGPTrA6PP_hbRc1_OsiBqxHr3DuewjYSDDkx1niaW-YyBvkrn5gTC8AnBk9FuVLHkbauMWkYLzY5Jp89XnVRx_bn5KEDwnfjBLuLWWtkoGPXy5E9rn8xKUn8CLMX19_paAL47_USd0Ta-peSiPZKtymNIZ138Ex-EUUD2A1T8uGDUv5k04xziAnOtQ0_mgvF9URAo2NDCTy5KFVwqkro=w1640-h2360' // 가정된 이미지 URL
  },
  { 
    id: '3', 
    title: '베니스 유령 살인사건', 
    image: require('./MoviePoster/Venice_MoviePoster.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDydS-pK-zNK5m39naTNth1yaACbAsJ7lWOC7Sv-ZT7Ahl6j_qo4lUXC2PHDqdDHGyjxQCXmunsgCHiA2KYQQwd59ILsz2bqDLwNJLVaHmadqjzzM84tPkKr6NCpm5owsRCl_y7lXhHvw4_QyORYz_KESWf4MaPAXdiP4K0ZXyj0ECsiOPJt4QaPCRwwIGFmpmfE5waUm4W-ycIP5aBQ5uk3y7W2Eau-PAVhhd8drHCXujsgU-QlR3RYmMgXBsiNd6wBD-5DeQ6ynxDvHIwDrzFCe95bATMSX6LBSoAG6Zm6gURpd7xgZa6QsTWxEnxBIvWRHtrSQ91CegbGr1AUaLGHZqzvvSmZGGI8-i1b7IH3NH9PYPopGpv_1G_InTgWXWeNYmj4oAhQ8xw8C9nxI9wEYdtRQh-YmY9L9WNmKs__PQJObdZzPOCjVQ6YJj_YsmHShDrWol9Tbp5EDlZE5kZRL6CzsX_yRhfqWztU4_yK17vwqHbbt6ZwEvHnnUBXbqWfHRi_nvjViDTZZHtY7QwsA4HVsyLMDEpjmnyarOMVN0h74bkGGAzeLoXZ21MXghgYUgCArcDEGI-XwRq9iTvCMezNYiW3EXhVMnBuRZuQHSDPH6SeuP1jadnQ3y4azivk_J7yEDvY_h1bp2A9fezoEYJ5SdQtzLTi7AbukQo2zg_Tz3qdysFUGjhbeaIb5QJgRJrEbZfIFHOik0kKLfMISJ4L6e1rtgk2IHzKA4QXuvOgEYWfs92KqLIyLNviA3UXnkH2YjTQ3O8x5s1rN4rDUwBNV25zgUdN0ahuL07f6cZKdkcoZfQsQt-4afCPv8xMN_sBqGmx00SFlIxG5PoJmQKJcucAP0unkFTLEvyP-IQtfh5qZoguLf0MbhfMwr2nF4pF4TiWwP0w5pESbG0qkWKQa23dkg_TM255RG7iHQP8BhRDO2YLC38EUqiF03Cfx8U6RLYXaMsaXLV2_hpVLtMIw79YbTST7rPDXXnbTfhu67zdQ3HYvCocTFQieborzhEcY7p31toYYYUYvO7GBWV8JOst_ZKk5Qlhis3A1Yz2uGTaOspQX95Iwp2Qj262x1sCt178aHoQ29Jhc4H4Z5EVCVNWHRoaK2k0rtrFbnFXqIy31DuOwgCuCWHtM94FqwAVksPIceQtdn5xNX3jZktD6vbnIZT8tzu4hvP0nFjDtw_LOUEJonEpm0DnQhevG8c7jHlQ0ZLtACz9SPquIS8USfKsTQH6N0zpcLWDmetw4ovN6qCZ7ixBE5CemWB1Dj0D_rOuFul1BsKbpeljEqRE0o_fh7nEEESSBkLnP8NdVGz6Vuyoz0IyPJLrH8ykRllSOXJtHdMsDhb7xP2HMjZ0faiG97hNjEprLWuvZWYk6Kp-lVFCK9iYLrTysmmu3IAA7X2-iIwGRsDVe1U2qTYfFoCQqA9kX21qMBHWjYK1GkZ8-X-kYlFUWasAcjAMTgMYR9rSOXoyuyvnO2QKpvyrqGrOBP79CqV7PyF2w-9jptRKBU8=w1640-h2360' // 가정된 이미지 URL
  },
  { 
    id: '4', 
    title: '천박사 퇴마 연구소 : 설경의 비밀', 
    image: require('./MoviePoster/DR.Cheon_MoviePoster.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDzq9rSCJXNLRScsw0B_cHnP_5RK9md6P4U9u6eoRrAdaG0yTtRWy1_NYAvt9CbDoySZPiqTLLayvG_AcJXXGzvHBF4puTk_eqXhx1KWNgfLCXxUvzhgA4Zi2shmzux8gD7Um_xihc5k3dWmg9S9JWMkQnrva2QaqJwU8yyPeDDGsMtlKeD5i07qg3_YjGUKhyjdR_dwPKzlBSrOLvVe9JReCO2upqWkX3xh9HVQEbKyQOyd8tZYeQmDNOHLyX857X0yHVIcXXvAtNd04X3YjbASOBXUemznr0N6M09wXij4XkAbTWtMDfSk4BMp_aJZhRyDyss-hLLr5mOKg96cT4L6kDhT5dfU3SZT6lFbjm4a-BxAFsdIltfz8zP0B8AKKssKwc5N-CcAzMhIVKCLPFN6iuiLw-UpwWDgdvxii1z-Cav-GtPj1dUVvBsJACkY1PgBjVJ5QDhhoulQ1m95RodJCBYKeKhaHEDt2HdWAelhL94S95msUzsQCP02hsD-mlfUEqBUk5uUM0aWkAUkS9w_K2YX4AfEPYFsXuXqwGfuRQOiMiDlocABfrqJLZcyaQA_MbWykoMN5h4nbEZCpqCFTTIIxeZ8ZH3rmWlewwsIZkJPnfJDo6WMPvPF0RA06TCv4PkU145lfM3udV1iWyU9d_ioJBkJLBaqv16Wkqdv86-g-QnB4Wuqx_ki6X0HJ24i5vMW6OcHqhxG4MSNwTtz3VfSh9gzeVj6G_a0XRPO_gMzv6JciSlV5Fzbuhzlo5TRGsJ17bllMPnyeriBaf33jPom6z8ag3dZLZtkGbIhNhK70cnO3qoALICibh9SNf5l2DkBRX8wzYcid87DN4rRkhco-xl44pWqx0orTE9N5Gi2SJIDdBLeVHYLJfKfmHxZcTAEGt_7oBfvoGEhEUf_OXVi6_d4Ut4uP9JXhzIImVY9DAE8t2zwffcu9UB7W9RK0JON3wVojPtzka5YfnqoYwk7NnBCWwE5sEtAlEBlgn7SRy9hk2pfqK-fQKccKLbejAvA7SIPZZg2YRtLVlg_CJ2815a39bJM6oGa_r7d2Ct5R2BIViM3fHHGg6Pxu3Qz6iLJVPyDioEI3X5CYpcKRTKwS3ECHmc8BQRo1umSweMp3mDRRk1El72GZ02XvHdOJE84BVZUSpluuX68mSWjJ9I5Lt-v7oWnlpM6QahC-BnPVoXRDq4IE0Q-HM9TmeLoCgnBL4_tVypXio8Hv0xzxxrVsDVD5LejznRcZh3HAD0a3fGaz_sSQeYDUh6cS7B7_49btFsGNwt-NcvSoQgmXv73MW7Hy2lXgW4gGDOV9cwROxGCqo_ji06xmwAWZNYWIBlAQJ4FGGyTSdbS1G-iMaSw75RxpS5TKsTSfwY3iranOvzLUmIA74pl5gqV6agAdjcuPQQdsHvS7IvbEYZQ29y_0BTjrnmbUSfFQZ_nOibLUxb4z4MrDG5ZGm9mYIF4MA8g6SvxE9Oo7ds3xvvbQMB09KD0nRBF5D9W_NEXFyn4ShaKT4s=w1148-h1652' // 가정된 이미지 URL => 구글 드라이브 주소로 변경후 저장
  },
  { 
    id: '5', 
    title: '가디언즈 오브 갤럭시: Volume 3', 
    image: require('./MoviePoster/GOG_MoviePoster.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDzHqlU5mWxISFbp7E4W2quFE9rz0FMSlKXwUbTXnKtqQZvEsLSfy7yR33bmXHQAOlRXowxqrUhsq0N07B2cL9EzwGmTbR0Ri9wIvdgZnuI9Tafp6EhsI2599w5QciDsZpqycZ7K-UdaLmHxDtj_48e6fKIUHtFEMG0y67uixxGNSQsuOzvgLaVHy7xmJ4uPBMHyZrFv0k92bEOiuflgueTgLweTn0dJfPh0ycV8oA5nCepME6RFMY_bLK8JDmhWOyDR9MkAmfAndEA8EFnW0P21YdROGqv4pMaxwKCSY5xXVO84VD0J-BrHqOFsyg07INQ0rbd_Ekx8bdeLtUW7T4UwTHq4xMIKFdaagUM-H16zDHbr1n5g8YB0l1wD2-rv9ZVsI2Q-oamc52dCH8qhgJ1fKQNNvziJIupCT-uZ18VK_T-ctt5Sfc4R2DNKbu-5wzpCC1UfnZOIy_8Y15ql6Gg8Qq9JPGgKzK-cEWOAoUyfhkmqR7xdydGbh1QsdLf7HYqOIHkjFkl4vaGpJ7kLoW0vKzMgzAk6Q00fFCwzA5Eo8O_EhuObmMRXUcAtBrBgodJ7RZPfL7PUc0yfcJ7Au1_dbcc3Qu4EiHbTJVI2tMJLjLQq6FBWtzhO1aY-6jcjVG_ZRgG1FizMIQc5-G3nk60maZjwgXSJmDmibItP2xVu9VBA1d86Q1Rsx4SjY19w6_9L8SsMlV9Gzhz3LwJUA3-VYGh8xhv9RLr4C1lTSMm_gMUOktaKHadLIIBY3NkxMLo103Ie2NRaXUgcxvwYxrth-hdkYXY1eSFwyynNuJ36ceZS589skMPHWvJ09GhqOBdMVI6jNa3DwX6YAUFfW0rPu6jIQmjznus9WewdIIDO23QqgEfKb5Rk-rohqytz32Y9bo3k708Q2JXz1SOyGrYqa_HsitwrOGoExB2ILV7Dvhtzl3G8ou59tBDpXok4BpcvDZVi35O-HWZ2syQQu0vRu-qXFtQRtG5utpLDMihnj5p-LV6hNY9vUw4rW04X6i3vVBVIt-rTGAGgNz-njkTfNkNmLbBKHcIYVyhwUV9JIB3eQ4SK4Ig03qIIaGL0h6MOzGAPW0bSqlPrGPGhIPZNPeb8kClnp5IrHyyQ7CoNvAwEjCJVAKtheb8BuhyXavE2aId74yO19FCp_iFYwMXybtBzALZlVtGjOc16fBNMF2AT0mum9gk4S-D04TavkQyuiZc3u-NoQLf5ve-vk1f4ahp-nu-NXUtI84g973dYD-svT_9S_3WvEOa8rMhn0z0kX57bjVrJYxs10eqmVzLRuPSIH_oR_2ILqlEpwQsxz1iRahKGXKlxueHMN66lGUY-LLfUNJGNjCK6DkzGclDF_mpuFRr2HyjNluoDzmFx98nFI_YtvmkOPZwzK1F_ZdBTPbOlV1teoKXnVme3QbH2EgHRdv9E_SttqGVzFfGLOdu_LvmDcAge-U_OG6_UWIw7Y44SIH2psOdjIan4HpOPZvvfheawDL2KcqpsygxebfE_4QXsaxk=w1148-h1652' // 가정된 이미지 URL
  },
   { 
    id: '6', 
    title: '서울의 봄', 
    image: require('./MoviePoster/1212 The Day.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDyn7MVYxYBHeaEaY1jYmRK2Ht9EmWmlFNr7UFdcon9helRlxYe-8lGjgs_fFgDhknDiwAglNcAbceFF4BHEKPf2St82yS1WyRmZymZNodBOXg_hGGl13f4fdq9iE4Dt-llxW0uiT8w68bk28AONMS12NZwKdbHUZvQEDL9AMBt2cDU0eYHKhxQ027N79jAeFPwZnEhcJ16yiPHs2-9TuCMFNCWb7HmcuekqkXi3altm9TbKONSx5J6QAV2CxhML9uFxS5V7R37LECjsOEyWVIFIgA_oY1AtS0dcABEhNohWPt7ilKnNk2OLNfkhEtAo5aVR5f6sCHvL_7q8PmDHZLvbbZzUIpOTnK89sfkwKB1K9JVbJPARScGVRxLBGKWYjN8V_B8xleIgfrkyHdJznMKxASHfaEeOpz9Re63blmT8NVho1uHGAgfWpcOpS2QzCDYnUVvx17C9xRh43ej-83Mhx11fhZ7hDlumVvQLBQRJ3Qg2p12yUwajAL-50dnlMlT3MLex6gyA8g2Uq0uJhwJ54uPGHGMhVF1JzeHvmYm9TFi6keCGA0yfA5jR4vK0khYaBxB8iIJ6oIBIZi_1KI2C4BGPu8pxoHnso2adQpu8rfn5BJPMW0sFdDWrDx9qiJtj8bBTRWl8lKAOZsnRjGaX3vrqKg6KqB8hRjYKvkFH8o-hbviqWHR0I-JhnQ-nu1bKZSlu1yWSIxGZNMv-1FoQhdAJ7WS5-U4P16-edioDfHfnT5fuRhqKDgPtpzQKrCGbjN2ymX4YEEqO2g5qkUrR3VszjDIdFGKEujfLggZ8DWNkIxCaOOtmujmZ5lZyRFcOMZZB8OSTn1wIV80x0_6CClbOJM9ZTS6nOnp19pSpO7N_HJwCaRTpS23pxaJSaGImYHn_zVRk3MJ2p9Wfpet_6SpDUYykjQRBEHAFqXT5oXQYIfvd-p_tIcla5fsUMHDLcOQDfBzKkUYGK0RK16mSJpTl82ck75bYjJsGFipey8F7Kcr_4dZb-Gf17VuMTva5GqayOfouT2saoKRT6T6Jima_sAFFcn6yhq7u_7AKI4BxUVxbXtsiBB2J0EoZ8N6VZ37i0DwBg7O6IrDk05jtN0aIwkCwGDspHiJxTm5H6IGAfICRG6rkRtw54Yy3758W-r4M9cPNm-JdzEQR0V0MKUiOpgeUuBB0QZaaWyPpxBARtwVRkGiV7Db4reYqOwHuS0UJHz6f9aEClu8jHEnjWiXHC81U1UGx3wqwOuDXlZQRDBXZ8e30LwIAgjuOu9W0mqdbbSSxpZ5XY1K1HRa9uGHiv1SIlo4kBxlZiEApnr9imXxFXCwXLR1WyWjjlZhfSuVrAQ1wI3Y6TwGb5cVsEbv5RKA95YnZjGmy1SlkrKbWih6F4Z0vIpBkKg-8id4qOaMLy379FNso_wdv1DCKZiGpCfSXr5uY1A-jXsBmtq4wFCIW2oRckk0A-emgpKuCfDyoKO0hyjaEiVWaG8kkGtRcmkvhZdYlMdxQ_c1-dPUa5_Hz1aI=w1640-h2360' // 가정된 이미지 URL
  },
  { 
    id: '7', 
    title: '3일의 휴가', 
    image: require('./MoviePoster/Our Season.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDyLkATmHwsFOqpTlLPk7E8N8T1JTVuXc19cExX7NAtIpj2On8sqDPIi0n0ZOJIhNUDTC1zBal_u-628Q1PxFBwsPf_p3fLiyTngJUd-bKwALunLs4MNj_NBr4HJGmAeAKrxhoUZ_QJLibC1sLa3h8yeF4LHBG_El6cQVmjp_oBEgXKmaga3BZNCnqPEp2ExHFKfwAlBUcnr6AKyW2L8LMFT4ZBQ9BIrUBlbZvTEK3LNuoJ7IHA6WMzCgoaRDrVFqYd6v2saTEYdej5qr4O69m1k6vNyV_FmgT1dYvLBILPi2Uwrw0je-Y4bUuBCH90VQQv4dm35ZfNg6hsaZnL8mRkSiMRHbwRCd_N_qQudx2dNanLFnUygFcdJMa4cM73IqhGYl95Xko08oSheoVO0S1bEL28oQX9VCXgiLTgXIELMmXEJOJ1i4VAzSbkfRIrYw95Jjxv-L_SSYMzVYBXtE-QWWdidWgzA9dUsC00Gd29rdbsRviUCojIH_NtsXgLGVyN9jDy4eN2zz9zka5HJvDfs24XipucgqDqHNcX4osIbiQ-_jxRMzt986xvWyivGeZKdDKUoz5DmGP4gkHbD8fKhM2FldvYdJl7yuezX1N6yrDVOIgFjjcSqvKuab03OEsyNcgQCLMzq_h8WZNaDQ-X4b09wlUKzBbCwPKHJZ4yDfs7UF7mZQkG9Omr1thJTUx--CGvK8YSjOQ31GKO9_7O2zvrlq6NDfei042s4S2H0ckAQCmiBx8qCuK9BxVvJCAMPIna3b0mZUwYareE7JCamM25ywNl58xo5ona4w74DbjTsD1uHV_SAnMAhSKP9JLeLebfcvhe7qYwyFPdqm0jIFv5Qj5FZghoc3mgd_PAhtZbeTARfD8tFQaT_A20vTLyGbDFYoopV4SUKN6eEDgWpddqUhEeZyt6qfOacc1tLRi1kpS8bbMM3PSrI7TB16lxm_op94N4AF2hI9lAZZdOy1L_Kd-Litcwl6B5KZK6kmAvSGOLEv2hkS74h4KThymidWxS7I9PoeqiBfxRJfqKXTQTHfXiz1L_X3WRwljhA0H7BfSmoU-DVUSpRSpW1FLdCP2r1TgMiYt8XBgAcAARg5yp9DXwkw3f_aii8zRyGqVrGMV4uw_zPhQB-zHCONXO2uIoThOPB-Uq7tKX3HGEk1bnM-4qKqpWJ9oc2JvBjyIrJOEaChH4hK-EIr5qBVnO62n0bJY28_Pp5sDuWHlEpjaDLDRpqI6Bmj-xKmdORTYQkjj44_UGgGTyy5mPNUMMlAPEUMHXVcDd3B1Cd5pUimyrLo_uxt7bazNgs3McvsQurovpDJ_Fg57zXZPTY4IUkuuHLFIOpH4fFZ7fOFJqSBK7hLhD1_Ioxl_T-zj5ShjRw9WeBkTvAKVPWUF62LPb1s8Vkz558Gjab02l0m8BJyYOtWUh16YKTGYSTYWN2LW61Ew5BaGRkXSf4sHtUBJDNIpzPZbeZWVTgRkGacp8JpxGski9i9H3NAV5b3svuJ_7fnf_GkzQ=w1640-h2360' // 가정된 이미지 URL
  },
  { 
    id: '8', 
    title: '겨울왕국2', 
    image: require('./MoviePoster/Frozen II.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDx96RFN_0XcJDuxh4YFGrHY6tBpu4XRjVURvZC4GH_6elzsDDPaG2nmmfyVGPfTm5NninNCmaGCYYNxkyC1eH_ZhfEe83lodUlhN4x0ByO7YxojXHInM0J679sLMlKVlyyejiqAHaJFcvabNCnWDA4WHSnNdrTlH21tIehwvHUA0fGy7YnOlUBlNIAZzvVEn6HOkhuy-tHWLqOMXqNIhvAmzcfpvjo7aJOCzHc_5ngHDLJ1W4OR65DipQ4Q_dh2IymEn_BqcDkhxtiuh7dbtqffgsuMzFKcHp0zD16v0ujaMLOd6vYfrAuOqPA9UMFcML50Che-RMOGgD1DJqAvXnvjEJ6DOV2XA7ZDuE29Z3tS2hchgiHm5T7VRJ8so209V95rflCv4fl_eQZqlVaK7l5l_AfXqR9VqIVJoaSV0Y_smqwKRCmPj0duR9xLL9OyXPjwPcOXlqgB5zcggpFO7D1Nc4IMrB2Xq-TxN5nnbbsJ6A5ZnFDKloHV8eV_-apX7tdG_uYMwwgkvFPfalfQFIb5e69KqPVX85QRrOjlgWLgrXOR9dlEwX66w80X6rJNqigWlkSMgkD43IK_pFezVipOmWCXqSgOOtdIn_1_tQoju09g6S4_P6BGqe0oZC1eIkbQL8uIfh-kE0w4XID1IaafdrR3xFtwQi_sEdzKNb7YhlLT_U4EF6YHQeUHFAhoRDDQXWMwYXYwrAly7c3EWvPRsKW10Z8iXLFYgQr-hmSAq61qudG6LmrrpzfYQYNBiaEyncJO5D03bT1UdXWZcMlED0ZnWnUTvgPgVyV65jTATGquniWPI5VIr7WT_k4LkpfBMyjadq2lOy4PlBtzF05VIr2LkfjkcFEEPPbmYVz4DFH6H6yCeak8qXp5isXlPvMXHXQT3AAcYjHdzlvtselxVuHSchJKyjdRhPK5fEyHJKsvv95frjl7BO-9KMGfHcMmjb1wCNUreoVEyFpTq9rBu07IBrwgjTeDr3HA0Q74jZ7b_cHUqglbjm3n9gaDfKB9ciel1yLnNtZt_omO0oQX3kIv7kg3DMKT2mUbVQdpNKy3nJVb6TS203l9iAMrYtZz3k3OAMWjkSuCH10NcVCq_t5_KqQWTBbDHiY2Ta5WD0Be74XK7N9d70ByWrb88yqJWzv3znSdht3khrQt5qf6bW_dSapO3hWXyc9pausBabth4cTFo_0pqTUL9UxcM1t-F1tYEviApWDEsc7pMFStl3fN0rgnamn9a5qGph3ggdl1rqH2SnoFLYd_jSjSxTDWr2BpXvmYKKfYaQRRaJr_Jyr3XmnVL-fdE-ADv8zBqGZI4g1Cl_JtQgGGDcIO-_mVtuQPsUE8WeY-HNlxC_rdL4bWbWRxksnPERF02RNvbQFqwq4ow_X0mtsGjXJ6XlIj-0XMXFgNVKoQQTfoOKfEj4kryB-HdULOXafJiPn585a98MMz6OPeWfLoEXRfh18hgz8hsXjDlaMOY_zZc3d_VBTzl5bhZCiuWt2DEjnh8cZd7qNv7Uw=w1920-h945' // 가정된 이미지 URL
  },
  { 
    id: '9', 
    title: '싱글 인 서울', 
    image: require('./MoviePoster/Single in Seoul.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDxq9GYlc24JpBxGjPTy33qH01do_4KoH4KjW5sugMeR9Vq-Jsxc4jaUcGB6b7o0wtjSdH4UgFi-GTw9oA2MPZ8zFThWe83JTLMtavSWNaWhPtJf8ynYRmBeBUCGHa9lUGnOAmBcwDCx6tAIsJuK9JO8E82Sg4mlWU1AGpEhvawF43I4gWnoPO4KYmjrf5d704mDmZg0eBlZWW31OR1uoTdu4i6AcVsrpr3uYp8kB7MVzJPmcLOqTfvILJGSqBnsWnzXKGHq_09FcMnwH4KN8v7c2NZL8SHMktL4jUEqmQTbwDjpg90PUtF4ubttcmw63QY81ihRkk8_5nePxsQNo82bRpk2tmzd7o2Hhjsc43dFmU_COSGqYeldEwGktkxx4Ip2RAoDtP19vGi5fRUSre_ye-d7uTp_uNCsB1oTYlVki76dfa1imEUaQgsxx9MSO-5LmSXS2dkX9i2f4pYGliHagc5CxS_wlQVSWo5swjPQhH3ROWXbIGkriJbnBTCN4L06MHR7zuLxw8JLLCASmK_IZlscxdvMXH0bt-yEqG9eU4sVS2ntKsumOhw7EgxxgXos2B8R0B7L1rZ1xQIlD5mRGwERy-o2kcJweRV5DnnIRiebcbJRJNknjACuY5ogNHfr1GgEe3TNzBxQ10xM93WzonhTmky0AOEIblkjPgHIBCKktO4kflS1qfmhClQ02yXoCdTz8akX_TK5VApPUdT745moxzpRSK_b5mtDsEbTBPFp77iqnZo7o8LnAD209YWx6fwcwZbeMU3ubkuXJ99TGfbB0Z3-UdBQk7SOMhKOEkONFi8u-5JNYbxdNUBMFBJ4wX7Q1IRH55eV6VVeFaAaoxhhKFlJxapW109cs7lzKR56lDD1p9993OtvD31j2TkCXEeG0K0Mzh7z4x8AFCXr6_ybWAJ9HFauB3PIM5FkLZDpDigR9tXEDWfD1TtjgfqsG7Al-V0A6C5hZ-65M8C6srlHsC0u9XWSosDs5h-y3iEB_W0shrHIJFv41OR1gb95SDMCmwboJYMlrPpOTqUyvuGjDB9J1_VVCDLzoo7QCN4NinYcRNzj39BeHeQANUIhRxP6YzKAlxIS9RC_A4pSThFAJ2aVBEfAT28m2Bm06q-Lbreoa3qi0s9BCA3gv-ogPPIb7TvVcIdnIR8VNvwFPIptkv1DLGTmg90P9wi7sj-v_vmv1gTTGHSTwawLqwnwwIMFj8hKjXxrLrF-hdDK1eYea7tAGOIjaAmpvs3SzZC5yq8x1E4jInt7bZqsihkTgwTeRg_KFUfqpzaBpReSI0_LIsh5BeDEqzUlKXN4rPGMOempfpDjaiIoriYkpAN5KvEMbkp01EhHr2awYxjAq-1lfIBlZpkXbwDwb4SrvSMSurOL5FkVDB4HWiaLajlIhOL1Lc4ZygD2tQfsLDp7XTNf6Dv4TIrI8KlALbYuBCTYgTwsRvX14JgBs5DV_7jze1NbUR7C_Asg4AzLsaPPrqER_ZilTEzp5JHY60HbicCJpQwTQFA=w1640-h2360' // 가정된 이미지 URL
  },
  { 
    id: '10', 
    title: '프레디의 피자가게', 
    image: require('./MoviePoster/Five Nights at Freddy.png'),
    imageURL: 'https://lh3.googleusercontent.com/fife/AK0iWDzy3Vl-_CTE967nWyIogcyhdmd68y09Clgm3BQJjKt1c6HNS7Z59pMI0YvO9yD0ociKjma1E8TOJeXaeV_6ngznf7EFNln-ZD1cDIoiUyAm7nkXHrIxWhwh2Z5hbDC18MIhLXYkBmEYU99OZqxjj_siWNt5dHmuthhk2ymCyLN29_y90Nb7GWmn-2ozs5M3UtjMm2TRg9Qk3cvrS93ZfAgOuZ_G7xJEYqRQa1Z607rIefLP1Na3hIKmPFVekb3ndQU40W50wOO0vMzX6hPe1HGfNpTabqyXqxFr-iXOY5UM_o81U3XvAQ0sPjXABVtzKPLwy_QUnpHmvx_xsrbmarpy9fXTSsIBvgJzAR3bHMDyNc8Te-v023WDz_Qb4gcwYr-Nrq1s7pk-J6MJXS6rjCghy9NJb7iSk-IsoI6th2qEX2jdUBZnnMJStAHnWdDgDmI2KaEhg4MpATOZLsWCd2-GQ-cQvWjuX8ckKxTNUtLhHoBZJDIawdf-jkMotpAv0TCc2LCixuhY1DDsWdFWvQfmDVWN7ZPHzQLGplBYDRxUotgWRvoporST_0d_cOdZQnd7ccp2V_c5SsRJKA5Syc01vXxWTgqdYt4a8qNq7DmbvjT12B5ymiEXLa3hLWJcTMW4kRlgtZ7QBJ5qHuupMc9taadIcM2VL76gAO1E3rfAvWD-TMkWhvZ1RtuB1SjJLjY_ee6sp1p_kQA0PSasmna0XxyHhhOlPsrrTlBoCZTuQzpv3551Lpt_4mtpLRlJSmm3U6AtXpJ_slLM7qtfeoJqayUnhPig_BpwEOunU2VJXKtmTvhigLpjw1pawvARnA8cv5eVDin0mnh8zhTXSrB9Ys8YQ02J69HFMP1S2cN4WDVWLVR2Im0TWcmLPaSwrw1C1qYfzrNjzIZngw8cvQQNevl8zG9dbWG896857_11fBifu_M08vb16dojQKk5j0K-3P_mDmgrmccXgPWRoSxJp792GL79uyIGwFkpbFktmK2ey1ElihgHJgcGGkMWJ6VU8feaePw8nUwU50Pp2CRghD27eJM6oejmmiw2wDL2rIQAv_sI_iZxwcVF0mLwkdknNrH6GXVIWo6J2h8v8TdMjXjToZwG34BrunsWTJbqvfCsZwflQ0WH7IYi4Z33ppDGhIUEeT414Q3utgTGlbaR8JUZC2sChnYtWzD98ZW5OSRyjqtBC0NDXLEqzT8-cmzXS4sRMaUkfEl2BUjYfJsaTcDB0I382ECPlVBrQHpQotQOaGWdCzSSRRTtGRfNnZl7LrkJY-fv_7UbUspcrDp-KzTZ2HOhjix7bW6fvdyv0fVdvg4kVy7DqHhm62HowUl9jvW9Su3hhsabHwpGPkgyy1xWwPm2dd7gMk8yPdnBieUoNPl5UKDdBWxFZJeG_iKa2XoJ5cXruGnIXxZi13j3E6zHt5BRCHzlopxymWSvhtICvmN92iAiQOblTIjx7MMx4rYhaskloR26xAtmp4YhQj0-eX7VJPAgOyLQu5Xn0Uxkq8WwpvY=w1640-h2360' // 가정된 이미지 URL
  },
];

export default function AddCart() {
  const [selectedMovies, setSelectedMovies] = useState({});
  const navigation = useNavigation();
  const playSound = useAudioPlayer(); // 오디오 재생 함수

  const handleSelectMovie = (id) => {
    const selectedMovie = moviesData.find(movie => movie.id === id);
    setSelectedMovies((prevSelectedMovies) => ({
      ...prevSelectedMovies,
      [id]: prevSelectedMovies[id] ? undefined : {
        title: selectedMovie.title,
        imageURL: selectedMovie.imageURL
      }
    }));


  };

  const handleAddToCart = async () => {
    playSound();
    try {
      for (const movieId in selectedMovies) {
        if (selectedMovies[movieId]) {
          const movieQuery = query(collection(db, "selectedMovies"), where("movieId", "==", movieId));
          const querySnapshot = await getDocs(movieQuery);

          if (querySnapshot.empty) {
            await addDoc(collection(db, "selectedMovies"), {
              movieId: movieId,
              title: selectedMovies[movieId].title,
              image: selectedMovies[movieId].imageURL
            });
          }
        }
      }
      // Firestore에 저장 후 Cart.js로 이동
      navigation.navigate('Cart', { selectedMovies });
    } catch (error) {
      console.error("Error saving selected movies to Firestore: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Checkbox
        value={!!selectedMovies[item.id]}
        onValueChange={() => handleSelectMovie(item.id)}
        color={selectedMovies[item.id] ? '#4630EB' : undefined}
      />
      <Image source={item.image} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>추가할 영화 선택</Text>
      <FlatList
        data={moviesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.movieList}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>장바구니에 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieList: {
    alignSelf: 'stretch',
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  movieImage: {
    width: 50,
    height: 75,
    resizeMode: 'contain',
  },
  movieTitle: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#0000ff',
    padding: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
