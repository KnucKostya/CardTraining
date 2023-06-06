import { instance } from "../../common/instance/instance";

export const cardsApi = {
  getCards: () => {
    return instance.get<GetCardsResponse>("cards/card");
  },
};

export type GetCardsResponse = {
  cards: [
    {
      answer: string;
      question: string;
      cardsPack_id: string;
      grade: number;
      shots: number;
      user_id: string;
      created: string;
      updated: string;
      _id: string;
    }
    // ...   ????????????????????????????????????????????????
  ];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};
