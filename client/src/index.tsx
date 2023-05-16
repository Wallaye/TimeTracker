import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ActivitiesStore from "./store/ActivitiesStore";
import ProjectStore from "./store/ProjectStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const userStore = new UserStore();
const actStore = new ActivitiesStore();
const projStore = new ProjectStore();
export const Context = createContext({userStore, actStore, projStore});

root.render(
    <Context.Provider value={{userStore, actStore, projStore}}>
        <App />
    </Context.Provider>
);
