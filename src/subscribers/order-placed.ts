import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
} from "@medusajs/medusa";

export default async function handleOrderPlaced({
  data,
  eventName,
  container,
  pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
  const sendGridService = container.resolve("sendgridService");
  const orderService: OrderService = container.resolve("orderService");

  const order = await orderService.retrieve(data.id, {
    // you can include other relations as well
    relations: ["items"],
  });

  console.log("-----order's email-------", order.email);

  try {
    await sendGridService.sendEmail({
      templateId: "d-6a5267b599a34291b06288209bdaf1c0",
      from: "shaoxuandev10@gmail.com",
      to: order.email,
      dynamic_template_data: {
        // any data necessary for your template...
        items: order.items,
        status: order.status,
      },
    });

    console.log("email sent!");
  } catch (error) {
    console.log("email not sent :(", error);
  }
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: "order-placed-handler",
  },
};
