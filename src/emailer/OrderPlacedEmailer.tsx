import { Html, Img } from "@react-email/components";
import { Order } from "@medusajs/medusa";

export function OrderPlacedEmailer({ order }: { order: Order }) {
  console.log("ORDER ORDER ORDER", order);

  return (
    <Html lang="en">
      <div className="mx-auto w-full max-w-[500px]">
        <h2 className="text-2xl font-bold py-4 px-8">
          Your order on The Parent Company is confirmed!
        </h2>

        <div className="py-4 px-8">
          <p className="text-[14px] font-semibold my-4">
            Your order is confirmed.
          </p>
          <p className="my-4 text-[12px]">
            Hi {order?.shipping_address?.first_name}{" "}
            {order?.shipping_address?.last_name},
          </p>

          <p className="text-[12px]">
            Your order{" "}
            <span className="font-bold italic text-[#ba3660]">
              #{order?.display_id}
            </span>{" "}
            has successfully been placed. Please find all the details about your
            order below.
          </p>

          <p className="text-[12px] mt-4 mb-2">
            Your order will be delievered to:{" "}
          </p>
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
              <p>{order?.shipping_address?.province}, </p>
              <p className="uppercase">
                {order?.shipping_address?.country_code.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="my-8 px-8">
          <p className="text-[16px] font-semibold mb-4">Order Summary: </p>

          <div>
            {order?.items?.map((item) => (
              <div className="flex items-center justify-between my-4 max-w-[600px]">
                <div className="mr-4">
                  <img
                    src={item?.thumbnail ?? "https://via.placeholder.com/60x60"}
                    alt="Product Thumbnail"
                    className="w-[60px] h-[60px] object-cover"
                  />
                </div>

                <div className="flex item-center justify-between">
                  <p className="text-[12px] mr-16">{item?.title}</p>
                  <p className="text-[12px] font-semibold uppercase">
                    {order?.currency_code} {item?.total}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between">
              <p className="text-[12px] mr-16">Total paid:</p>
              <p className="text-[12px] font-semibold uppercase">
                {order?.payments[0].currency_code}{" "}
                {order?.payments[0].amount / 100}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}
