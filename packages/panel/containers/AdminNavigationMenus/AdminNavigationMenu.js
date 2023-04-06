/**
 *
 * AdminThemeSettings
 *
 */

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SaveAndDiscardButtons from "@saas/components/SaveAndDiscardButtons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Add from "@material-ui/icons/Add";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import {
    makeSelectBusinessThemeColor,
    makeSelectBusinessThemeConfig,
    makeSelectNavigationMenus,
} from "@saas/stores/business/selector";
import { updateBusiness } from "@saas/stores/business/actions";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import {
    defaultNavigationMenus,
    MAIN_FOOTER_NAVIGATION_MENU,
    MAIN_HEADER_NAVIGATION_MENU,
    TOP_PAGE_HEADER_MENU,
} from "./constants";
import {
    makeSelectAdminUrlPrefix,
    makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { useRouter } from "next/router";
import Input from "@saas/components/Input";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Modal from "@saas/components/Modal";
import { Collapse } from "react-collapse";
import { useResponsive } from "@saas/utils/hooks/useResponsive";


const dragIcon = `/images/dragg-icon.png`;

export function AdminNavigationMenu({
    loading,
    themeConfig,
    _updateBusiness,
    navigationMenus,
    adminUrlPrefix,
    urlPrefix,
}) {
    const [isCollapse, setCollapse] = useState({});

    const { minWidth768 } = useResponsive();
    const theme = useTheme();
    const router = useRouter();
    const [isDeleteConfirmationPopupOpen, setDeleteConfirmationPopupOpen] =
        useState(false);
    const [isEditMenuItemPopupOpen, setEditMenuItemPopupOpen] = useState(false);
    const { id } = router.query;
    const [menus, setMenus] = useState({});
    const [menu, setMenu] = useState(null);

    const [_name, _setName] = useState("");
    const [_link, _setLink] = useState("");

    const [menuItemId, setMenuItemId] = useState(null);
    const [defaultNav] = useState(defaultNavigationMenus(urlPrefix));
    useEffect(() => {
        if (menuItemId) {
            const newMenu = { ...menu };
            const { layers } = findMenuItem(newMenu.links, menuItemId);
            let obj = newMenu;
            layers.forEach((level) => {
                obj = obj.links[level];
            });
            const link = obj.links.find((link) => link.id === menuItemId);
            _setName(link.title);
            _setLink(link.link);
        }
    }, [menuItemId]);
    const deleteMenuItem = () => {
        const newMenu = { ...menu };
        const { layers } = findMenuItem(newMenu.links, menuItemId);
        let obj = newMenu;
        layers.forEach((level) => {
            obj = obj.links[level];
        });
        obj.links = obj.links.filter((link) => link.id !== menuItemId);
        setMenu(newMenu);
        const _menus = { ...menus };
        _menus[id] = newMenu;
        setMenus(_menus);
        setDeleteConfirmationPopupOpen(false);
    };
    const addNewSubMenu = (_id) => {
        const newMenu = { ...menu };
        let obj = newMenu;
        if (_id) {
            const { layers } = findMenuItem(newMenu.links, _id);
            layers.forEach((level) => {
                obj = obj.links[level];
            });
            const _obj = obj.links.find((link) => link.id === _id);
            if (!_obj.links) {
                _obj.links = [];
            }
            _obj.links.unshift({
                id: uniqueid(),
                link: "/",
                title: "Under the new menu",
                is_active: true,
            });
        } else {
            if (obj.links) {
                obj.links.push({
                    id: uniqueid(),
                    link: "/",
                    title: "New menu",
                    is_active: true,
                });
            } else {
                obj.links = [
                    {
                        id: uniqueid(),
                        link: "/",
                        title: "New menu",
                        is_active: true,
                    },
                ];
            }
        }
        setMenu(newMenu);
        const _menus = { ...menus };
        _menus[id] = newMenu;
        setMenus(_menus);
        setEditMenuItemPopupOpen(false);
    };
    const editMenuItem = () => {
        const newMenu = { ...menu };
        const { layers } = findMenuItem(newMenu.links, menuItemId);
        let obj = newMenu;
        layers.forEach((level) => {
            obj = obj.links[level];
        });
        const link = obj.links.find((link) => link.id === menuItemId);
        link.link = _link;
        link.title = _name;
        setMenu(newMenu);
        const _menus = { ...menus };
        _menus[id] = newMenu;
        setMenus(_menus);
        setEditMenuItemPopupOpen(false);
    };

    const activeMenuItem = (itemId) => {
        const newMenu = { ...menu };
        const { layers } = findMenuItem(newMenu.links, itemId);
        let obj = newMenu;
        layers.forEach((level) => {
            obj = obj.links[level];
        });
        const link = obj.links.find((link) => link.id === itemId);
        link.is_active = !link.is_active;
        setMenu(newMenu);
        const _menus = { ...menus };
        _menus[id] = newMenu;
        setMenus(_menus);
    };
    const submit = () => {
        const _menus = { ...menus };
        menu.links.forEach((item) => {
            item.link = item.link.replace(adminUrlPrefix, "");
        });
        _menus[id] = menu;
        setMenus(_menus);
        const editedBusiness = {
            theme_config: {
                ...themeConfig,
                navigation_menus: _menus,
            },
        };
        _updateBusiness(
            editedBusiness,
            "The original settings were successfully saved.",
            "Save the changes to the original settings failed!"
        );
    };

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "#eeeeee" : "",
        padding: isDraggingOver ? 20 : 0,
        borderRadius: 8,
    });

    useEffect(() => {
        const _navigationMenus = Object.keys(navigationMenus).length
            ? { ...navigationMenus }
            : { ...defaultNav };
        setMenus(_navigationMenus);
        if (id) {
            setMenu(_navigationMenus[id]);
        }
    }, []);

    const findMenuItem = (links, id, _layers, level = 0) => {
        const layers = _layers || [];
        const foundedIndex = links.findIndex((link) => link.id === id);
        if (foundedIndex > -1) {
            return { finalIndex: foundedIndex, layers };
        } else {
            for (let linkIndex = 0; linkIndex < links.length; linkIndex++) {
                const link = links[linkIndex];
                layers[level] = linkIndex;

                if (link && link.links && link.links.length) {
                    const response = findMenuItem(
                        link.links,
                        id,
                        layers,
                        level + 1
                    );
                    if (response.finalIndex > -1) {
                        return response;
                    }
                    layers.pop();
                }
            }
            return { finalIndex: -1 };
        }
    };
    const onDragEnd = (e) => {
        const newMenu = { ...menu };
        const { layers } = findMenuItem(newMenu.links, e.draggableId);
        let obj = newMenu;
        layers.forEach((level) => {
            obj = obj.links[level];
        });
        const draggbleItem = obj.links.splice(e.source.index, 1);
        obj.links.splice(e.destination.index, 0, draggbleItem[0]);
        setMenu(newMenu);
        const _menus = { ...menus };
        _menus[id] = newMenu;
        setMenus(_menus);
    };
    const renderDeleteItemPopup = (
        <Dialog
            open={isDeleteConfirmationPopupOpen}
            onClose={() => setDeleteConfirmationPopupOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this item menu?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteMenuItem} color="primary">
                    Remove the item menu
                </Button>
                <Button
                    onClick={() => setDeleteConfirmationPopupOpen(false)}
                    color="primary"
                    autoFocus
                >
                    Candifying
                </Button>
            </DialogActions>
        </Dialog>
    );

    const renderEditItemPopup = (
        <Modal
            onClose={() => setEditMenuItemPopupOpen(false)}
            isOpen={isEditMenuItemPopupOpen}
            isBig
            header={
                <ModalHeader
                    title="The item menu"
                    onRightClick={() => setEditMenuItemPopupOpen(false)}
                />
            }
            body={
                <div className="p-3">
                    <Paper elevation={1} className="p-3">
                        <div className="my-4">
                            <Input
                                value={_name}
                                label="Menu title"
                                onChange={(value) => {
                                    _setName(value);
                                }}
                            />
                        </div>

                        <div className="my-3">
                            <Input
                                value={_link}
                                className="direction-ltr"
                                label="Menu link"
                                onChange={(value) => {
                                    const _newLink = value?.replace(
                                        adminUrlPrefix,
                                        ""
                                    );
                                    _setLink(_newLink);
                                }}
                            />
                        </div>
                    </Paper>
                </div>
            }
            cta={
                <div className="d-flex justify-content-end w-100">
                    {minWidth768 ? (
                        <Button
                            onClick={editMenuItem}
                            className="px-5"
                            variant="contained"
                            color="primary"
                        >
                            Confirm and continue
                        </Button>
                    ) : (
                        <Button
                            onClick={editMenuItem}
                            variant="contained"
                            className="w-100"
                            color="primary"
                        >
                            Confirm and continue
                        </Button>
                    )}
                </div>
            }
        />
    );

    const RenderLinks = ({ provided, link, index }) => {
        return (
            <div>
                <Paper
                    elevation={1}
                    className="px-3 my-2 py-1 d-flex justify-content-between align-items-center"
                >
                    <div className="d-flex align-items-center">
                        <div
                            className="dragHandle pl-1"
                            {...provided.dragHandleProps}
                        >
                            <img
                                src={dragIcon}
                                alt="dragging"
                                style={{ width: 24 }}
                            />
                        </div>
                        <div>{link.title}</div>
                        {router.query.id != TOP_PAGE_HEADER_MENU && (
                            <IconButton
                                onClick={() =>
                                    setCollapse({
                                        ...isCollapse,
                                        [link.id]: !isCollapse?.[link.id],
                                    })
                                }
                            >
                                <KeyboardArrowDownRoundedIcon
                                    style={{
                                        transform: `rotate(${
                                            isCollapse?.[link.id] ? 180 : 0
                                        }deg)`,
                                    }}
                                />
                            </IconButton>
                        )}
                    </div>
                    <div>
                        {router.query.id === TOP_PAGE_HEADER_MENU && (
                            <IconButton
                                color={link.is_active ? "primary" : "disabled"}
                                onClick={() => activeMenuItem(link.id)}
                            >
                                <VisibilityIcon />
                            </IconButton>
                        )}
                        <IconButton
                            color="primary"
                            onClick={() => {
                                setMenuItemId(link.id);
                                setEditMenuItemPopupOpen(true);
                            }}
                        >
                            <EditRoundedIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                setMenuItemId(link.id);
                                setDeleteConfirmationPopupOpen(true);
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                </Paper>
                <Collapse
                    theme={{
                        collapse: "w-100 ReactCollapse--collapse",
                        content: "ReactCollapse--content",
                    }}
                    isOpened={isCollapse?.[link.id]}
                >
                    <div className="pr-5">
                        <div className="py-1">
                            <Paper
                                elevation={1}
                                className="px-3 py-2 d-flex justify-content-between align-items-center"
                            >
                                <Button
                                    onClick={() => addNewSubMenu(link.id)}
                                    color="primary"
                                    style={{ direction: "ltr" }}
                                    endIcon={<Add />}
                                >
                                    Add under the menu
                                </Button>
                            </Paper>
                        </div>
                        <Droppable
                            droppableId={`menu_layer_${link.id}`}
                            type={link.id}
                        >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                >
                                    {link.links &&
                                        link.links.map((_link, i) => (
                                            <Draggable
                                                draggableId={_link.id}
                                                index={i}
                                                key={_link.id}
                                            >
                                                {(__provided) => (
                                                    <div
                                                        ref={
                                                            __provided.innerRef
                                                        }
                                                        {...__provided.draggableProps}
                                                    >
                                                        <RenderLinks
                                                            provided={
                                                                __provided
                                                            }
                                                            link={_link}
                                                            index={index}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </Collapse>
            </div>
        );
    };
    const isEditTitleInputDisabled =
        router.query.id === MAIN_HEADER_NAVIGATION_MENU ||
        router.query.id === MAIN_FOOTER_NAVIGATION_MENU ||
        router.query.id === TOP_PAGE_HEADER_MENU;
    return (
        <div className="container">
            {renderDeleteItemPopup}
            {renderEditItemPopup}
            <Head>
                <title>Edit site menus</title>
            </Head>
            <AdminBreadCrumb />
            <Paper elevation={1} className="p-3 mt-3 d-flex flex-wrap">
                <div className="col-12 col-md-6">
                    <div
                        style={{
                            color: theme.palette.text.tertiary,
                            fontSize: 16,
                        }}
                    >
                        Original information
                    </div>
                    <div className="my-3">
                        {isEditTitleInputDisabled ? (
                            <div> {menu && menu.name}</div>
                        ) : (
                            <Input
                                size="medium"
                                value={menu && menu.name}
                                label="Menu title"
                                onChange={(value) => {
                                    setMenu({ ...menu, name: value });
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className="col-12 col-md-6"></div>
            </Paper>
            <Paper elevation={1} className="p-3 mt-3">
                <div
                    className="px-3 d-flex justify-content-between align-items-center"
                    style={{ color: theme.palette.text.tertiary, fontSize: 16 }}
                >
                    <div>Menu item</div>
                    <div>
                        <Button
                            style={{ direction: "ltr" }}
                            color="primary"
                            variant="outlined"
                            onClick={() => addNewSubMenu()}
                            disabled={
                                router.query.id === TOP_PAGE_HEADER_MENU &&
                                menu?.links?.length >= 5
                            }
                            endIcon={<AddRoundedIcon fontSize="small" />}
                        >
                            The new menu
                        </Button>
                    </div>
                </div>
                <div className="mt-3">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="menu_layer_0" type="default">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                >
                                    {menu?.links?.map((item, index) => (
                                        <Draggable
                                            draggableId={item.id}
                                            index={index}
                                            key={item.id}
                                        >
                                            {(_provided) => (
                                                <div>
                                                    <div
                                                        ref={_provided.innerRef}
                                                        {..._provided.draggableProps}
                                                    >
                                                        <RenderLinks
                                                            provided={_provided}
                                                            link={item}
                                                            index={index}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </Paper>
            <SaveAndDiscardButtons
                saveAction={submit}
                saveText="Save menu"
                disabled={loading}
            />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    themeConfig: makeSelectBusinessThemeConfig(),
    themeColor: makeSelectBusinessThemeColor(),
    navigationMenus: makeSelectNavigationMenus(),
    adminUrlPrefix: makeSelectAdminUrlPrefix(),
    urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
    return {
        _updateBusiness: (data, successMessage, failMessage) =>
            dispatch(updateBusiness(data, successMessage, failMessage)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminNavigationMenu);
