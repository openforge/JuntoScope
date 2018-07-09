import * as RouterActions from "./router.actions";

describe("Router Actions", () => {
  describe("Go Action", () => {
    it("should create action", () => {
      const payload: RouterActions.NavigationOptions = { path: ["/login"] };
      const action = new RouterActions.GoAction(payload);

      expect(action).toEqual({
        type: RouterActions.RouterActionTypes.GO,
        payload
      });
    });
  });

  describe("Back Action", () => {
    it("should create action", () => {
      const action = new RouterActions.BackAction();

      expect(action).toEqual({
        type: RouterActions.RouterActionTypes.BACK
      });
    });
  });

  describe("Forward Action", () => {
    it("should create action", () => {
      const action = new RouterActions.ForwardAction();

      expect(action).toEqual({
        type: RouterActions.RouterActionTypes.FORWARD
      });
    });
  });
});
