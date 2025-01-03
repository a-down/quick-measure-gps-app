import { Redirect } from "expo-router";
import * as Updates from "expo-updates";
import { useEffect } from "react";

// eslint-disable-next-line react/display-name
export default () => {
  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  const onFetchUpdateAsync = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      if (__DEV__) console.log(error);
    }
  };

  return <Redirect href="/MeasureTab" />;
};
