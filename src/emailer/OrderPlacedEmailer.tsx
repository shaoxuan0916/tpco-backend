import { Html, Img } from "@react-email/components";
import { Order } from "@medusajs/medusa";

export function OrderPlacedEmailer({ order }: { order: Order }) {
  console.log(
    "shipping_address ---------------->>>>>>",
    order?.shipping_address
  );
  console.log("order_items ---------------->>>>>>", order?.items);
  console.log("discount_total ---------------->>>>>>", order?.discount_total);
  console.log("tax_total ---------------->>>>>>", order?.tax_total);
  console.log("ORDER TOTAL ---------------->>>>>>", order?.total);
  return (
    <Html lang="en">
      <h2 className="text-[16px] font-bold">
        Your order on The Parent Company is confirmed!
      </h2>

      <div>
        <p className="text-[14px] font-semibold my-8">
          Your order is confirmed.
        </p>

        <p className="my-4 text-[12px]">
          Hi {order?.shipping_address?.first_name}{" "}
          {order?.shipping_address?.last_name},
        </p>

        <p className="text-[12px]">
          Your order <span className="font-bold">#{order?.display_id}</span> has
          successfully been placed. Please find all the details about your order
          below.
        </p>

        <p className="text-[12px]">Your order will be delievered to: </p>
        <div className="text-[12px]">
          <p>{order?.shipping_address?.address_1}</p>

          {order?.shipping_address?.address_2 && (
            <p>{order?.shipping_address?.address_2}</p>
          )}

          <p>
            {order?.shipping_address?.postal_code}{" "}
            {order?.shipping_address?.city}
          </p>
          <div className="flex items-center">
            <p>{order?.shipping_address?.province} </p>
            <p className="uppercase">{order?.shipping_address?.country_code}</p>
          </div>
        </div>
      </div>

      <div className="my-4">
        <p className="text-[16px] font-semibold mb-4">Order Summary</p>

        {order?.items?.map((item) => (
          <div className="flex items-center gap-4">
            <Img
              src={item?.thumbnail}
              alt="Product Thumbnail"
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-cover"
            />

            <div className="flex item-center justify-between gap-2">
              <p className="text-[12px]">{item?.title}</p>
              <p className="text-[12px] font-semibold uppercase">
                {order?.currency_code} {item?.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Html>
  );
}
