import React, { useState, useEffect, useRef } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { getDiscountCodeData } from "store/actions";
import { makeSelectDiscountCodeData } from "store/selectors";
import Box from "@material-ui/core/Box";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import {useDispatch , useSelector} from 'react-redux'


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function tabProps(index) {
     return {
       id: `simple-tab-${index}`,
       "aria-controls": `simple-tabpanel-${index}`,
     };
   }

function useCRMDiscountList (){

    const SEARCH_QUERY_KEY = "code";
    let searchTimeoutId = null;

     const dispatch = useDispatch()

     const router = useRouter();
     const theme = useTheme();
     const inputRef = useRef(null);

     const [value, setValue] = useState(0);
     const [search, setSearch] = useState(router.query.code || "");

     const loading = useSelector(makeSelectLoading())
     const discountCodesData = useSelector(makeSelectDiscountCodeData())
     const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix())

     const _getDiscountCodeData =  (query) => dispatch(getDiscountCodeData(query))


     useEffect(() => {
          setTimeout(() => {
            const query = {
              is_expired: !!value,
              code: search,
              ...router.query,
            };
            clearTimeout(searchTimeoutId);
            searchTimeoutId = setTimeout(() => {
              _getDiscountCodeData({ ...query });
            }, 500);
          }, 0);
        }, [value, search]);

        const onSearchChange = (search) => {
          setSearch(search);
        }

     return{
          router,
          SEARCH_QUERY_KEY,
          searchTimeoutId,
          TabPanel,
          tabProps,
          theme,
          inputRef,
          value,
          setValue,
          search,
          setSearch,
          loading,
          discountCodesData,
          adminUrlPrefix,
          _getDiscountCodeData,
          onSearchChange,
     }
}

export {useCRMDiscountList}