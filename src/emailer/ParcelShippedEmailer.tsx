import { Order } from "@medusajs/medusa";
import { Html } from "@react-email/components";

export function ParcelShippedEmailer({ order }: { order: Order }) {
  // console.log("order", order);
  return (
    <Html lang="en">
      <h2 className="text-[24px] font-bold">Your parcel is shipped!</h2>
    </Html>
  );
}
