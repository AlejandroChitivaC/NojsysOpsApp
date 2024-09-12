import { Dispatch } from "@/app/entities/Dispatch";

export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Preinspection: {data:any, houseNo?:any};
  SearchMaster: undefined;
  HouseDetails: undefined;
  Dispatch: undefined;
  DispatchDetails: { dispatch: Dispatch }; 
};
