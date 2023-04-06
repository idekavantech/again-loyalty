import SectionContainer from "../SectionContainer";
import SectionButton from "../SectionButton";
import EditMenu from "../Actions/EditMenu";
import RemoveMenu from "../Actions/RemoveMenu";
import {removeMenu,editMenu} from "../../context/superMenu";
import {useDispatch, useSelector} from "react-redux";

export default function MenuSectionContainer({
    slug
}) {

    const superMenu = useSelector(state => state.superMenu);
    const dispatch = useDispatch();

    return (
        <>
            <EditMenu
                isOpen={superMenu.editMenu} 
                slug={slug}
                onClose={()=> dispatch(editMenu(false))} 
            />
            <RemoveMenu
                isOpen={superMenu.removeMenu}
                slug={slug}
                id={superMenu.value[superMenu.selectedMenu]?.id}
                onClose={() => dispatch(removeMenu(false))}
            />
            <SectionContainer title={'Menu'}  btns={
                <>
                    <SectionButton 
                        title='Editing the menu' 
                        disabled={
                            (superMenu.selectedMenu !== 0 && superMenu.selectedMenu < 0)
                        }
                        onClick={()=>  dispatch(editMenu(true))} 
                    />
                    <SectionButton 
                        textColor='red' 
                        title='Remove the menu'
                        disabled={
                            (
                                superMenu.selectedMenu < 0 ||
                                superMenu.value.length === 1
                            )
                        }
                        onClick={()=> dispatch(removeMenu(true))} 
                    />
                </>
            } />
        </>
    );
};