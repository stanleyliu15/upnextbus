const parseAgency = (agency: NextBusAPI.Agency): NextBus.Agency => ({
  id: agency.tag,
  name: agency.title,
  region: agency.regionTitle,
  shortName: agency.shortTitle
});

export default parseAgency;
