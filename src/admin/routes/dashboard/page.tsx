import { RouteConfig } from "@medusajs/admin";
import { Calendar } from "@medusajs/icons";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-white p-6 border-[1px] rounded-2xl">
      <h3 className="text-[24px] font-semibold">Dashboard</h3>

      {/* Statistics */}
      <div className="mt-8">Stats</div>
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Dashboard",
    icon: Calendar,
  },
};

export default DashboardPage;
