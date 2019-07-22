import { parseBoolean, arrayify } from "../../../utils/utils";

const parseDirection = (direction: NextBusAPI.Direction): NextBus.Direction => ({
  id: direction.tag,
  name: direction.title,
  shortName: direction.name === "" ? null : direction.name,
  useForUI: parseBoolean(direction.useForUI),
  stopIds: arrayify(direction.stop).map((tagObject: NextBusAPI.TagObject) => tagObject.tag)
});

export default parseDirection;
