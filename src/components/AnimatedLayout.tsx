import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useRouterState } from "@tanstack/react-router";

export const AnimatedLayout = () => {
  const { location } = useRouterState();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait" >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
