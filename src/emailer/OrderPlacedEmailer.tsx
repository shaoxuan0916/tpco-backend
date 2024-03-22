import { Tailwind, Html, Img, Row, Hr } from "@react-email/components";
import { Order } from "@medusajs/medusa";
import { Column } from "typeorm";

export function OrderPlacedEmailer({ order }: { order: Order }) {
  console.log("ORDER ORDER ORDER", order);

  return (
    <Html lang="en">
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#ba3660",
              },
            },
          },
        }}
      >
        <div className="mx-auto w-full max-w-[650px]">
          <h2 className="text-[28px] font-bold py-4 px-8">
            Your order on The Parent Company is confirmed!
          </h2>

          <div className="py-4 px-8">
            <p className="my-4 text-[16px]">
              Hi {order?.shipping_address?.first_name}{" "}
              {order?.shipping_address?.last_name},
            </p>

            <p className="text-[16px] my-4">
              Your order{" "}
              <span className="font-bold italic text-[#ba3660]">
                #{order?.display_id}
              </span>{" "}
              has successfully been placed. Please find all the details about
              your order below.
            </p>

            <p className="text-[16px] font-semibold my-4">
              Once everything is confirmed and ready to ship, we will send you
              another email with the tracking details and any other information
              about your package.
            </p>

            <p className="text-[16px] my-4">
              In the meantime, if you have any questions, send us an email at{" "}
              <span className="italic font-semibold text-gray-600">
                theparentcompany.cs@gmail.com
              </span>{" "}
              and we will be happy to help.
            </p>
          </div>

          <div className="my-8 px-8">
            <p className="text-[16px] font-semibold mb-4">Order Summary: </p>

            <div className="w-full">
              {order?.items?.map((item) => (
                <div className="flex items-center justify-between gap-8 my-4 w-full">
                  <div className="mr-4">
                    <Img
                      src={
                        item?.thumbnail ?? "https://via.placeholder.com/80x80"
                      }
                      alt="Item Thumbnail"
                      width="80"
                      height="80"
                    />
                  </div>

                  <div className="flex item-center justify-between">
                    <p className="text-[16px]">
                      {item?.title} x {item?.quantity}
                    </p>
                    <p className="text-[16px] font-semibold uppercase">
                      {order?.currency_code}{" "}
                      {(item?.unit_price / 100) * item?.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between">
                <p className="text-[16px] font-medium">Total paid:</p>
                <p className="text-[16px] font-semibold uppercase">
                  {order?.payments[0].currency_code}{" "}
                  {order?.payments[0].amount / 100}
                </p>
              </div>
            </div>
          </div>

          <Hr />

          <div className="my-4">
            <p className="text-[12px] mb-2">
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
              <div>
                {order?.shipping_address?.province && (
                  <span>{order?.shipping_address?.province}, </span>
                )}
                <span className="uppercase">
                  {order?.shipping_address?.country_code.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <Hr />

          <div className="text-center">
            <p className="text-[16px] font-semibold">
              Thanks again for the purchase!
            </p>
          </div>
        </div>
      </Tailwind>
    </Html>
  );
}
