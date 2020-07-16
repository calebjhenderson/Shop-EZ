import React,{ useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    checkoutAccordion:{
      marginRight: 150,
      marginLeft: 150,
      padding: 30,
      background: "white",
    }
  
});



export default function () {
  const [expanded, setExpanded] = useState('panel1');
    
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
  
    <div>
      <Accordion className={classes.checkoutAccordion} square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Shipping</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <form>Shipping Address
            </form>
          
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.checkoutAccordion} square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>

        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Payment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Payment Information 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.checkoutAccordion} square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>

        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Delivery Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Product details in here
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}