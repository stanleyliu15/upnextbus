import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Image } from "react-native";
import { enableScreens } from "react-native-screens";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

import store, { persistor } from "./src/store";
import fonts from "./src/config/fonts";
import images from "./src/config/images";
import Root from "./src/Root";
import { Loader } from "./src/components";

enableScreens();

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

const App: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      const imageAssets = cacheImages(images);
      const fontAssets = cacheFonts(fonts);

      await Promise.all([...fontAssets, ...imageAssets]);
      setReady(true);
    }

    prepareApp();
  }, []);

  if (!ready) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
