import { Button, notification, Space } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import React from "react";

type NotificationType = "success" | "info" | "warning" | "error";

interface Options {
  type: NotificationType;
  title: string;
  description: string;
  placement?: NotificationPlacement;
}

export const openNotificationWithIcon = ({
  type,
  title,
  description,
  placement = "bottomRight",
}: Options) => {
  notification[type]({
    message: title,
    description,
    placement,
  });
};
