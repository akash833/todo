import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import "./Faq.css";
import { faqData } from "../../../constant/sampleData";
export default function FAQ() {
  return (
    <div className="faqWrapper">
      <h1>FAQ Section</h1>
      <div className="underline"></div>
      <br />
      {faqData.map((item) => {
        return (
          <Accordion sx={{ margin: "30px 10px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {item.question}
            </AccordionSummary>

            <AccordionDetails>{item.answer}</AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
