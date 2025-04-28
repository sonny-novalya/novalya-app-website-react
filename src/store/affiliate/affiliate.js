import { create } from "zustand";
import apiCall from '../../services/api';
import { formatDate } from "../../helpers/helper";

const useAffiliateStore = create((set) => ({
  
//    setFlow: (val) => set(() => ({ flow: val })), 
   
    affiliateComList:[],
    affiliateComLoader:false,
    error:null,


   fetchCommissionData: async (data) => {
    set({ affiliateComLoader: true});
      try {
       
          const res = await apiCall({
              method: 'POST',
              url: '/user/api/getunilevelreports',
              data:data
          });
        const tempdata = res?.data?.data.map((item,i)=>{
            return {...item,sender:item?.firstname+" "+item?.lastname,indx:i+1,date:formatDate(item?.createdat)}
        })

          set({affiliateComList:tempdata || [], affiliateComLoader: false});

         
       
      } catch (error) {
          set({
              affiliateComLoader: false,
              error: error?.message || 'Something went wrong',
          });
      }
  },


}));


export default useAffiliateStore;