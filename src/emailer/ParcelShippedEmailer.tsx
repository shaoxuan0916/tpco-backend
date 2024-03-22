import { Order } from "@medusajs/medusa";
import { Html, Tailwind, Hr, Img } from "@react-email/components";

export function ParcelShippedEmailer({ order }: { order: Order }) {
  console.log("fulfillments", order?.fulfillments);
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
            Your parcel is shipped!
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
              has successfully been shipped.
            </p>

            <p className="text-[16px] my-4">
              In the meantime, if you have any questions, send us an email at{" "}
              <span className="italic font-semibold text-gray-600">
                theparentcompany.cs@gmail.com
              </span>{" "}
              and we will be happy to help.
            </p>
          </div>

          <div className="py-4 px-8">
            <p className="text-[16px] my-4">
              Courier company:{" "}
              <span className="font-bold">
                {/* @ts-ignore */}
                {order?.fulfillments[0]?.metadata[0]?.name ?? ""}
              </span>
            </p>
            <p className="text-[16px] my-4">
              Tracking number:{" "}
              <span className="font-bold">
                {order?.fulfillments[0]?.tracking_numbers}
              </span>
            </p>
          </div>

          <div className="mt-8 mb-2 px-8">
            <p className="text-[16px] font-semibold mb-8">Order Summary: </p>

            <div className="w-full">
              {order?.items?.map((item) => (
                <div className="flex items-center justify-between gap-16 my-4 w-full">
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
                    <p className="text-[16px] mr-16">
                      {item?.title} x {item?.quantity}
                    </p>
                    <p className="text-[16px] font-semibold uppercase">
                      {order?.currency_code}{" "}
                      {(item?.unit_price / 100) * item?.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Hr />

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
