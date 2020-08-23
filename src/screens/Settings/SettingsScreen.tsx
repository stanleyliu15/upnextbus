import React, { useEffect, useCallback } from "react";
import { Linking, ScrollView } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import * as StoreReview from "expo-store-review";
import { capitalize } from "lodash";
import { CommonActions, CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Application from "expo-application";

import { LinkItem, Title, Icon, SafeArea, IconButton, SwitchItem } from "../../components";
import { Header, Section, GroupTitle, SectionContent, Version } from "./settingStyles";
import { selectAgency } from "../../store/features/root-selectors";
import {
  selectSettings,
  selectShowInactivePredictions,
  setShowInactivePredictions,
  selectShowRouteIdForDisplay,
  setShowRouteIdForDisplay
} from "../../store/features/settings";
import { getAgencies, selectAgencies, getRoutes, selectRoutes } from "../../store/features/nextbus";
import { SettingsStackParamList, RootStackParamList } from "../../../types";
import { ThemeColor } from "../../styles";
import { useDispatch } from "../../store";
import { email } from "../../config/consts";

type SettingsScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "SettingsScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "SettingsScreen">;
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const agencies = useSelector(selectAgencies);
  const routes = useSelector(selectRoutes);
  const agency = useSelector(selectAgency);
  const showRouteIdForDisplay = useSelector(selectShowRouteIdForDisplay);
  const showInactivePredictions = useSelector(selectShowInactivePredictions);
  const isLightTheme = settings.themeColor === ThemeColor.LIGHT;
  const toggleShowRouteIdForDisplay = useCallback(
    () => dispatch(setShowRouteIdForDisplay(!showRouteIdForDisplay)),
    [dispatch, showRouteIdForDisplay]
  );
  const toggleShowInactivePredictions = useCallback(
    () => dispatch(setShowInactivePredictions(!showInactivePredictions)),
    [dispatch, showInactivePredictions]
  );
  const sendEmail = useCallback(() => {
    const openEmailUrl = async () => {
      try {
        const emailUrl = `mailto://${email}`;
        const supports = await Linking.canOpenURL(emailUrl);
        if (supports) {
          Linking.openURL(emailUrl);
        } else {
          console.log("Email url is not supported");
        }
      } catch (error) {
        console.error(`Unable to open email url: ${error.message}`);
      }
    };
    openEmailUrl();
  }, []);
  const goBack = useCallback(() => {
    navigation.dispatch(CommonActions.goBack());
  }, [navigation]);

  useEffect(() => {
    if (agencies.data.length === 0) {
      dispatch(getAgencies());
    }
  }, [agencies.data.length, dispatch]);

  return (
    <SafeArea inverse>
      <ScrollView>
        <Header>
          <Title>Settings</Title>
          <CloseButton onPress={goBack} iconSize="sm">
            <Icon icon="MaterialCommunityIcons" name="close" size="sm" color="text" />
          </CloseButton>
        </Header>
        <Section>
          <GroupTitle>Preferences</GroupTitle>
          <SectionContent>
            <LinkItem
              icon={<Icon icon="FontAwesome5" name="building" size="sm" color="green" />}
              title="Agency"
              loading={agencies.loading}
              value={agencies.loading || agencies.error || !agency ? null : agency.name}
              onPress={() => navigate("ChangeAgencyScreen")}
            />
            <LinkItem
              icon={<Icon icon="FontAwesome5" name="route" size="sm" color="orange" />}
              title="Routes"
              description="choose which routes you want to see"
              onPress={() => navigate("ChangeFilterRoutesScreen")}
              prioritizePropertySpace
            />
            <LinkItem
              icon={<Icon icon="FontAwesome" name="heart" size="sm" color="red" />}
              title="Favorites"
              onPress={() => navigate("ChangeFavoriteStopLabelsScreen")}
            />
            <LinkItem
              title="Distance Limit"
              value={`${settings.maxStopDistance} miles`}
              onPress={() => navigate("ChangeDistanceLimitScreen")}
            />
            <LinkItem
              title="Predictions Limit"
              description="the number of predictions to show"
              value={settings.predictionListLimit.toString()}
              onPress={() => navigate("ChangePredictionsLimitScreen")}
              prioritizePropertySpace
            />
            <SwitchItem
              title="Route Name"
              description="display route names using the route ID"
              enabled={showRouteIdForDisplay}
              onSwitch={toggleShowRouteIdForDisplay}
            />
            <SwitchItem
              title="Show Inactive Buses"
              enabled={showInactivePredictions}
              onSwitch={toggleShowInactivePredictions}
            />
            <LinkItem
              title="Update Routes"
              loading={routes.loading}
              onPress={() => dispatch(getRoutes())}
              hideLinkIcon={true}
              showBottomBorder={false}
            />
          </SectionContent>
        </Section>
        <Section>
          <GroupTitle>Appearance</GroupTitle>
          <SectionContent>
            <LinkItem
              title="Theme"
              value={capitalize(settings.themeColor)}
              icon={
                <Icon
                  icon="FontAwesome5"
                  name={isLightTheme ? "sun" : "moon"}
                  color={isLightTheme ? "orange" : "purple"}
                  size="sm"
                />
              }
              onPress={() => navigate("ChangeThemeScreen")}
              showBottomBorder={false}
            />
          </SectionContent>
        </Section>
        <Section>
          <GroupTitle>App</GroupTitle>
          <SectionContent>
            <LinkItem
              title={`Rate ${Application.applicationName}`}
              icon={<Icon icon="AntDesign" name="star" size="sm" color="yellow" />}
              onPress={() => StoreReview.requestReview()}
              externalLink
              prioritizePropertySpace
            />
            <LinkItem
              title={`Contact ${Application.applicationName}`}
              icon={<Icon icon="Feather" name="mail" size="sm" color="blueIndigo" />}
              onPress={sendEmail}
              externalLink
              prioritizePropertySpace
              showBottomBorder={false}
            />
          </SectionContent>
          <Version
            align="center"
            color="gray"
          >{`Version: ${Application.nativeApplicationVersion}`}</Version>
        </Section>
      </ScrollView>
    </SafeArea>
  );
};

const CloseButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.backgroundLight};
`;

export default SettingsScreen;
