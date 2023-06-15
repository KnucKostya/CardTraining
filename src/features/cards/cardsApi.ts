import { instance } from "../../common/instance/instance";
const testiD = "6487562faa11d8a942e76123";
// 6487562faa11d8a942e76123

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
    console.log(packId);
    return instance.post("cards/card", { card: { cardsPack_id: testiD } });
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
