import React, { useEffect } from "react";
import { Linking, ScrollView } from "react-native";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import * as StoreReview from "expo-store-review";
import Constants from "expo-constants";
import { capitalize } from "lodash";

import { NavigationActions } from "react-navigation";
import { LinkItem, Title, Icon, SafeArea, CircleIconButton } from "../../components";
import { Header, Section, GroupTitle, SectionContent, Version } from "./settingStyles";
import { selectSettings, RouteNameOption } from "../../store/features/settings";
import { selectAgency, getAgencies, selectAgencies } from "../../store/features/nextbus";
import { enumKeyFromValue } from "../../utils";
import { NavigationProps } from "../../../types";
import { ThemeColor } from "../../styles";

const CloseButton = styled(CircleIconButton).attrs(({ theme }) => ({
  underlayColor: theme.background,
  iconSize: 20
}))`
  background-color: ${({ theme }) => theme.backgroundLight};
`;

const SettingsScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();
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
    <SafeArea inverse>
      <ScrollView>
        <Header>
          <Title>Settings</Title>
          <CloseButton onPress={goBack}>
            <Icon icon="MaterialCommunityIcons" name="close" size={22.5} color="text" />
          </CloseButton>
        </Header>
        <Section>
          <GroupTitle>Preferences</GroupTitle>
          <SectionContent>
            <LinkItem
              title="Agency"
              loading={agencies.loading}
              value={agencies.loading || agencies.error || !agency ? null : agency.name}
              onPress={_event => navigate("ChangeAgencyScreen")}
              includeBottomBorder
            />
            <LinkItem
              title="Routes"
              description="choose which routes you want to see"
              onPress={_event => navigate("ChangeFilterRoutesScreen")}
              prioritizePropertySpace
              includeBottomBorder
            />
            <LinkItem
              title="Distance Limit"
              value={`${settings.maxStopDistance} miles`}
              onPress={_event => navigate("ChangeDistanceLimitScreen")}
              includeBottomBorder
            />
            <LinkItem
              title="Predictions Limit"
              description="the number of predictions per bus"
              value={settings.predictionListLimit.toString()}
              onPress={_event => navigate("ChangePredictionsLimitScreen")}
              prioritizePropertySpace
              includeBottomBorder
            />
            <LinkItem
              title="Bus Naming"
              description="choose how you see bus names"
              value={enumKeyFromValue(RouteNameOption, settings.routeNameOption)}
              onPress={_event => navigate("ChangeRouteNameOptionScreen")}
              prioritizePropertySpace
              includeBottomBorder
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
                <Icon
                  icon="FontAwesome5"
                  name="adjust"
                  size={20}
                  color={settings.themeColor === ThemeColor.LIGHT ? "orange" : "purple"}
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
              icon={<Icon icon="AntDesign" name="star" size={20} color="primary" />}
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
              icon={<Icon icon="Feather" name="mail" size={20} color="yellow" />}
              onPress={_event => Linking.openURL("mailto://upnextbus@gmail.com")}
              externalLink
              prioritizePropertySpace
            />
          </SectionContent>
        </Section>
      </ScrollView>
    </SafeArea>
  );
};

export default SettingsScreen;
