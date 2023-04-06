import { useEffect , useState } from "react";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { deleteCrmSegment, getCrmSegments } from "store/actions";
import { makeSelectCrmSegments, makeSelectCrmSegmentsPagination } from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export function useCRMSegments (){
    const dispatch = useDispatch()
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width:768px)");


    const [pagination , setPagination] = useState({page:0 , page_size:10})

    const onPageChange = (e, newPage)=>{
      setPagination({...pagination , page : newPage})
    }

    const onPageSizeChange = (e) =>{
      const {value} = e.target
      setPagination({...pagination , page_size : value})
    }

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSegment , setSelectedSegment] = useState(null)

    const crmSegments = useSelector(makeSelectCrmSegments());
    const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix())
    const segmentsPagination = useSelector(makeSelectCrmSegmentsPagination())

    const isLoading = useSelector(makeSelectLoading())
    const _getCrmSegments = (query)=> dispatch(getCrmSegments(query))
    const _deleteCrmSegment = (id) => dispatch(deleteCrmSegment(id))

    const handleCrmSegmentDelete = (id)=>{
      _deleteCrmSegment(id)
    }
    
    useEffect(() => {
        setTimeout(() => {
          _getCrmSegments({ ...pagination, page: pagination.page + 1 });
        }, 0);
      }, [pagination , ]);


    return {
      router,
      isMobile,
      onPageChange ,
      onPageSizeChange,
      crmSegments,
      adminUrlPrefix,
      isLoading,
      isDeleteModalOpen,
      setIsDeleteModalOpen,
      handleCrmSegmentDelete,
      selectedSegment , 
      setSelectedSegment,
      segmentsPagination,
      pagination,
    };
}
