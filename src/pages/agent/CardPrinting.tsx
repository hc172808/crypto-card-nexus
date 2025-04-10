
import React from "react";
import CardPrinting from "@/components/admin/CardPrinting";

const CardPrintingPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Card Printing Center
        </h1>
        <p className="text-muted-foreground">
          Generate and print cards for your assigned users
        </p>
      </div>

      <CardPrinting />
    </div>
  );
};

export default CardPrintingPage;
