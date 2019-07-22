export default (responseJson: any) => {
  const { preds } = responseJson;

  if (preds.length > 0) {
    // the first item in preds is already sorted to be the nearest to the location
    return preds[0].agency_tag;
  }

  return null;
};
