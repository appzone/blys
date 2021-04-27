declare module "ReduxType" {
  import { StateType } from "typesafe-actions";
  export type State = StateType<typeof import("../store/reducers/index").default>;
}
