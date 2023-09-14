import { cardsActions, cardsReducer, cardsThunks } from "features/cards/cardsSlice";
import { GetCardsResponse } from "features/cards/cardsApi";

describe("card Slice", () => {
  const initState = {
    cards: {} as GetCardsResponse,
  };
  it("should change cards pack name", () => {
    const action = cardsActions.addPackName("new pack name");
    const newState = cardsReducer(initState, action);
    expect(newState.cards.packName).toBe("new pack name");
  });

  it("should fetchCards work correctly", () => {
    const card: GetCardsResponse = {
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

    const initState = {
      cards: {} as GetCardsResponse,
    };

    // @ts-ignore
    const action = cardsThunks.getCards.fulfilled({ card }, "requestId", {});

    const state = cardsReducer(initState, action);

    expect(state.cards.cards).toEqual(card.cards);
  });
});
