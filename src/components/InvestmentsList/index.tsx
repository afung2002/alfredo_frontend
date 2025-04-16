import { Typography } from "@mui/material";
import InvestmentCard from "../InvestmentCard";
import { useNavigate } from "react-router";
import { noDataMessageStyles } from "@src/utils/uiUtils";
import { Routes } from "@src/constants/routes";
import { InvestmentDetails } from "@src/types";
import { AnimatePresence, motion } from "framer-motion";

type InvestmentsListProps = {
  investments: InvestmentDetails[] | undefined;
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const InvestmentsList = ({ investments }: InvestmentsListProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full gap-4">
      {investments && investments.length > 0 ? (
        <AnimatePresence mode="popLayout">
          {investments.map((investment) => (
            <motion.div
              key={investment.id}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <InvestmentCard
                investment={investment}
                onClick={() =>
                  navigate(
                    Routes.FUND_MANAGER_INVESTMENT.replace(
                      ":investmentId",
                      investment.id
                    )
                  )
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <Typography variant="body1" sx={noDataMessageStyles}>
          No investments found.
        </Typography>
      )}
    </div>
  );
};

export default InvestmentsList;
