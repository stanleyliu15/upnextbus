import React, { useContext, useEffect } from "react";
import { Linking, ScrollView } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import * as StoreReview from "expo-store-review";
import Constants from "expo-constants";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import capitalize from "lodash/capitalize";

import { NavigationActions } from "react-navigation";
import { LinkItem } from "../../components/organisms/Settings";
import {
  Section,
  GroupTitle,
  SectionContent,
  Version
} from "../../components/organisms/Settings/settingsStyles";
import SafeArea from "../../layouts/SafeArea";
import { selectSettings, RouteNameOption } from "../../store/features/settings";
import { selectAgency, getAgencies, selectAgencies } from "../../store/features/nextbus";
import { Title } from "../../components/atoms";
import { enumKeyFromValue } from "../../utils";
import { NavigationProps } from "../../../types";
import { CloseButton } from "../Detail/DetailScreen";
import { space, ThemeColor } from "../../styles";

const MyCloseButton = styled(CloseButton)`
  top: ${space.large};
`;

// TODO: reverse background colors

function SettingsScreen({ navigation }: NavigationProps) {
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const settings = useSelector(selectSettings);
  const agencies = useSelector(selectAgencies);
  const agency = useSelector(selectAgency);
  const goBack = () => {
    navigation.dispatch(NavigationActions.back());
  };

  useEffect(() => {
    if (agencies.data.length === 0) {
      dispatch(getAgencies());
    }
  }, [agencies.data.length, dispatch]);

  return (
    <SafeArea>
      <ScrollView>
        <Section>
          <Title>Settings</Title>
          <MyCloseButton onPress={goBack} />
        </Section>
        <Section>
          <GroupTitle>Preferences</GroupTitle>
          <SectionContent>
            <LinkItem
              title="Agency"
              loading={agencies.loading}
              value={agencies.loading || agencies.error || !agency ? null : agency.name}
              onPress={_event => navigate("ChangeAgencyScreen")}
            />
            <LinkItem
              title="Routes"
              description="choose which routes you want to see"
              onPress={_event => navigate("ChangeFilterRoutesScreen")}
              prioritizePropertySpace
            />
            <LinkItem
              title="Distance Limit"
              value={`${settings.maxStopDistance} miles`}
              onPress={_event => navigate("ChangeDistanceLimitScreen")}
            />
            <LinkItem
              title="Predictions Limit"
              description="the number of predictions per bus"
              value={settings.predictionListLimit}
              onPress={_event => navigate("ChangePredictionsLimitScreen")}
              prioritizePropertySpace
            />
            <LinkItem
              title="Bus Naming"
              description="choose how you see bus names"
              value={enumKeyFromValue(RouteNameOption, settings.routeNameOption)}
              onPress={_event => navigate("ChangeRouteNameOptionScreen")}
              prioritizePropertySpace
            />
            <LinkItem
              title="Show Inactive Buses"
              value={settings.showInactivePredictions ? "Yes" : "No"}
              onPress={_event => navigate("ChangeShowInactivePredictionsScreen")}
              prioritizePropertySpace
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
                <FontAwesome5
                  name="adjust"
                  size={20}
                  color={settings.themeColor === ThemeColor.LIGHT ? "#ff9506" : "#9852f9"}
                />
              }
              onPress={_event => navigate("ChangeThemeScreen")}
            />
          </SectionContent>
        </Section>
        <Section>
          <GroupTitle>App</GroupTitle>
          <SectionContent>
            <LinkItem
              title="Rate Us"
              icon={<AntDesign name="star" size={20} color={theme.primary} />}
              description="help us on the store!"
              onPress={_event => StoreReview.requestReview()}
              externalLink
              prioritizePropertySpace
            />
          </SectionContent>
          <Version center>{`Version: ${Constants.nativeAppVersion}`}</Version>
        </Section>
        <Section>
          <GroupTitle>Support</GroupTitle>
          <SectionContent>
            <LinkItem
              title="Contact Us"
              description="tell us what you think!"
              icon={<Feather name="mail" size={20} color={theme.text} />}
              onPress={_event => Linking.openURL("mailto://upnextbus@gmail.com")}
              externalLink
              prioritizePropertySpace
            />
          </SectionContent>
        </Section>
      </ScrollView>
    </SafeArea>
  );
}

export default SettingsScreen;
