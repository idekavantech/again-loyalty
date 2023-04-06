import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import useTheme from "@material-ui/core/styles/useTheme";
import {useSelector} from 'react-redux'


function useAutomatedProcesses(){
     const theme = useTheme();
     const loading = useSelector(makeSelectLoading())
     const urlPrefix  = useSelector(makeSelectAdminUrlPrefix())
     return {theme , loading , urlPrefix} 
}

export {useAutomatedProcesses}