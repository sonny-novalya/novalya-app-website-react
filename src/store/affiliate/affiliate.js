import { create } from "zustand";
import apiCall from '../../services/api';
import { formatDate } from "../../helpers/helper";

const useAffiliateStore = create((set) => ({
  
//    setFlow: (val) => set(() => ({ flow: val })), 
   
    affiliateComList:[],
    affiliateComLoader:false,
    error:null,
    openAgreementModal:false,




  setOpenAgreementModal: (val) => (set({ openAgreementModal: val})),

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
  uploadBankDetails: async (data) => {
      try {
       
          const res = await apiCall({
              method: 'POST',
              url: '/user/api/updatepayoutdetails',
              data:data
          });
      
          return res

         
       
      } catch (error) {
          set({
              error: error?.message || 'Something went wrong',
          });
      }
  },
  uploadKYC: async (data) =>{

    try {
       
        const res = await apiCall({
            method: 'POST',
            url: '/user/api/uploadkycdata',
            data:data,
            headers: {
                "Content-Type": "multipart/form-data",
              },
        });
    
        return res

       
     
    } catch (error) {
        set({
            error: error?.message || 'Something went wrong',
        });
    }
  },
  getKycData:async ()=>{
   

    try {
       
        const res = await apiCall({
            method: 'POST',
            url: '/user/api/affiliate/kyc-data'
        });
    
        return res

       
     
    } catch (error) {
        set({
            error: error?.message || 'Something went wrong',
        });
    }
  },

  getPayOut:async ()=>{
   

    try {
       
        const res = await apiCall({
            method: 'POST',
            url: '/user/api/payout'
        });
    
        return res

       
     
    } catch (error) {
        set({
            error: error?.message || 'Something went wrong',
        });
    }
  },
  getDashData:async ()=>{
   

    try {
       
        const res = await apiCall({
            method: 'POST',
            url: '/user/api/dashboarddata'
        });
    
        return res

       
     
    } catch (error) {
        set({
            error: error?.message || 'Something went wrong',
        });
    }
  },
  getAffCustomers:async (data)=>{
   

    try {
       
        const res = await apiCall({
            method: 'POST',
            url: '/user/api/affiliate-customers',
              data: data
        });
    
        return res

       
     
    } catch (error) {
        set({
            error: error?.message || 'Something went wrong',
        });
    }
  },
  becomeAffiliate:async (data)=>{
    try {
       
        const res = await apiCall({
            method: 'POST',
            url: '/user/api/createaffiliateuser',
              data: data
        });
    
        return res 
    } catch (error) {
        set({
            error: error?.message || 'Something went wrong',
        });
    }
  },




}));


export default useAffiliateStore;