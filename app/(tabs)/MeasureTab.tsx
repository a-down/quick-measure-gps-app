import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter, useFocusEffect, useNavigation } from "expo-router";
import { regular, semibold, bold } from "../../hooks/useJostFont";
// TODO: Fix this import
// eslint-disable-next-line import/no-unresolved
import walkingIcon from "../../assets/walking-icon.png";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useStorage } from "../../hooks";
import {
  AdsConsent,
  BannerAd,
  TestIds,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import Purchases from "react-native-purchases";
import * as StoreReview from "expo-store-review";
import { getVersion } from "react-native-device-info";

export default function App() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const navigation = useNavigation();

  const [savedMaps, setSavedMaps] = useState([]);
  const [removedAdsSubscription, setRemovedAdsSubscription] = useState(false);
  const [canRequestAds, setCanRequestAds] = useState(false);

  AdsConsent.requestInfoUpdate().then(() => {
    AdsConsent.loadAndShowConsentFormIfRequired().then((adsConsentInfo) => {
      // Consent has been gathered.
      if (adsConsentInfo.canRequestAds) {
        setCanRequestAds(true);
      }
    });
  });

  useFocusEffect(
    useCallback(() => {
      getRecentlySaved();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getSubscriptions();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      checkReviewCriteria();
    }, [])
  );

  const checkReviewCriteria = async () => {
    let reviewStatus = await useStorage("get", "reviewStatus");

    if (reviewStatus !== null) {
      const currentVersion = getVersion();
      if (reviewStatus.version !== currentVersion) {
        reviewStatus = {
          ...reviewStatus,
          version: currentVersion,
          hasReviewedVersion: false,
          requiredActions: {
            measured: false,
            saved: false,
            viewedSaved: false,
          },
        };
        await useStorage("set", "reviewStatus", reviewStatus);
      }

      // if user has not reviewed current version, has completed the required actions in the current version, and has not been prompted to review in the last 30 days
      if (
        !reviewStatus.hasReviewedVersion &&
        reviewStatus.requiredActions.measured &&
        reviewStatus.prevReqDate < Date.now() - 2592000000 &&
        reviewStatus.significantEvents >= 5
      ) {
        setTimeout(() => {
          promptReview(reviewStatus);
        }, 5000);
      }
    } else {
      await useStorage("set", "reviewStatus", {
        version: await getVersion(),
        hasReviewedVersion: false,
        requiredActions: { measured: false, saved: false, viewedSaved: false },
        prevReqDate: 0,
        significantEvents: 0,
      });
    }
  };

  const promptReview = async (reviewStatus) => {
    const isAvailable = await StoreReview.isAvailableAsync();
    if (isAvailable && navigation.isFocused()) {
      await StoreReview.requestReview();
      const newStatus = {
        ...reviewStatus,
        hasReviewedVersion: true,
        prevReqDate: Date.now(),
      };
      await useStorage("set", "reviewStatus", newStatus);
    }
  };

  const getRecentlySaved = async () => {
    const value = await useStorage("get", "savedMaps");
    if (value !== null) {
      const reversed = value.reverse();
      const numberOfMaps = reversed.length < 3 ? reversed.length : 3;
      setSavedMaps(reversed.slice(0, numberOfMaps));
    } else {
      setSavedMaps([]);
    }
  };

  const getSubscriptions = async () => {
    Purchases.configure({ apiKey: "appl_pmyciWqwEhvyqdONNdqJmpItUzd" });
    const customerInfo = await Purchases.getCustomerInfo();
    if (customerInfo.entitlements.active["remove_ads"] !== undefined) {
      setRemovedAdsSubscription(true);
    }
  };

  const pageLinks = [
    {
      link: "/AutoMeasureScreen",
      title: "Auto",
      description: "Measure automatically with GPS",
      icon: "satellite-dish",
    },
    {
      link: "/ManualMeasureScreen",
      title: "Manual",
      description: "Measure manually with GPS",
      icon: "plus-circle",
    },
    {
      link: "/TapMeasureScreen",
      title: "Tap",
      description: "Measure anywhere by tapping",
      icon: "gesture-tap",
    },
  ];

  const Icon = (name) => {
    switch (name) {
      case "satellite-dish":
        return (
          <FontAwesome5
            name={name}
            size={40}
            color="#6DAB64"
            style={{ textAlign: "center", marginBottom: 4 }}
          />
        );
      case "gesture-tap":
        return (
          <MaterialCommunityIcons
            name={name}
            size={40}
            color="#6DAB64"
            style={{ textAlign: "center", marginBottom: 4 }}
          />
        );
      case "plus-circle":
        return (
          <FontAwesome5
            name={name}
            size={40}
            color="#6DAB64"
            style={{ textAlign: "center", marginBottom: 4 }}
          />
        );
    }
  };

  return (
    <SafeAreaView className="bg-green-9 relative flex-1 items-center w-full h-full">
      <StatusBar style="light" />

      <ScrollView
        className="w-full h-full absolute"
        contentContainerStyle={{ alignItems: "center" }}
        alwaysBounceVertical={false}
      >
        <View className="bg-green-8 w-[1060px] aspect-square absolute -top-[640px] rounded-full"></View>

        {!removedAdsSubscription && canRequestAds && (
          <BannerAd
            unitId={
              __DEV__
                ? TestIds.BANNER
                : "ca-app-pub-2810780842614584/5731645735"
            }
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
              keywords: [
                "outdoors",
                "farming",
                "sports",
                "herbicide",
                "corn",
                "soybean",
                "seed",
                "truck",
                "horse",
                "tractor",
                "hobby farm",
              ],
            }}
          />
        )}

        <View
          className="items-center justify-start mb-4 mt-4"
          style={{ gap: 24, paddingTop: removedAdsSubscription ? 24 : 0 }}
        >
          <Image
            source={walkingIcon}
            style={{ height: 115, width: 80, marginRight: 12 }}
          />
          <Text
            className="text-white text-center"
            style={[bold, { fontSize: 24, maxWidth: 200 }]}
          >
            Easy Tools for a Quick Measure
          </Text>

          {/* <Pressable onPress={resetCriteria}>
            <Text className="text-green-5 underline" style={[regular]}>Reset Review Status</Text>
          </Pressable> */}
        </View>

        <View
          className="w-full items-center rounded-lg"
          style={{
            width: width - 32,
            marginTop: removedAdsSubscription ? 16 : 0,
          }}
        >
          {pageLinks.map((item, index) => (
            <Pressable
              className=" bg-gray-1 active:bg-gray-2 flex-row justify-between items-center p-4 w-full rounded-md"
              onPress={() => router.push(item.link)}
              key={item.title + index}
              style={{ marginBottom: 16, gap: 24 }}
            >
              <View className="justify-center items-start mt-1">
                <Text
                  className=" text-green-10 text-center"
                  style={[semibold, { fontSize: 22, lineHeight: 24 }]}
                >
                  {item.title}
                </Text>
                <Text
                  className=" text-gray-7 text-center text-wrap overflow-ellipsis"
                  style={[regular, { fontSize: 15, lineHeight: 17 }]}
                >
                  {item.description}
                </Text>
              </View>
              {Icon(item.icon)}
            </Pressable>
          ))}

          <View
            className="w-full mb-2"
            style={{ marginTop: removedAdsSubscription ? 24 : 8 }}
          >
            {savedMaps.length > 0 && (
              <>
                <Text
                  className="text-white mb-4"
                  style={[bold, { fontSize: 20 }]}
                >
                  Recently Saved
                </Text>

                {savedMaps.map((map, index) => (
                  <Pressable
                    className="p-4 bg-green-8 rounded-md mb-2 flex-row justify-between items-center active:bg-green-7"
                    onPress={() =>
                      router.push({
                        pathname: "/SavedMapScreen",
                        params: { map: JSON.stringify(map) },
                      })
                    }
                    key={index}
                  >
                    <View>
                      <Text
                        className="text-green-1"
                        style={[semibold, { fontSize: 18 }]}
                      >
                        {map.mapName}
                      </Text>
                      <Text
                        className="text-gray-1"
                        style={[regular, { fontSize: 12 }]}
                      >
                        {map.dateCreated.split("T")[0].split("-")[1]}/
                        {map.dateCreated.split("T")[0].split("-")[2]}/
                        {map.dateCreated.split("T")[0].split("-")[0]}
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={24} color="#E7F8E6" />
                  </Pressable>
                ))}

                <Pressable
                  className="w-full flex-row justify-center items-center mt-2 mb-4 active:opacity-80"
                  style={{ gap: 8 }}
                  onPress={() => router.replace("/SavedTab")}
                >
                  <Text className="text-green-1" style={regular}>
                    See all saved maps
                  </Text>
                  <Feather name="chevron-right" size={16} color="#E7F8E6" />
                </Pressable>
              </>
            )}
          </View>
        </View>

        {!removedAdsSubscription && canRequestAds && (
          <React.Fragment>
            <Pressable
              onPress={() => router.push("/PurchaseScreen")}
              className="active:opacity-40"
            >
              <Text className="text-green-5 underline" style={[regular]}>
                Want to Remove Ads?
              </Text>
            </Pressable>

            <BannerAd
              unitId={
                __DEV__
                  ? TestIds.BANNER
                  : "ca-app-pub-2810780842614584/5261668603"
              }
              size={BannerAdSize.BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                keywords: [
                  "outdoors",
                  "farming",
                  "sports",
                  "herbicide",
                  "corn",
                  "soybean",
                  "seed",
                  "truck",
                  "horse",
                  "tractor",
                  "hobby farm",
                ],
              }}
            />
          </React.Fragment>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
