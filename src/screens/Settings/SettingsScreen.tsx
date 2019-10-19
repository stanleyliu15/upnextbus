import React, { useContext } from "react";
import { Linking, ScrollView } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { useSelector } from "react-redux";
import * as StoreReview from "expo-store-review";
import Constants from "expo-constants";
import { Feather, FontAwesome5, AntDesign } from "@expo/vector-icons";
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
import { selectAgency } from "../../store/features/nextbus";
import { Title } from "../../components/atoms";
import { enumKeyFromValue } from "../../utils";
import { NavigationProps } from "../../../types";
import { CloseButton } from "../Detail/DetailScreen";
import { space } from "../../styles";

const MyCloseButton = styled(CloseButton)`
  top: ${space.large};
`;

function SettingsScreen({ navigation }: NavigationProps) {
  const { navigate } = navigation;
  const theme = useContext(ThemeContext);
  const settings = useSelector(selectSettings);
  const agency = useSelector(selectAgency);
  const goBack = () => {
    navigation.dispatch(NavigationActions.back());
  };

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
              value={agency.name}
              onPress={() => navigate("ChangeAgencyScreen")}
            />
            <LinkItem
              title="Routes"
              description="choose which routes you want to see"
              onPress={() => navigate("FilterRoutesScreen")}
            />
            <LinkItem
              title="Distance Limit"
              value={`${settings.maxStopDistance} miles`}
              onPress={() => navigate("DistanceLimitScreen")}
            />
            <LinkItem
              title="Predictions Limit"
              description="the number of predictions per bus"
              value={settings.predictionListLimit}
              onPress={() => navigate("PredictionsLimitScreen")}
            />
            <LinkItem
              title="Route Name Option"
              description="change how you see the route name in the predictions"
              value={enumKeyFromValue(RouteNameOption, settings.routeNameOption)}
              onPress={() => navigate("RouteNameOptionScreen")}
            />
          </SectionContent>
        </Section>
        <Section>
          <GroupTitle>Appearance</GroupTitle>
          <SectionContent>
            <LinkItem
              title="Theme"
              value={capitalize(settings.themeColor)}
              icon={<FontAwesome5 name="adjust" size={22.5} color={theme.text} />}
              onPress={() => navigate("ThemeScreen")}
            />
          </SectionContent>
        </Section>
        <Section>
          <GroupTitle>App</GroupTitle>
          <SectionContent>
            <LinkItem
              title="Rate Us"
              icon={<AntDesign name="star" size={25} color={theme.primary} />}
              description="help us on the store!"
              onPress={() => StoreReview.requestReview()}
              externalLink
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
              icon={<Feather name="mail" size={22.5} color={theme.text} />}
              onPress={() => Linking.openURL("mailto://upnextbus@gmail.com")}
              externalLink
            />
          </SectionContent>
        </Section>
      </ScrollView>
    </SafeArea>
  );
}

export default SettingsScreen;
