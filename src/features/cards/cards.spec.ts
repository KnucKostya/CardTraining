import { cardsActions, cardsReducer, cardsThunks } from "features/cards/cardsSlice";
import { GetCardsResponse } from "features/cards/cardsApi";

let initState = {
  cards: {} as GetCardsResponse,
};
let card: GetCardsResponse;
beforeEach(() => {
  card = {
    cards: [
      {
        answer: "string",
        question: "string",
        answerImg: "string",
        questionImg: "string",
        cardsPack_id: "string",
        grade: 2,
        shots: 2,
        user_id: "string",
        created: new Date(2012, 0, 1),
        updated: new Date(2012, 0, 1),
        _id: "string",
      },
    ],
    packName: "string",
    cardsTotalCount: 2,
    maxGrade: 2,
    minGrade: 2,
    page: 2,
    pageCount: 2,
    packUserId: "2",
  };
});

describe("card Slice", () => {
  it("should change cards pack name", () => {
    const action = cardsActions.addPackName("new pack name");
    const newState = cardsReducer(initState, action);
    expect(newState.cards.packName).toBe("new pack name");
  });

  it("should fetchCards work correctly", () => {
    const action = cardsThunks.getCards.fulfilled(card, "requestId", { packId: "1" });

    const state = cardsReducer(initState, action);

    expect(state.cards).toEqual(card);
    expect(state.cards.packName).toEqual(card.packName);
  });
  it("should removeCard work correctly", () => {
    const action = cardsThunks.removeCard.fulfilled({}, "requestId", { cardId: "1" });

    const state = cardsReducer(initState, action);

    expect(state.cards).toEqual({});
  });
});
