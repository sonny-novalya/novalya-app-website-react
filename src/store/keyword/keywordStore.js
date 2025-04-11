import { create } from "zustand";
import apiCall from '../../services/api';

const useKeyWordStore = create((set) => ({
   flow: 0,
   setFlow: (val) => set(() => ({ flow: val })), 
  
}));


export default useKeyWordStore;
