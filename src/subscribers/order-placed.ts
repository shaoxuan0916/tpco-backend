import {
  type SubscriberConfig,
  type SubscriberArgs,
  OrderService,
} from "@medusajs/medusa";

import express, { Request, Response } from "express";
import { Resend } from "resend";

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

  const app = express();
  const resend = new Resend("re_SwsYuVv5_Jqux2wbKqB1LDcosxuUMW6HN");

  console.log("-----resend------", resend);

  await resend.emails.send({
    from: "shaoxuandev10@gmail.com",
    to: order.email,
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });

  app.get("/", async (req: Request, res: Response) => {
    const { data, error } = await resend.emails.send({
      from: "shaoxuandev10@gmail.com",
      to: [`${order.email}`],
      subject: "hello world",
      html: "<strong>it works!</strong>",
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(200).json({ data });
  });

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
