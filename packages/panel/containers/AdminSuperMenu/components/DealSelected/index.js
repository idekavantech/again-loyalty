import { makeStyles } from '@material-ui/core/styles';
import SectionButton from '../SectionButton';
import RemoveDeal from "../Actions/RemoveDeal";
import EditDeal from '../Actions/EditDeal';
import SectionContainer from "../SectionContainer";
import {useDispatch,useSelector} from "react-redux";
import {removeDeal,editDeal} from "../../context/superMenu";

const useStyles = makeStyles(() => ({
    box: {
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginTop: 15,
    }
}));


function DealSelected({
    slug
}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const reducer = useSelector(state => state.superMenu);

    if (reducer.selectedDeal) {
        return (
            <>
                <RemoveDeal
                    isOpen={reducer?.removeDeal}
                    onClose={() => dispatch(removeDeal(null))}
                    slug={slug}
                />
                <EditDeal
                    isOpen={reducer?.editDeal}
                    onClose={() => dispatch(editDeal(null))}
                    slug={slug}
                />
                <SectionContainer title={'the product'}  btns={
                    <>
                        <p className={classes.text}>
                            {reducer.selectedDeal.titleAppended}
                        </p>
                        <SectionButton 
                            title='Product editing' 
                            textColor='black' 
                            onClick={() => dispatch(editDeal(reducer.selectedDeal))} 
                        />
                        <SectionButton 
                            title='Remove Product' 
                            textColor='black'
                            onClick={() => dispatch(removeDeal(reducer.selectedDeal))} 
                        />
                    </>
                }>
                </SectionContainer>
            </>
        );
    }
    else {
        return <></>
    };

};

export default DealSelected;