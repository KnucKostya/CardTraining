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
  addCard: (packId: string, question: string, answer: string) => {
    return instance.post<PostCard>("cards/card", { card: { cardsPack_id: packId, question, answer } });
  },
  editCard: (cardId: string, question: string, answer: string) => {
    return instance.put("/cards/card", { card: { _id: cardId, question, answer } });
  },
};
//TODO typisate api Response

export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
};

export type GetCardsResponse = {
  cards: CardType[];
  packName: string;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export type PostCard = {
  card: {
    cardsPack_id: string;
    question: string;
    answer: string;
    grade?: number;
    shots?: number;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    answerVideo?: string;
  };
};
