import { instance } from "../../common/instance/instance";

export const cardsApi = {
  getCards: () => {
    return instance.get<GetCardsResponse>(`cards/card `, {
      params: {
        cardsPack_id: "64820d3d8f5de40420e18921",
      },
    });
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
