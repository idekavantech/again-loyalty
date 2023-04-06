import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectAdminUrlPrefix,
} from "@saas/stores/plugins/selector";
import useTheme from "@material-ui/core/styles/useTheme";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAutomatedProcess,
  getAutomatedProcesses,
  updateAutomatedProcess,
  setAutomatedProcessType,
} from "store/actions";
import { makeSelectAutomatedProcesses, makeSelectAutomatedProcessesPagination } from "store/selectors";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function useAutomatedProcesses(props) {
  const isMobile = useMediaQuery("(max-width:768px)");

  const { au } = props;
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const loading = useSelector(makeSelectLoading());
  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const automatedProcessesPagination = useSelector(makeSelectAutomatedProcessesPagination())

  const _getAutomatedProcesses = (query) =>
    dispatch(getAutomatedProcesses(query));
  const _updateAutomatedProcess = (id, data, callback) =>
    dispatch(updateAutomatedProcess(id, data, callback));

  const _deleteAutomatedProcess = (id, event) =>
    dispatch(deleteAutomatedProcess(id, event));

  const _setAutomatedProcess = (type) =>
    dispatch(setAutomatedProcessType(type));

  const automatedProcesses = useSelector(makeSelectAutomatedProcesses());

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAutomatedProcess, setSelectedAutomatedProcess] =
    useState(null);

  const [pagination, setPagination] = useState({ page: 0, page_size: 10 });

  const onPageChange = (e, newPage) => {
    setPagination({...pagination , page : newPage})
  };

  const onPageSizeChange = (e) => {
    const {value} = e.target
    setPagination({page:0 , page_size : value})
  };

  useEffect(() => {
    setTimeout(() => {
      _getAutomatedProcesses({
        ...pagination,
        event_type: au?.type,
        page: pagination.page + 1,
      });
      _setAutomatedProcess(au?.type);
    }, 0);
  }, [router.pathname, pagination]);

  const onDeleteAutomatedProcess = (id) => {
    _deleteAutomatedProcess(id, au?.type);
  };

  const callback = () => {
    _getAutomatedProcesses({
      ...pagination,
      event_type: au?.type,
      page: pagination.page + 1,
    });
  };

  const onToggleAutomatedProcessStatus = (id, is_active) => {
    if (!id) return;
    _updateAutomatedProcess(id, { is_active: !is_active }, callback);
  };

  const onNavigateToDetailPage = (id) => {
    router.push(`${urlPrefix}crm/automated_processes/${au.type}/${id}`);
  };

  return {
    theme,
    loading,
    urlPrefix,
    automatedProcesses,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    onToggleAutomatedProcessStatus,
    selectedAutomatedProcess,
    setSelectedAutomatedProcess,
    onDeleteAutomatedProcess,
    onNavigateToDetailPage,
    isMobile,
    pagination,
    onPageChange,
    onPageSizeChange,
    automatedProcessesPagination
  };
}

export { useAutomatedProcesses };
