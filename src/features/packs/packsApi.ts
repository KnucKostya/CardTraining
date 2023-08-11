import { instance } from "common/instance/instance";

export const packsApi = {
  getPacks: (par: GetPacksParamsType) => {
    return instance.get<PacksResType>("cards/pack", {
      params: { ...par },
    });
  },
  addPack: (payload: AddPackPayloadType) => {
    return instance.post("cards/pack", {
      cardsPack: { ...payload },
    });
  },
  removePack: (id: string) => {
    return instance.delete(`cards/pack?id=${id}`);
  },
  updatePack: (payload: UpdatePackPayloadType) => {
    return instance.put<UpdatePackResponseType>("cards/pack", {
      cardsPack: { ...payload },
    });
  },
};

//TYPES==========//TYPES==========//TYPES==========//TYPES==========//TYPES==========//TYPES==========

export type AddPackTypeWithQuery = AddPackPayloadType & { userId: string };
export type AddPackPayloadType = {
  name?: string;
  deckCover?: string;
  private?: boolean;
};

export type UpdatePackPayloadType = {
  _id: string;
  name?: string;
  deckCover?: string;
};

export type GetPacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
};

export type CardPackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  deckCover: string;
  cardsCount: number;
  type: string;
  rating: number;
  created: Date;
  updated: Date;
  more_id: string;
  __v: number;
};
export type PacksResType = {
  cardPacks: CardPackType[];
  page: number; //выбранная страница
  pageCount: number; //количество эл-ов на странице
  cardPacksTotalCount: number; //количество колод
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

export type UpdatePackResponseType = {
  updatedCardsPack: RootObjectUpdatedCardsPack;
  token: string;
  tokenDeathTime: number;
};
export type RootObjectUpdatedCardsPack = {
  _id: string;
  user_id: string;
  user_name: string;
  name: string;
  private: boolean;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};
