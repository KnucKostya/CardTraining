import { packsReducer, packsThunks } from "./packsSlice";

describe("packsReducer", () => {
  const initialState = {
    cardPacks: [],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 2000,
    minCardsCount: 0,
    maxCardsCount: 100,
  };

  const packs = {
    cardPacks: [
      {
        _id: "6453ff1f475a6822dce63b68",
        user_id: "644bf87c9fb0b5ac0d742663",
        user_name: "rchuchvaldev@gmail.com",
        private: false,
        name: "local pack",
        path: "/def",
        grade: 0,
        shots: 0,
        deckCover: "url or base64",
        cardsCount: 0,
        type: "pack",
        rating: 0,
        created: new Date("2023-05-04T18:53:19.047Z"),
        updated: new Date("2023-05-04T18:53:19.047Z"),
        more_id: "644bf87c9fb0b5ac0d742663",
        __v: 0,
      },
    ],
    page: 1,
    pageCount: 1,
    cardPacksTotalCount: 1,
    minCardsCount: 0,
    maxCardsCount: 78,
    token: "e0908fb0-eb1e-11ed-b359-fbf835b5a380",
    tokenDeathTime: 1683286136747,
  };

  it("should fetchPacks work correctly", () => {
    // 2. fulfilled takes 3 params:
    // 2.1. what thunk returns
    // 2.2. Await string. We would use "requestId" - like meta information
    // 2.3. what thunk takes
    const action = packsThunks.fetchPacks.fulfilled({ packs: packs }, "requestId", {});

    const state = packsReducer(initialState, action);

    expect(state.cardPacks).toEqual(packs.cardPacks);
    expect(state.page).toEqual(packs.page);
    expect(state.pageCount).toEqual(packs.pageCount);
    expect(state.cardPacksTotalCount).toEqual(packs.cardPacksTotalCount);
    expect(state.minCardsCount).toEqual(packs.minCardsCount);
    expect(state.maxCardsCount).toEqual(packs.maxCardsCount);
  });
});
