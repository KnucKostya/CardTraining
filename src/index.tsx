import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "app/routes";
import { store } from "app/store";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

//написать логику для редактирования карточки(выгрузка изображения, проверка на поля(текст или изображение)

reportWebVitals();

// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
// import React from "react";
//
// type UserType = {
//   id: number;
//   name: string;
//   avatar: string;
//   age: number;
//   address: string;
// };
//
// const users: UserType[] = [
//   {
//     id: 1,
//     name: "my Name",
//     age: 32,
//     avatar: "—ฅ/ᐠ.̫ .ᐟ\\ฅ—",
//     address: "my Address",
//   },
//   {
//     id: 2,
//     name: "John",
//     age: 22,
//     avatar: ":)",
//     address: "California",
//   },
//   {
//     id: 3,
//     name: "Mike",
//     age: 18,
//     avatar: "^._.^",
//     address: "New York",
//   },
//   {
//     id: 4,
//     name: "Emma",
//     age: 38,
//     avatar: "/ᐠ-ꞈ-ᐟ\\",
//     address: "Washington",
//   },
// ];
//
// const StartPage = () => {
//   const navigate = useNavigate();
//   const friends = users.filter((u) => u.id !== 1);
//
//   const mappedFriends = friends.map((f, i) => {
//     const go = () => {
//       navigate("/friend/" + f.id);
//     };
//
//     return (
//       <div key={i} onClick={go} style={{ paddingLeft: 24, color: "blue", cursor: "pointer" }}>
//         {f.name}, {f.age}
//       </div>
//     );
//   });
//
//   return (
//     <div>
//       <h2>🙂 My profile</h2>
//       <Profile userId={1} />
//       <hr />
//       <h2>👪 Friends</h2>
//       {mappedFriends}
//     </div>
//   );
// };
// const Profile: React.FC<{ userId?: number }> = ({ userId }) => {
//   const { id } = useParams<{ id: string }>();
//   const user = users.find((u) => u.id === +(id || userId || 0));
//
//   return (
//     <div>
//       <div>
//         <b>avatar</b> {user?.avatar}
//       </div>
//       <div>
//         <div>
//           <b>name</b>: {user?.name}
//         </div>
//         <div>
//           <b>age</b>: {user?.age}
//         </div>
//         <div>
//           <b>address</b>: {user?.address}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export const Friends = () => {
//   return (
//     <Routes>
//       <Route path={"/"} element={<StartPage />} />
//       <Route path={"friend/:id"} element={<Profile />} />
//       <Route path={"*"} element={<div>❌404 Page Not Found❌</div>} />
//     </Routes>
//   );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <BrowserRouter>
//     <Friends />
//   </BrowserRouter>
// );

// 📜 Описание:
// При загрузке приложения на экране отображается
// профиль пользователя и список друзей.
// Если кликнуть на пользователя, то видим ❌404 Page Not Found❌
// Исправьте код, чтобы по клику на пользователя
// отображалась странице с информацией о друге.
// В качестве ответа укажите исправленную строку кода.
//
// ответ:      <Route path={"friend/:id"} element={<Profile />} />

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
// import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
//
// // Reducer
// const initState = {
//   work: 0,
//   donate: 0,
//   balance: 0,
// };
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "CHANGE_VALUE":
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };
//
// // Store
// const rootReducer = combineReducers({ app: appReducer });
//
// const store = createStore(rootReducer, applyMiddleware(thunk));
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// const changeValue = (payload: any) => ({ type: "CHANGE_VALUE", payload } as const);
// type ActionsType = ReturnType<typeof changeValue>;
//
// // Components
// export const Income = () => {
//   const work = useAppSelector((state) => state.app.work);
//   const donate = useAppSelector((state) => state.app.donate);
//   const balance = useAppSelector((state) => state.app.balance);
//
//   const dispatch = useAppDispatch();
//
//   return (
//     <div>
//       <div>
//         work:{" "}
//         <input
//           value={work}
//           type={"number"}
//           onChange={(e) => dispatch(changeValue({ work: +e.target.value }))}
//         />
//       </div>
//       <div>
//         donate:{" "}
//         <input
//           value={donate}
//           type={"number"}
//           onChange={(e) => dispatch(changeValue({ donate: +e.target.value }))}
//         />
//       </div>
//
//       <h1>💵 balance: {balance}</h1>
//       <button
//         onClick={() => {
//           dispatch(changeValue({ balance: work + donate }));
//         }}
//       >
//         calculate balance
//       </button>
//     </div>
//   );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Income />
//   </Provider>
// );

// 📜 Описание:
// Что нужно написать вместо XXX, чтобы вывелась сумма дохода в строке баланса
//
//ответ: dispatch(changeValue({ balance: work + donate }));

// import ReactDOM from "react-dom/client";
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
// import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { useEffect } from "react";
// import axios from "axios";
//
// // Styles
// const table: React.CSSProperties = {
//   borderCollapse: "collapse",
//   width: "100%",
//   tableLayout: "fixed",
// };
//
// const th: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightgray",
//   cursor: "pointer",
// };
//
// const td: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
// };
//
// // Types
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };
//
// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };
//
// type ParamsType = {
//   sortBy: string | null;
//   sortDirection: "asc" | "desc" | null;
// };
//
// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });
//
// const api = {
//   getUsers(params?: ParamsType) {
//     return instance.get<UsersResponseType>("users", { params });
//   },
// };
//
// // Reducer
// const initState = {
//   users: [] as UserType[],
//   params: {
//     sortBy: null,
//     sortDirection: "asc",
//   } as ParamsType,
// };
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     case "SET_PARAMS":
//       return { ...state, params: { ...state.params, ...action.payload } };
//     default:
//       return state;
//   }
// };
//
// // Store
// const rootReducer = combineReducers({ app: appReducer });
//
// const store = createStore(rootReducer, applyMiddleware(thunk));
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users } as const);
// const setParamsAC = (payload: ParamsType) => ({ type: "SET_PARAMS", payload } as const);
// type ActionsType = ReturnType<typeof setUsersAC> | ReturnType<typeof setParamsAC>;
//
// // Thunk
// const getUsersTC = (): AppThunk => (dispatch, getState) => {
//   const params = getState().app.params;
//   api.getUsers(params.sortBy ? params : undefined).then((res) => dispatch(setUsersAC(res.data.items)));
// };
//
// export const Users = () => {
//   const users = useAppSelector((state) => state.app.users);
//   const sortBy = useAppSelector((state) => state.app.params.sortBy);
//   const sortDirection = useAppSelector((state) => state.app.params.sortDirection);
//   console.log(users, sortBy, sortDirection);
//
//   const dispatch = useAppDispatch();
//
//   // ❗❗❗ XXX ❗❗❗
//
//   useEffect(() => dispatch(getUsersTC()), [sortBy, sortDirection]);
//
//   const sortHandler = (name: string) => {
//     const direction = sortDirection === "asc" ? "desc" : "asc";
//     dispatch(setParamsAC({ sortBy: name, sortDirection: direction }));
//   };
//
//   return (
//     <div>
//       <h1>👪 Список пользователей</h1>
//       <table style={table}>
//         <thead>
//           <tr>
//             <th style={th} onClick={() => sortHandler("name")}>
//               Name
//             </th>
//             <th style={th} onClick={() => sortHandler("age")}>
//               Age
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => {
//             return (
//               <tr key={u.id}>
//                 <td style={td}>{u.name}</td>
//                 <td style={td}>{u.age}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>
// );

// 📜 Описание:
// Перед вами таблица с пользователями. Но данные не подгружаются
// Что нужно написать вместо XXX, чтобы:
// 1) Пользователи подгрузились
// 2) Чтобы работала сортировка по имени и возрасту
// 3) Направление сортировки тоже должно работать (проверить можно нажав на одно и тоже поле 2 раза)
// ответ:   useEffect(() => dispatch(getUsersTC()), [sortBy, sortDirection]); и ещё надо что бы направления были

// import ReactDOM from "react-dom/client";
// import React, { useState } from "react";
// import axios from "axios";
//
// export const Jpegs = () => {
//   const [file, setFile] = useState<any>();
//   const [formData, setFormData] = useState<any>();
//   console.log(formData);
//
//   const onChange = (e: any) => {
//     const maybeFile = e.target.files?.[0];
//     if (maybeFile) {
//       if (maybeFile.type === "image/jpeg") {
//         setFile(maybeFile);
//         const draftFormData = new FormData();
//         draftFormData.append("myFile", maybeFile, maybeFile.name);
//         setFormData(draftFormData);
//         return;
//       } else alert("not .jpg!");
//     }
//     setFormData("");
//     setFile("");
//   };
//   const onClick = () => {
//     axios
//       .post("https://neko-back.herokuapp.com/file", formData)
//       .then(() => {
//         alert("Вы справились 🚀");
//       })
//       .catch(() => {
//         alert("😥 Что то пошло не так...");
//       });
//   };
//
//   return (
//     <div>
//       <input type={"file"} onChange={onChange} />
//       <div>updated: {file && new Date(file?.lastModified).toLocaleDateString()}</div>
//       <div>size: {((file?.size || 0) / 1048576).toFixed(2) + "MB"}</div>
//
//       <button onClick={onClick} disabled={!file}>
//         send
//       </button>
//     </div>
//   );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(<Jpegs />);

// 📜 Описание:
// Не работает отправка картинки на backend.
// Найдите ошибку.
// В качестве ответа укажите исправленную версию строки.
//
// ответ : formData

// import ReactDOM from "react-dom/client";
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
// import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
//
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };
//
// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };
//
// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });
//
// const api = {
//   getUsers(search: string) {
//     return instance.get<UsersResponseType>(`users?name=${search}&pageSize=100`);
//   },
// };
//
// const initState = { users: [] as UserType[] };
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     default:
//       return state;
//   }
// };
//
// // Store
// const rootReducer = combineReducers({ app: appReducer });
//
// const store = createStore(rootReducer, applyMiddleware(thunk));
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users } as const);
// type ActionsType = ReturnType<typeof setUsersAC>;
//
// // Thunk
// const getFriends =
//   (name: string): AppThunk =>
//   (dispatch) => {
//     api.getUsers(name).then((res) => dispatch(setUsersAC(res.data.items)));
//   };
//
// export const Users = () => {
//   const users = useAppSelector((state) => state.app.users);
//   const dispatch = useAppDispatch();
//   const [name, setName] = useState("");
//   const [timerId, setTimerId] = useState(0);
//
//   useEffect(() => {
//     if (timerId) {
//       clearTimeout(timerId);
//     }
//
//     setTimerId(
//       +setTimeout(() => {
//         dispatch(getFriends(name));
//       }, 1500)
//     );
//   }, [name]);
//
//   return (
//     <div>
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       {users.map((u) => {
//         return (
//           <div key={u.id}>
//             <p>
//               <b>name</b>: {u.name}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>
// );

// 📜 Описание:
// На экране input, куда можно вводить символы.
// Откройте Network/ fetch/XHR и поробуйте вводить символы
// Обратите внимание, что все символы которые вы вводите уходят на сервер -
// это плохо.
//
// 🪛 Задача: Починить debounce
// В качестве ответа напишите строку кода которую необходимо исправить или добавить
// для реализации данной задачи
//
// ответ: if (timerId) {
//       clearTimeout(timerId);
//     } но опять же не пропускается такой ответ, хотя задание выполнено
// почитать про cleanUp useEffect

// import ReactDOM from "react-dom/client";
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
// import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import React, { FC, useEffect } from "react";
// import axios from "axios";
//
// // Styles
// const table: React.CSSProperties = {
//   borderCollapse: "collapse",
//   width: "100%",
//   tableLayout: "fixed",
// };
//
// const th: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightgray",
//   cursor: "pointer",
// };
//
// const td: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
// };
//
// const thActive: React.CSSProperties = {
//   padding: "10px",
//   border: "1px solid black",
//   background: "lightblue",
//   cursor: "pointer",
// };
//
// // Types
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };
//
// type UsersResponseType = {
//   items: UserType[];
//   totalCount: number;
// };
//
// type ParamsType = {
//   sortBy: string | null;
//   sortDirection: "asc" | "desc" | null;
// };
//
// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });
//
// const api = {
//   getUsers(params?: ParamsType) {
//     return instance.get<UsersResponseType>("users", { params });
//   },
// };
//
// // Reducer
// const initState = {
//   users: [] as UserType[],
//   activeColumn: null as string | null,
//   params: {
//     sortBy: "name",
//     sortDirection: "asc",
//   } as ParamsType,
// };
// type InitStateType = typeof initState;
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//   switch (action.type) {
//     case "SET_USERS":
//       return { ...state, users: action.users };
//     case "SET_PARAMS":
//       return { ...state, params: { ...state.params, ...action.payload } };
//     case "SET_ACTIVE_COLUMN":
//       return { ...state, activeColumn: action.value };
//     default:
//       return state;
//   }
// };
//
// // Store
// const rootReducer = combineReducers({ app: appReducer });
//
// const store = createStore(rootReducer, applyMiddleware(thunk));
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
// const useAppDispatch = () => useDispatch<AppDispatch>();
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users } as const);
// const setParamsAC = (payload: ParamsType) => ({ type: "SET_PARAMS", payload } as const);
// const setActiveColumnAC = (value: string) => ({ type: "SET_ACTIVE_COLUMN", value } as const);
// type ActionsType =
//   | ReturnType<typeof setUsersAC>
//   | ReturnType<typeof setParamsAC>
//   | ReturnType<typeof setActiveColumnAC>;
//
// // Thunk
// const getUsersTC = (): AppThunk => (dispatch, getState) => {
//   const params = getState().app.params;
//   api.getUsers(params).then((res) => dispatch(setUsersAC(res.data.items)));
// };
//
// export const Users = () => {
//   const users = useAppSelector((state) => state.app.users);
//   const sortBy = useAppSelector((state) => state.app.params.sortBy);
//   const sortDirection = useAppSelector((state) => state.app.params.sortDirection);
//
//   const dispatch = useAppDispatch();
//
//   useEffect(() => {
//     dispatch(getUsersTC());
//   }, [sortBy, sortDirection]);
//
//   const sortHandler = (sortBy: string) => {
//     const direction = sortDirection === "asc" ? "desc" : "asc";
//     dispatch(setParamsAC({ sortBy, sortDirection: direction }));
//     dispatch(setActiveColumnAC(sortBy));
//   };
//
//   return (
//     <div>
//       <h1>👪 Список пользователей</h1>
//       <table style={table}>
//         <thead>
//           <tr>
//             <Th name={"name"} sortHandler={sortHandler} />
//             <Th name={"age"} sortHandler={sortHandler} />
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => {
//             return (
//               <tr key={u.id}>
//                 <td style={td}>{u.name}</td>
//                 <td style={td}>{u.age}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//
// type ThPropsType = {
//   name: string;
//   sortHandler: (name: string) => void;
// };
//
// const Th: FC<ThPropsType> = ({ name, sortHandler }) => {
//   const activeColumn = useAppSelector((state) => state.app.activeColumn);
//   const sortBy = useAppSelector((state) => state.app.params.sortBy);
//   const sortDirection = useAppSelector((state) => state.app.params.sortDirection);
//
//   const condition1 = "❗❗❗ XXX ❗❗❗";
//   const condition2 = "❗❗❗ YYY ❗❗❗";
//   const condition3 = "❗❗❗ ZZZ ❗❗❗";
//
//   return (
//     <th style={condition1 ? thActive : th} onClick={() => sortHandler(name)}>
//       {name}
//       {condition1 && condition2 && (condition3 ? <span> ⬆</span> : <span> ⬇</span>)}
//     </th>
//   );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(
//   <Provider store={store}>
//     <Users />
//   </Provider>
// );

// 📜 Описание:
// Перед вами таблица с пользователями.
// Покликайте по вкладкам age и name и убедитесь, что сортировка работает верно,
// но в шапке криво отображаются стрелки и не видно активной колонки
// Ваша задача написать правильные условия вместо XXX YYY и ZZZ, чтобы:
// 1) Стрелки соответствовали сортировке
// 2) Шапка активной колонки была голубая, а неактивной серая
// ❗ Ответ дайте через пробел
// 🖥 Пример ответа: a === '1' b !== a c === state

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom/client";
//
// type UserType = {
//   id: string;
//   name: string;
//   age: number;
// };
//
// // API
// const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });
//
// const api = {
//   getUsers() {
//     return instance.get(`users?pageSize=${3}&pageNumber=${2}`);
//   },
// };
//
// // App
// export const App = () => {
//   const [users, setUsers] = useState<UserType[]>([]);
//
//   useEffect(() => {
//     api.getUsers().then((res) => {
//       setUsers(res.data.items);
//     });
//   }, []);
//
//   return (
//     <>
//       <h1>👪 Список пользователей</h1>
//       {users.map((u) => {
//         return (
//           <div style={{ display: "flex", gap: "10px" }} key={u.id}>
//             <p>
//               <b>name</b>: {u.name}
//             </p>
//             <p>
//               <b>age</b>: {u.age}
//             </p>
//           </div>
//         );
//       })}
//     </>
//   );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(<App />);

// 📜 Описание:
// На странице отображен список юзеров из 3-человек.
// Подгрузились именно эти пользователи не случайно, а из-за query параметров указанных в запросе.
// Ваша задача переписать строку с запросом таким образом, чтобы получить аналогичный результат (все тех же юзеров),
// при этом запрещено в ответе использовать символы вопроса и амперсанда.
// В качестве ответа укажите полностью исправленную строку коду (переносы разрешены)
// 🖥 Пример ответа: return instance.get('users=pageSize=3=pageNumber=2')

// import React from "react";
// import ReactDOM from "react-dom/client";
//
// export const App = () => {
//   return (
//     <div>
//       <h2>Какое из приведенных ниже определений верно ?</h2>
//       <ul>
//         <li>
//           1 - После того как файл был проиндексирован с помощью git init и закоммичен, git будет отслеживать
//           все следующие изменения в нём.
//         </li>
//         <li>
//           2 - Ветки в Git представляют собой указатель на коммит. Если нужно добавить какую-то фичу или
//           исправить баг (незначительный или серьезный), мы создаём новую ветку. Она будет содержать все
//           изменения, которые мы хотим добавить в репозиторий.
//         </li>
//         <li>
//           3 - Команда git add создает новый репозиторий Git. С ее помощью можно преобразовать существующий
//           проект без управления версиями в репозиторий Git или инициализировать новый пустой репозиторий
//         </li>
//         <li>4 - Ни одно из вышеперечисленных определений не верно</li>
//       </ul>
//     </div>
//   );
// };
//
// const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
// root.render(<App />);

// 📜 Описание:
// Какое из приведенных ниже определений верно ?
// Может быть несколько вариантов ответа (ответ дайте через пробел).
// ❗ Ответ будет засчитан как верный, только при полном правильном совпадении.
// Если указали правильно один вариант (1),
// а нужно было указать два варианта (1 и 2), то ответ в данном случае будет засчитан как неправильный
// 0твет: 2
