import { instance } from "common/instance/instance";

export const cardsApi = {
  getCards: (packId: string) => {
    return instance.get<GetCardsResponse>(`cards/card`, {
      params: { cardsPack_id: packId, pageCount: 6 },
    });
  },
  removeCard: (cardId: string) => {
    return instance.delete("/cards/card", {
      params: {
        id: cardId,
      },
    });
  },
  addCard: (packId: string, question?: string, answer?: string) => {
    return instance.post("cards/card", { card: { cardsPack_id: packId } });
  },
  editCard: (cardId: string, question: string) => {
    return instance.put("/cards/card", { card: { _id: cardId, question } });
  },
};

export type GetCardsResponse = {
  cards: {
    answer: string;
    question: string;
    cardsPack_id: string;
    grade: number;
    shots: number;
    user_id: string;
    created: string;
    updated: string;
    _id: string;
  }[];
  packName: string;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};
