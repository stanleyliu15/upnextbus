import { selectAgencies } from "./nextbus";
import { selectSelectedAgencyId } from "./settings";
import { RootState } from "../types";

export const selectAgency = (state: RootState) => {
  const agencies = selectAgencies(state);
  const agencyId = selectSelectedAgencyId(state);

  return agencies.data.find(agency => agency.id === agencyId);
};
