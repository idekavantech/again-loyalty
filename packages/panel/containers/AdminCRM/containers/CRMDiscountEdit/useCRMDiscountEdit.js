import { useEffect, useState, useRef, isValidElement } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import { discountCodeValue, PRICE} from "../../constants";
import { useRouter } from "next/router";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { makeSelectDiscountCodeDataById } from "store/selectors";
import {
  createNewDiscountCode,
  updateDiscountCode,
  getDiscountCodeById,
} from "store/actions";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { useDispatch , useSelector } from "react-redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { GET_DISCOUNT_CODE_BY_ID } from "store/constants";
const initialDiscountCodeData = {
     max_using_number_per_user: 1,
     is_shared: false,
   };

function useCRMDiscountEdit (){

     const dispatch = useDispatch()
     const router = useRouter()

     const business = useSelector( makeSelectBusiness())
     const discountCode = useSelector( makeSelectDiscountCodeDataById())
     const isLoading = useSelector(makeSelectLoading(GET_DISCOUNT_CODE_BY_ID))

     const _getDiscountCodeById =  (id) => dispatch(getDiscountCodeById(id))
     const _updateDiscountCode =  (data, id) => dispatch(updateDiscountCode(data, id))
     const _createDiscountCode =  (data) => dispatch(createNewDiscountCode(data))

     const discountCodeId = router.query.id;
     const theme = useTheme();
     const [isSaveMoalOpen, setIsSaveMoalOpen] = useState(false);
     const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
     const minimumDiscount = useRef(null);
     const MaximumDiscount = useRef(null);
   
     const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
   
     const handleSelectInput = (selectedInput) => {
       selectedInput?.current?.focus();
     };
     const [discountCodeAmount, setDiscountCodeAmount] = useState(
       discountCodeValue[0].type
     );

     const [discountFloorErr , setDiscountFloorErr] = useState(false)
   
     useEffect(() => {
       if (discountCode?.discount_price) {
         setDiscountCodeAmount("price");
       }
     }, [discountCode]);
   
     const [discountData, setDiscountData] = useState({ ...initialDiscountCodeData });

     useEffect(() => {
       if (discountCode && discountCodeId && discountCodeId !== "new") {
         setDiscountData({
           code: discountCode?.code,
           discount_percent: 0,
           expiration_date: discountCode?.expiration_date,
           discount_ceiling_amount: discountCode?.discount_ceiling_amount,
           discount_price: discountCode?.discount_price,
           discount_floor_amount: discountCode?.discount_floor_amount,
           max_using_total: discountCode?.max_using_total,
           max_using_number_per_user : discountCode?.max_using_number_per_user,
           discount_percent: discountCode?.discount_percent,
           expiration_date: discountCode?.expiration_date,
           is_shared: false,
         });
       }
     }, [discountCode]);

     const validate = ()=>{
      const {discount_floor_amount ,discount_price } = discountData
      if (discountCodeAmount === 'price' &&  discount_floor_amount < discount_price) {
        setDiscountFloorErr(true);
        return false
      }

      setDiscountFloorErr(false)
      return true

     }

   
     const submit = () => {
      const isFormDataValid = validate();
      if(!isFormDataValid) return

       const _discountData = { ...discountData };
   
       if (discountCodeId && discountCodeId != "new") {
         if (discountCodeAmount === "percent") {
           _discountData.discount_price = null;
           _updateDiscountCode(_discountData, discountCodeId);
         } else {
           _discountData.discount_percent = null;
           _updateDiscountCode(_discountData, discountCodeId);
         }
       } else {
         if (discountCodeAmount === "percent") {
           delete _discountData.discount_price;
           _discountData.business = business.id;
           _createDiscountCode(_discountData);
         } else {
           delete _discountData.discount_percent;
           _discountData.business = business.id;
           _createDiscountCode(_discountData);
         }
       }

       setIsSaveMoalOpen(false);
       router.back();
     };
   
     useEffect(() => {
       setTimeout(() => {
         if (discountCodeId && discountCodeId != "new") {
           _getDiscountCodeById(discountCodeId);
         }
       }, 0);
     }, []);

     const onDiscountCodeChange = (e) =>
     setDiscountData({
       ...discountData,
       code: e.target.value,
     })

     const onDiscountAmountChange = (e) =>{
          const value = e.target.value
          const _discountData = {...discountData}
          _discountData.discount_price= parseInt(value)
          _discountData.discount_percent= parseInt(value)
          if(!value){
            delete _discountData.discount_price
            delete _discountData.discount_percent
          }

          setDiscountData(_discountData)
        }
     
        const onDiscountSelectChange = (e) =>{
          const _discountData = {...discountData}
          if(e.target.value === PRICE){
              delete _discountData.discount_ceiling_amount
          }
          setDiscountCodeAmount(e.target.value)
          setDiscountData(_discountData)
     }

          const onDiscountFloorAmountChange =(e) =>
          {
           const value = e.target.value
           const _discountData = {...discountData}
           _discountData.discount_floor_amount= parseInt(value)
           if(!value){
             delete _discountData.discount_floor_amount
           }
           setDiscountData(_discountData)
         }

         const onDiscountCeilingChange = (e) =>
         {
           const value = e.target.value
           const _discountData = {...discountData}
           _discountData.discount_ceiling_amount= parseInt(value)
           if(!value){
             delete _discountData.discount_ceiling_amount
           }
           setDiscountData(_discountData)
         
         }


         const onDiscountCeilingUseChange =(e) =>
         {
           const value = e.target.value
           const _discountData = {...discountData}
           _discountData.max_using_total= parseInt(value)
           if(!value){
             delete _discountData.max_using_total
           }
           setDiscountData(_discountData)
         }

         const onExpirationDateChange = (date)=>
         { 
          const _discountData = {...discountData}
          persianToEnglishNumber()
          _discountData.expiration_date = persianToEnglishNumber(date?.format("YYYY-MM-DD"))
          if(!date) delete _discountData.expiration_date
          setDiscountData(_discountData)
          }

          const onDiscountMaxUsingNumberChange = (e)=>{
            const value = e.target.value
            const _discountData = {...discountData}

            _discountData.max_using_number_per_user = parseInt(value)
            !value && delete _discountData.max_using_number_per_user

            setDiscountData(_discountData)
          }



     return {
          isLoading,
          validate,
          router,
          discountFloorErr,
          theme,
          submit,
          isSaveMoalOpen,
          setIsSaveMoalOpen,
          isCancelModalOpen,
          setIsCancelModalOpen,
          minimumDiscount,
          MaximumDiscount,
          isAddNoteModalOpen,
          handleSelectInput,
          discountCodeAmount,
          setDiscountCodeAmount,
          setAddNoteModalOpen,
          discountData,
          discountCodeId,
          onDiscountCodeChange,
          onDiscountAmountChange,
          onDiscountSelectChange,
          onDiscountFloorAmountChange,
          onDiscountCeilingChange,
          onDiscountCeilingUseChange,
          onExpirationDateChange,
          onDiscountMaxUsingNumberChange
     }

}


export {useCRMDiscountEdit}