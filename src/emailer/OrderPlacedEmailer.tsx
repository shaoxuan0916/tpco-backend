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

            <p className="text-[16px] my-4">
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

          <div className="mt-8 mb-2 px-8">
            <p className="text-[16px] font-semibold mb-8">Order Summary: </p>

            <div className="w-full">
              <div className="border-b-2 pb-2">
                {order?.items?.map((item) => (
                  <div className="flex gap-4 items-center my-4">
                    <div className="">
                      <Img
                        src={
                          item?.thumbnail ?? "https://via.placeholder.com/80x80"
                        }
                        alt="Item Thumbnail"
                        width="80"
                        height="80"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[16px]">
                        {item?.title} x {item?.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[16px] font-semibold uppercase">
                        {order?.currency_code}{" "}
                        {(item?.unit_price / 100) * item?.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal, Tax, Discount, and Total paid sections */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-4 text-right">
                  <p className="text-[16px] font-medium">Subtotal:</p>
                  <p className="text-[16px] font-semibold uppercase">
                    {order?.subtotal / 100 ?? 0}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <p className="text-[16px] font-medium">Tax:</p>
                  <p className="text-[16px] font-semibold uppercase">
                    {(order?.payments[0].amount -
                      order?.subtotal -
                      order?.discount_total) /
                      100 ?? 0}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <p className="text-[16px] font-medium">Discount:</p>
                  <p className="text-[16px] font-semibold uppercase">
                    {order?.discount_total / 100 ?? 0}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <p className="text-[16px] font-medium">Total paid:</p>
                  <p className="text-[16px] font-semibold uppercase">
                    {order?.payments[0].currency_code}{" "}
                    {order?.payments[0].amount / 100 ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Hr className="my-4" />

          <div className="my-4 px-8">
            <p className="text-[16px] mb-4 font-semibold">
              Your order will be delievered to:{" "}
            </p>
            <div className="text-[16px]">
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
