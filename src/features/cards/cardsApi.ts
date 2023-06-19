import { instance } from "common/instance/instance";

export const cardsApi = {
  getCards: (packId: string, page?: number, pageCount?: number, cardQuestion?: string) => {
    return instance.get<GetCardsResponse>(`cards/card`, {
      params: { cardsPack_id: packId, page, pageCount, cardQuestion },
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
  editGrade: (payload: EditGradePayloadType) => {
    return instance.put<EditGradeResType>("/cards/grade", { ...payload });
  },
};
//TODO response types

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

export type GradeType = 0 | 1 | 2 | 3 | 4 | 5;
export type EditGradePayloadType = {
  grade: GradeType;
  card_id: string;
};

export type EditGradeResType = {
  updatedGrade: {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    grade: GradeType;
    shots: number;
  };
};
